import { Firestore, Settings } from '@google-cloud/firestore';
import { Module, DynamicModule } from '@nestjs/common';

import {
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
  FirestoreCollectionProviders,
} from './firestore.providers';

type FirestoreModuleOptions = {
  imports: any[];
  inject: any[];
  useFactory: (...args: any[]) => Settings;
};

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider = {
      inject: options.inject,
      provide: FirestoreOptionsProvider,
      useFactory: options.useFactory,
    };

    const dbProvider = {
      inject: [FirestoreOptionsProvider],
      provide: FirestoreDatabaseProvider,
      useFactory: (config) => new Firestore(config),
    };

    const collectionProviders = FirestoreCollectionProviders.map(
      (providerName) => ({
        inject: [FirestoreDatabaseProvider],
        provide: providerName,
        useFactory: (db) => db.collection(providerName),
      }),
    );

    return {
      exports: [dbProvider, ...collectionProviders],
      global: true,
      imports: options.imports,
      module: FirestoreModule,
      providers: [optionsProvider, dbProvider, ...collectionProviders],
    };
  }
}
