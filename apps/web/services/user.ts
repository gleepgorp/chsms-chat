import { apiClient } from "./api";
import { ProfileType } from "types/Profile.type";
import { UserApi } from '@chsms/api-client';

const userApi = apiClient.use(UserApi);

export async function getUserById(id: string): Promise<ProfileType | null> {
  try {
    const { data } = await userApi.userControllerFindById(id);
    return data as unknown as ProfileType;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function searchUsers(query: string): Promise<ProfileType[] | null> {
  try {
    const { data } = await userApi.userControllerFindAll(query);
    return data as unknown as ProfileType[];
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getUsersByIds(ids: string[]): Promise<ProfileType[] | null> {
  try {
    const response = await userApi.userControllerFindUsersByIds({
      data: { ids }
    });
    return response as unknown as ProfileType[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}