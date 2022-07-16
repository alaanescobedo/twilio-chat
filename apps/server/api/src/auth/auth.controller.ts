import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { Role } from 'src/roles/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Post('/register')
  async createUser(@Body() body: CreateUserDto, @Session() session: Record<string, Pick<User, '_id' | 'roles'>>) {
    const user = await this.authService.signup(body);
    session.user = {
      _id: user.id,
      roles: user.roles
    };
    return
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto, @Session() session: Record<string, Pick<User, '_id' | 'roles'>>) {
    const user = await this.authService.signin(body);
    session.user = {
      _id: user.id,
      roles: user.roles
    };
    return user
  }

  @Post('/logout')
  @Roles(Role.User)
  async logout(@Session() session: Record<string, Pick<User, '_id' | 'roles'>>) {
    session.user = null;
    return
  }

  @Get('/me')
  @Roles(Role.User)
  async me(@Session() session: Record<string, Pick<User, '_id' | 'roles'>>) {
    const user = await this.usersService.findOneById(session.user._id);
    if (!user) return null
    return user
  }

}
