import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TMDB_API_KEY } from 'src/config/config';
@Injectable()
export class MoviesService {
  private readonly apiKey = TMDB_API_KEY;
  private readonly apiUrl = 'https://api.themoviedb.org/3';

  async allMovies() {
    try {
      const res = await axios.get(`${this.apiUrl}/movie/popular`, {
        params: {
          api_key: this.apiKey,
          language: 'es-ES',
        },
      });
      return res.data.results;
    } catch (error) {
      throw new Error('No se pudieron obtener las películas');
    }
  }

  async buscarMoviePorTitulo(query: string): Promise<any> {
    if (!query) {
      console.log('Query is undefined', query);
    }

    try {
      const res = await axios.get(`${this.apiUrl}/search/movie`, {
        params: {
          api_key: this.apiKey,
          language: 'es-ES',
          query: query.trim(),
        },
      });

      return res.data.results;
    } catch (error) {
      console.log(error);
      throw new Error('No se pudo buscar la pelicula');
    }
  }

  async obtenerGeneros(): Promise<any> {
    try {
      const res = await axios.get(`${this.apiUrl}/genre/movie/list`, {
        params: {
          api_key: this.apiKey,
          language: 'es-ES',
        },
      });

      return res.data.genres;
    } catch (error) {
      console.log(error);
      throw new Error('No se pudo buscar la pelicula');
    }
  }

  async buscarMoviesPorGenero(generoId: number): Promise<any> {
    try {
      const res = await axios.get(`${this.apiUrl}/discover/movie`, {
        params: {
          api_key: this.apiKey,
          language: 'es-ES',
          with_genres: generoId,
        },
      });

      return res.data.results;
    } catch (error) {
      console.log(error);
      throw new Error('No se pudieron obtener las películas por género');
    }
  }

  async detallesMovies(movieId: number): Promise<any> {
    try {
      const res = await axios.get(`${this.apiUrl}/movie/${movieId}`, {
        params: {
          api_key: this.apiKey,
          language: 'es-ES',
        },
      });

      return res.data;
    } catch (error) {
      throw new Error('No se pudo obtener la pelicula');
    }
  }
}
