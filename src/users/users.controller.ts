import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../http-exception.filter';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create')
  @UseFilters(new HttpExceptionFilter())
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Post('login')
  loginUser(@Body() loginUser: LoginUserDto) {
    return this.userService.loginUser(loginUser);
  }

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}
