import { AccountDocument } from '../../documents/account.document';
import { ChatDocument } from '../../documents/chat.document';
import { MessageDocument } from '../../documents/message.document';
import { UserDocument } from '../../documents/user.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  AccountDocument.collectionName,
  ChatDocument.collectionName,
  MessageDocument.collectionName,
  UserDocument.collectionName,
];
