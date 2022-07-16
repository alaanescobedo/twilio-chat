import { Module } from '@nestjs/common';
import { ConversationsModule } from './conversations/conversations.module';


@Module({
  imports:[
    ConversationsModule
  ]
})
export class AppModule {}
  