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
}