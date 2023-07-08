import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SocialNetworkGroupEntity } from 'src/social_network_groups/social_network_groups.entity';

export enum State {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('social_network_chat')
export class SocialNetworkChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'Contenido de la publicacion' })
  content: string;

  @Column({ comment: 'Archivos de la publicacion' })
  files: string;

  @Column({ comment: 'Usuario de la publicacion' })
  user: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
    comment: 'Estado del chat',
  })
  state: State;

  @CreateDateColumn({
    name: 'date_publication',
    comment: 'Fecha de publicacion',
  })
  datePublication: Date;

  @OneToOne(() => SocialNetworkGroupEntity)
  @JoinColumn()
  social_network_group: SocialNetworkGroupEntity;
}
