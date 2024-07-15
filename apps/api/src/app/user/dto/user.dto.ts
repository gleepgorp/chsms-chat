
import { IsEmail, IsString, IsOptional } from "class-validator";

export class UserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsOptional()
  @IsString()
  readonly profilePicture?: string;

  @IsString()
  readonly status: string;
};