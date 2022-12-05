import { Body, Controller, Post, Get, Param, Session } from '@nestjs/common';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { GenerateTokenDto } from './dtos/generate-token.dto';
import { TwilioService } from './twilio.service';

// TODO: Refactor this shit
@Controller('conversations')
export class ConversationsController {

  constructor(
    private readonly chatService: TwilioService
  ) { }

  @Post('/chat/generate-token')
  async generateChatToken(@Body() { identity }: Pick<GenerateTokenDto, 'identity'>) {
    console.log({ identity });
    return this.chatService.getAccessTokenForChat({ identity })
  }

  @Roles(Role.SuperAdmin)
  @Post('/chat/admin/generate-token')
  async generateChatTokenWithServiceAdmin(@Body() { identity }: Pick<GenerateTokenDto, 'identity'>) {
    return this.chatService.getAccessTokenForChat({ identity, roles: ['user', 'admin'] })
  }

  // @Roles(Role.SuperAdmin)
  @Get('/chat/service/config/enable-reachability')
  async enableReachability() {
    return this.chatService.enableReachabilityIndicator()
  }

  @Get('/chat/users')
  async getAllUsers() {
    return this.chatService.getUsers();
  }

  @Get('/chat/service/roles')
  async getRoles() {
    console.log('getRoles');
    return this.chatService.getRoles();
  }

  @Post('/chat/participant/give-admin-channel-role')
  async giveAdminChannelRole(@Body() { channelId, participantSid }: { channelId: string, participantSid: string }) {
    return this.chatService.giveChannelAdminRole({ channelId, participantSid });
  }
  @Post('/chat/participant/revoke-admin-channel-role')
  async revokeAdminChannelRole(@Body() { channelId, participantSid }: { channelId: string, participantSid: string }) {
    return this.chatService.revokeChannelAdminRole({ channelId, participantSid });
  }

  @Get('/chat/users/:identity')
  async getUser(@Param('identity') identity: string) {
    console.log('>>>',{ identity });
    return this.chatService.getUser({ identity });
  }

  @Get('/chat/services')
  async getUserServices(@Session() session: any) {
    const servicesIds = session.user.services;
    if(!servicesIds) return [];
    return this.chatService.getServices({ servicesIds });
  }

  @Post('/chat/services')
  async createService(
    @Body() { serviceName, identity }: { serviceName: string, identity: string },
    @Session() session: any) {
    const service = await this.chatService.createService({ serviceName, identity });
    session.user.services = [...session.user.services, service.sid];
    return service;
  }

}
