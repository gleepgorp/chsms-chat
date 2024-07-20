
import { IsEmail, IsString, IsOptional } from "class-validator";

export class UserDTO {
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsString()
  status: string;

  @IsString()
  bio?: string;

  @IsString()
  profileBgColor?: string;
};