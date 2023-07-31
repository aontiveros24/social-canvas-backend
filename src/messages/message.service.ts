import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UserEntity } from 'src/users/users.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async sendMessage(createMessageDto: CreateMessageDto): Promise<void> {
    const { content, senderPhone, receiverPhone } = createMessageDto;

    const sender = await this.userRepository.findOneBy({ phone: senderPhone });
    const receiver = await this.userRepository.findOneBy({
      phone: receiverPhone,
    });

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const newMessage = this.messageRepository.create({
      content,
      sender,
      receiver,
    });

    await this.messageRepository.save(newMessage);
  }

  async getMessages(userPhone: string): Promise<MessageDto[]> {
    const user = await this.userRepository.findOneBy({ phone: userPhone });

    if (!user) {
      throw new Error('User not found');
    }

    const messages = await this.messageRepository.find({
      where: [{ sender: user }, { receiver: user }],
      relations: ['sender'],
    });

    return messages.map((message) => ({
      content: message.content,
      sender: message.sender.firstName,
    }));
  }
}
