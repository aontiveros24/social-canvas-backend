import { Module } from '@nestjs/common';
import { SocialNetworkChatsService } from './social_network_chats.service';
import { SocialNetworkChatsController } from './social_network_chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialNetworkChatEntity } from './social_network_chats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetworkChatEntity])],
  providers: [SocialNetworkChatsService],
  controllers: [SocialNetworkChatsController],
})
export class SocialNetworkChatsModule {}
