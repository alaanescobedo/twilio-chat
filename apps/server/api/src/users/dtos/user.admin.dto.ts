import { Expose } from "class-transformer";

export class UserAdminDto {

  @Expose()
  id: string;

  @Expose()
  username: string

  @Expose()
  email: string;
  
  @Expose()
  roles: string[];
}