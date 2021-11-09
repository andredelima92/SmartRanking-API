import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Param('id', ValidacaoParametrosPipe) id: string,
    @Body() atualizeJogadorDto: AtualizarJogadorDto,
  ): Promise<Jogador> {
    return this.jogadoresService.atualizarJogador(id, atualizeJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[] | Jogador> {
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Get(':id')
  async consultarJogadorPeloId(
    @Param('id', ValidacaoParametrosPipe) id: string,
  ): Promise<Jogador> {
    return this.jogadoresService.consultarJogadorPeloId(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteJogador(
    @Param('id', ValidacaoParametrosPipe) id: string,
  ): Promise<void> {
    return this.jogadoresService.deletarJogador(id);
  }
}
