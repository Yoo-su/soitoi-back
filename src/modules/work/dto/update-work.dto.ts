import { IsEnum, IsInt } from 'class-validator';

export class UpdateWorkDto {
  @IsInt()
  id: number;

  @IsEnum(['planned', 'in_progress', 'done'])
  status: 'planned' | 'in_progress' | 'done';
}
