import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository, QueryFailedError } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createUser(UserEntity: CreateUserDto) {
    const newUser = this.userRepository.create(UserEntity);
    return this.userRepository
      .save(newUser)
      .catch((err) => this.catchQueryError(err));
  }

  async loginUser(LoginUser: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      email: LoginUser.email,
      password: LoginUser.password,
    });

    if (!user)
      return new HttpException(
        'Usuario o contraseña invalida',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUserByPhone(phone: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ phone });
  }

  catchQueryError(err) {
    switch (err.name) {
      case 'QueryFailedError':
        throw new Error('Error, ' + err.message);
      default:
        throw err;
    }
  }
}
