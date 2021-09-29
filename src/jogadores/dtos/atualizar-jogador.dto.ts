import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AtualizarJogadorDto {
  @IsPhoneNumber('BR')
  readonly telefoneCelular: string;

  @IsString()
  @IsNotEmpty()
  readonly nome: string;
}
