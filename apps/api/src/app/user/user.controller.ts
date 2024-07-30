import { ProfileType } from "types/Profile.type";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findById(@Param('id') id: string): Promise<ProfileType> {
    return this.userService.findById(id);
  }

  @Get()
  findAll(
    @Query('query') query: string): Promise<ProfileType[]> {
    return this.userService.searchUser(query);
  }
}