import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async atualizarJogador(
    id: string,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: criarJogadorDto,
        },
      )
      .exec();
  }

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail: ${email} ja cadastrado`,
      );
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ email }).exec();

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogador;
  }

  async consultarJogadorPeloId(id: string): Promise<Jogador> {
    return await this.jogadorModel.findOne({ _id: id });
  }

  async deletarJogador(id: string): Promise<void> {
    await this.jogadorModel.deleteOne({ _id: id }).exec();
  }
}
