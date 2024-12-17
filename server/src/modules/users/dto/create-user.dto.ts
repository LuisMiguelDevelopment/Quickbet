import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO  para crear un nuevo usuario
 * Contiene validacion  para correo electronico y contraseña
 * Id de okta por si el usuario escoge esta opcion
 */

export class CreateUserDto {
  /**
   * Correo electonico del usuario
   * Debe de ser un correo valido  y no puede estar vacio
   */

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  correo: string;

  /**
   * Contraseña del usuario
   * Debe de ser una contraseña con un minimo de 6 caracteres o un maximo de 22  y no puede estar vacio
   */

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message:
      'La contraseña es muy corta , Debe contener un minimo de 6 caracteres',
  })
  @MaxLength(22, {
    message:
      'La contraseña es muy larga , La contraseña debe de contener un maximo de 22 caracteres',
  })
  contrasena: string;


}
