import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

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
    @Param('id') id: string,
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return this.jogadoresService.atualizarJogador(id, criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[] | Jogador> {
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Get(':id')
  async consultarJogadorPeloId(
    @Param('id', JogadoresValidacaoParametrosPipe) id: string,
  ): Promise<Jogador> {
    return this.jogadoresService.consultarJogadorPeloId(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteJogador(@Param('id') id: string): Promise<void> {
    return this.jogadoresService.deletarJogador(id);
  }
}
