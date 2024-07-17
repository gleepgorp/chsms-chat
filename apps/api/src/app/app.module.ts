import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { UserModule } from './user/user.module';
import { ConfigKeys } from '../config/config-keys';
import { IPLimitMiddleware } from '../middleware/ip-limit';

@Module({
  controllers: [],
  imports: [
    FirestoreModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        credentials: {
          client_email: configService.get<string>(ConfigKeys.FIRESTORE_CLIENT_EMAIL),
          private_key: configService.get<string>(ConfigKeys.FIRESTORE_PRIVATE_KEY),
        },
        projectId: configService.get<string>(ConfigKeys.FIRESTORE_PROJECT_ID),
      })
    })
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void{
    consumer.apply(IPLimitMiddleware).forRoutes('*');
  }
}
