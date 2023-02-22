import { IsOptional, IsString } from 'class-validator';

export class EditDeckDto {
  @IsString()
  @IsOptional()
  name?: string;
}