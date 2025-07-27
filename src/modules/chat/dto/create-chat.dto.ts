import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  room_id: string; // 채팅방 ID

  @IsString()
  @IsNotEmpty()
  nickname: string; // 익명 사용자 닉네임

  @IsString()
  @IsNotEmpty()
  color: string; // 익명 사용자 색상

  @IsString()
  @IsNotEmpty()
  message: string; // 채팅 내용

  @IsOptional()
  created_at?: Date; // 메시지 전송 시간 (옵션)
}
