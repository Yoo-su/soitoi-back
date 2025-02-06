import { IsString, IsOptional, IsEnum, IsArray, IsEmail } from 'class-validator';
import { Work } from '../entities/work.entity';

export class CreateWorkDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Work)
  status?: Pick<Work, 'status'>;

  @IsEmail()
  createdBy: string; // User의 PK(email)를 참조

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true }) // 배열 내 모든 값이 email 형식이어야 함
  relatedUsers?: string[];
}
