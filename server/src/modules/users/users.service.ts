import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { OKTA_CLIENTID, OKTA_ISSUER, OKTA_AUDIENCE } from 'src/config/config';

@Injectable()
export class UsersService {
  private verificarOkta = new OktaJwtVerifier({
    issuer: OKTA_ISSUER,
    clientId: OKTA_CLIENTID,
  });

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async verificarOktaToken(token: string): Promise<any> {
    try {
      const jwt = await this.verificarOkta.verifyAccessToken(
        token,
        OKTA_AUDIENCE,
      );
      return jwt;
    } catch (error) {
      throw new Error('Token invalido');
    }
  }

  async registrarUser(createUserDto: CreateUserDto) {
    const { correo, contrasena } = createUserDto;

    try {
      const hashedContrasena = await bcrypt.hash(contrasena, 10);

      const nuevoUser = new this.userModel({
        correo,
        contrasena: hashedContrasena,
      });

      console.log(nuevoUser);

      return nuevoUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar el usuario');
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
