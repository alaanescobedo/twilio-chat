import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { UserAdminDto } from './dtos/user.admin.dto';
import { UsersService } from './users.service';


@Controller('users')
@Serialize(UserAdminDto)
@Roles(Role.Admin)
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteOneById(id);
  }
}
