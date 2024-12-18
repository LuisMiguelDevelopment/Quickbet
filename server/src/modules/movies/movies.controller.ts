import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('all-movies')
  async findAll() {
    return this.moviesService.allMovies();
  }

  @Get('now-paying')
  async getNowPaying() {
    return this.moviesService.nowPaying();
  }

  @Get('up-coming')
  async getUpComing() {
    return this.moviesService.upComing();
  }

  @Get('buscar-movie')
  async buscarMovie(@Query('query') query: string) {
    return this.moviesService.buscarMoviePorTitulo(query);
  }

  @Get('genre')
  async getGeneros() {
    return this.moviesService.obtenerGeneros();
  }

  @Get('buscar-por-genero')
  async buscarPorGenero(@Query('generoId') generoId: number) {
    return this.moviesService.buscarMoviesPorGenero(generoId);
  }

  @Get(':id')
  async getDetallesMovie(@Param('id') id: number) {
    return this.moviesService.detallesMovies(id);
  }
}
