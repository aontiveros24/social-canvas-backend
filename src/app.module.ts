import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { SocialNetworksModule } from './social_networks/social_networks.module';
import { SocialNetworkGroupsModule } from './social_network_groups/social_network_groups.module';
import { SocialNetworkChatsModule } from './social_network_chats/social_network_chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entity';
import { ProviderEntity } from './providers/providers.entity';
import { SocialNetworkEntity } from './social_networks/social_networks.entity';
import { SocialNetworkGroupEntity } from './social_network_groups/social_network_groups.entity';
import { SocialNetworkChatEntity } from './social_network_chats/social_network_chats.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'DB_SOCIAL_CANVAS',
      entities: [
        UserEntity,
        ProviderEntity,
        SocialNetworkEntity,
        SocialNetworkGroupEntity,
        SocialNetworkChatEntity,
      ],
      autoLoadEntities: true,
      synchronize: true,
      // dropSchema: true,
    }),
    UsersModule,
    ProvidersModule,
    SocialNetworksModule,
    SocialNetworkGroupsModule,
    SocialNetworkChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
