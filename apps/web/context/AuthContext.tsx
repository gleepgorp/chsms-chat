import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase.utils';
import { ProfileType } from 'types/Profile.type';
import { getUserById } from '../services/user';

export type AuthProviderType = {
  children: ReactNode | ReactNode[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  profile: ProfileType | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function AuthProvider(props: AuthProviderType): JSX.Element {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userData = await getUserById(user.uid);
        setProfile(userData);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, profile }}>
      {children}
    </AuthContext.Provider>
  );
};



