import { ProfileType } from "types/Profile.type";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProfileType> {
    return this.userService.findById(id);
  }

  @Get()
  async findAll(
    @Query('query') query: string): Promise<ProfileType[]> {
    return this.userService.searchUser(query);
  }

  // find multiple users with multiple ids 
  @Post('find')
  async findUsersByIds(@Body() body: { ids: string[] }): Promise<ProfileType[]> {
    return this.userService.findByIds(body.ids);
  }
}