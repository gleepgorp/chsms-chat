import { FirestoreDatabaseProvider } from "../firestore/firestore.providers";
import { CollectionReference } from "@google-cloud/firestore";
import { UserDocument } from "../../documents/user.document";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { ProfileType } from "types/Profile.type";

@Injectable()
export class UserService {
  constructor (
    @Inject(UserDocument.collectionName)
    private userCollection: CollectionReference<ProfileType>,
    @Inject(FirestoreDatabaseProvider)
    private db,
  ) {}

  async findById(id: string): Promise<ProfileType> {
    try {
      const snapshot = await this.userCollection.doc(id).get();
      const user: ProfileType = {...snapshot.data(), id: snapshot.id};
      
      return user;
    } catch (err) {
      throw new HttpException(err.details, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchUsers(searchTerm: string, limit = 10): Promise<ProfileType[]> {
    try {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
  
      const firstnameQuery = this.userCollection
        .orderBy('firstname')
        .startAt(lowercaseSearchTerm)
        .endAt(lowercaseSearchTerm + '\uf8ff')
        .limit(limit);

      const lastnameQuery = this.userCollection
        .orderBy('lastname')
        .startAt(lowercaseSearchTerm)
        .endAt(lowercaseSearchTerm + '\uf8ff')
        .limit(limit);
  
      const [firstnameSnapshot, lastnameSnapshot] = await Promise.all([
        firstnameQuery.get(),
        lastnameQuery.get()
      ]);
  
      const users: ProfileType[] = [];

      firstnameSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as ProfileType);
      });
      lastnameSnapshot.forEach((doc) => {
        if (!users.some(user => user.id === doc.id)) {
          users.push({ id: doc.id, ...doc.data() } as ProfileType);
        }
      });
  
      users.sort((a, b) => {
        const aFullName = `${a.firstname} ${a.lastname}`.toLowerCase();
        const bFullName = `${b.firstname} ${b.lastname}`.toLowerCase();
        return aFullName.indexOf(lowercaseSearchTerm) - bFullName.indexOf(lowercaseSearchTerm);
      });
  
      return users.slice(0, limit);
    } catch (err) {
      console.error('Error in searchUsers:', err);
      throw new HttpException(err.message || 'An error occurred while searching users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}