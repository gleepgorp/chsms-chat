import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigKeys } from '../config/config-keys';
import { IPLimitMiddleware } from '../middleware/ip-limit';

import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
  controllers: [],
  imports: [
    FirestoreModule,
    UserModule,
    ChatModule,
    MessageModule,
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
