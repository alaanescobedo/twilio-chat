import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const script = promisify(_scrypt)

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService) { }

  async signup({ username, password }: CreateUserDto) {
    const user = await this.usersService.findOne({ username })
    if (user) throw new BadRequestException('Email already exists')

    const salt = randomBytes(12).toString('hex')
    const hash = await script(password, salt, 32) as Buffer
    const passwordHash = `${salt}.${hash.toString('hex')}`
    return this.usersService.create({ username, password: passwordHash });
  }

  async signin({ username, password }: LoginUserDto) {
    const user = await this.usersService.findOne({ username })
    if (!user) throw new BadRequestException('Invalid credentials')

    const [salt, hash] = user.password.split('.')
    const passwordHash = await script(password, salt, 32) as Buffer
    if (passwordHash.toString('hex') !== hash) throw new BadRequestException('Invalid password')

    return user
  }


}
