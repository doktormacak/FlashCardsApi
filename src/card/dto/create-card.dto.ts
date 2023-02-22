import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  front: string;

  @IsString()
  @IsNotEmpty()
  back: string;

  @IsNumber()
  @IsOptional()
  rating?: number;
}
