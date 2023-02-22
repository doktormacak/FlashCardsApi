import { IsString, IsOptional, IsNumber } from 'class-validator';

export class EditCardDto {
  @IsString()
  @IsOptional()
  front?: string;

  @IsString()
  @IsOptional()
  back?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;
}
