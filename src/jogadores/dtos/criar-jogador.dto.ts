import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CriarJogadorDto {
  @IsPhoneNumber('BR')
  readonly telefoneCelular: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly nome: string;
}
