import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  BadRequestException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registrar(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const { user, token } =
        await this.usersService.registrarUser(createUserDto);

      res.cookie('token', token);

      return res.status(HttpStatus.CREATED).json({
        message: 'Usuario registrado con exito',
        user,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: { correo: string; contrasena: string },
    @Res() res: Response,
  ) {
    try {
      const { user, token } = await this.usersService.login(
        loginDto.correo,
        loginDto.contrasena,
      );

      res.cookie('token', token);

      return res.status(HttpStatus.OK).json({
        message: 'Inicio de sesión ok',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al iniciar sesión');
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
