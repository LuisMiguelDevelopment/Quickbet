import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registrarUser(createUserDto: CreateUserDto) {
    const { correo, contrasena } = createUserDto;

    try {
      const usuarioExiste = await this.userModel.findOne({ correo });

      if (usuarioExiste) {
        throw new BadRequestException('El usuario ya existe');
      }

      const hashedContrasena = await bcrypt.hash(contrasena, 10);

      const nuevoUser = new this.userModel({
        correo,
        contrasena: hashedContrasena,
      });

      const user = await nuevoUser.save();

      const payload = { correo: user.correo, id: user._id };
      const token = this.jwtService.sign(payload);

      return { user, token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }

  async login(correo: string, contrasena: string): Promise<any> {
    const user = await this.userModel.findOne({ correo });

    try {
      if (!user) {
        throw new BadRequestException('usuario no encontrado');
      }

      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      if (!validPassword) {
        throw new BadRequestException('Credeciales incorrectas');
      }

      const payload = { correo: user.correo, id: user._id };
      const token = this.jwtService.sign(payload);

      return { user, token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al iniciar sesión');
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
