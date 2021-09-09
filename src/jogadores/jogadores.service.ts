import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogadorEncontrado) {
      return this.criar(criarJogadorDto);
    }

    return this.atualizar(criarJogadorDto, jogadorEncontrado);
  }

  private atualizar(
    criarJogadorDto: CriarJogadorDto,
    jogadorEncontrado: Jogador,
  ): Jogador {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
    return jogadorEncontrado;
  }

  private criar(criarJogadorDto: CriarJogadorDto): Jogador {
    const { email, nome, telefoneCelular } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      email,
      telefoneCelular,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'https://www.google.com.br',
    };

    this.jogadores.push(jogador);

    this.logger.log(`CriaJogadorDto: ${JSON.stringify(criarJogadorDto)}`);

    return jogador;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }
}
