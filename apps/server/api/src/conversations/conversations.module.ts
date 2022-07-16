import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { TwilioService } from './twilio.service';

@Module({
  controllers: [
    ConversationsController,
  ],
  providers: [
    TwilioService
  ],
  exports: [
    TwilioService
  ]
})
export class ConversationsModule { }
