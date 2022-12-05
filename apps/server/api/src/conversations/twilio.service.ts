import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { ServiceContext } from 'twilio/lib/rest/conversations/v1/service';
import { GenerateTokenDto } from './dtos/generate-token.dto';

@Injectable()
export class TwilioService {
  private readonly twilioAccountSid = 'AC51409c04df11daf104fa91c6dbf25d5a';
  private readonly twilioApiKey = 'SK0ecf8c170ca93fdfb02b4e6448864d69';
  private readonly twilioApiSecret = 'aZx1lXEgtQ7OeWxRoDlzjV2dxvPpDiKm';
  private readonly serviceSid = 'IS2ea8fa6f658a4041ad374bbd0607a2d6'
  private readonly twimlAppSid = 'APf37ff5df25ebe8cad14ac72a99150e89'//Renovate

  private readonly serviceAdminSid = 'RLf094c4f0ba19416486c8ee996255dd10'
  private readonly serviceUserSid = 'RL449b0a625ccc44fea6e04937987daef8'
  private readonly channelAdminSid = 'RL98e1eb3666c9478099d24bdffbf00836'
  private readonly channelUserSid = 'RLb0859716774849d9a673df2030354bfb'
  private readonly channelMasterSid = 'RLf1632a774a0c44d4b4e0dbe9ac1c0348'

  client: twilio.Twilio;
  conversationService: ServiceContext

  constructor() {
    this.client = twilio(this.twilioApiKey, this.twilioApiSecret, {
      accountSid: this.twilioAccountSid,
      logLevel: 'info'
    })
    this.conversationService = this.client.conversations.v1.services(this.serviceSid)
  }

  getClient() {
    return this.client
  }

  getAccessTokenForChat({ identity, roles }: GenerateTokenDto) {
    const roleSid = roles?.includes('admin') ? this.serviceAdminSid : this.serviceUserSid
    console.log({ roleSid })

    const AccessToken = twilio.jwt.AccessToken
    const ChatGrant = AccessToken.ChatGrant
    const chatGrant = new ChatGrant({
      serviceSid: this.serviceSid,
      deploymentRoleSid: roleSid
    })
    const token = new AccessToken(
      this.twilioAccountSid,
      this.twilioApiKey,
      this.twilioApiSecret,
      { identity }
    )
    console.log({ token })
    token.addGrant(chatGrant)
    return { tokenValue: token.toJwt() }
  }

  async enableReachabilityIndicator() {
    return await this.conversationService.configuration(this.serviceSid)
      .update({ reachabilityEnabled: true })
  }

  async getUsers() {
    return await this.conversationService.users.list({ limit: 100 })
  }

  async getUser({ identity }: { identity: string }) {
    return await this.client.conversations.v1.services(this.serviceSid).users(identity).fetch()
  }

  async getRoles() {
    const roles = await this.conversationService.roles.list({ limit: 100 })
    console.log({ roles })

    const formatData = roles.reduce((acc, role) => {
      acc[role.sid] = role.friendlyName
      return acc
    }, {})
    return formatData
  }

  getServices({ servicesIds }: { servicesIds: string[] }) {
    return servicesIds.map(serviceId => this.client.conversations.v1.services(serviceId))
  }

  async createService({ serviceName, identity }: { serviceName: string, identity: string }) {
    const service = await this.client.conversations.v1.services.create({
      friendlyName: serviceName
    })
    await this.client.conversations.v1.services(service.sid).users.create({
      identity,
      roleSid: this.serviceAdminSid
    })
    return service
  }

  async giveChannelAdminRole({ channelId, participantSid }: { channelId: string, participantSid: string }) {
    const channel = this.client.conversations.v1.services(this.serviceSid).conversations(channelId)
    const participant = channel.participants(participantSid)
    await participant.update({ roleSid: this.channelAdminSid })
  }

  async revokeChannelAdminRole({ channelId, participantSid }: { channelId: string, participantSid: string }) {
    const channel = this.client.conversations.v1.services(this.serviceSid).conversations(channelId)
    const participant = channel.participants(participantSid)
    await participant.update({ roleSid: this.channelUserSid })
  }

  async deleteUser({ userSid }: { userSid: string }) {
    const res = await this.conversationService.users(userSid).remove()
    console.log({ res })
    return res
  }
}

