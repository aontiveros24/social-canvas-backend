import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class MessageController {
  constructor(private readonly chatService: MessageService) {}

  @Post('send')
  async sendMessage(@Body() createMessageDto: CreateMessageDto): Promise<void> {
    await this.chatService.sendMessage(createMessageDto);
  }

  @Get('messages/:userPhone')
  async getMessages(
    @Param('userPhone') userPhone: string,
  ): Promise<MessageDto[]> {
    return this.chatService.getMessages(userPhone);
  }
}
