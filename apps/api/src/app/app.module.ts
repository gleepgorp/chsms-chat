import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  controllers: [],
  imports: [
    FirestoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        credentials: {
          
        }
      })
    })
  ],
  providers: [AppService],
})
export class AppModule {}
