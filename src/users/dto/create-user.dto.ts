export class CreateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone: string;
  birthDate: Date;
}
