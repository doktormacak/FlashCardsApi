import { IsOptional, IsString } from 'class-validator';

export class EditFolderDto {
  @IsString()
  @IsOptional()
  name?: string;
}
