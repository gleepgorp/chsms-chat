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
      
      return { ...snapshot.data(), id: snapshot.id } as ProfileType;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByIds(ids: string[]): Promise<ProfileType[]> {
    const userPromises = ids.map(async (id) => {
      const userSnapshot = await this.userCollection
        .where('accountId', '==', id)
        .limit(1)
        .get();
  
      if (userSnapshot.empty) {
        return null;
      }
  
      return userSnapshot.docs[0].data() as ProfileType;
    });
  
    const users = await Promise.all(userPromises);
    return users.filter((user): user is ProfileType => user !== null);
  }

  async searchUser(searchItem: string): Promise<ProfileType[]> {
    try {
      //splits searchterm into words
      const searchTerms = searchItem.toLowerCase().split(/\s+/).filter(term => term.length > 0);

      const generateQueries = (field: string, term: string) => {
        return this.userCollection
          .where(field, '>=', term)
          .where(field, '<', term + '\uf8ff');
      }

      const queries = searchTerms.flatMap(term => [
        generateQueries('firstname', term),
        generateQueries('lastname', term)
      ]);

      const results = await Promise.all(queries.map(query => query.get()));

      const uniqueUserIds = new Set<string>();
      const users: ProfileType[] = [];

      //adds users only once even if matches multiple criteria
      const addUsers = (snapshot: FirebaseFirestore.QuerySnapshot) => {
        snapshot.forEach((doc) => {
          if (!uniqueUserIds.has(doc.id)) {
            uniqueUserIds.add(doc.id);
            users.push({...doc.data(), id: doc.id} as ProfileType);
          }
        });
      };

      results.forEach(addUsers);
  
      return users;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadProfile(imageData: string, userId: string): Promise<void> {
    const userRef = this.userCollection.doc(userId);
    await userRef.update({
      profilePicture: imageData
    });
  }
}