import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * Definicion del esquema de usuario MONGODB
 */
@Schema()
export class User {
  /**
   * Propiedad para correo electronico
   * Es obligatorio , debe de ser un correo unico y no debe de tener espacios
   */

  @Prop({ required: true, unique: true, trim: true })
  correo: string;

  /**
   * Propiedad para contraseña
   * Es obligatorio  y no debe de tener espacios
   */

  @Prop({ required: true, trim: true })
  contrasena: string;

  /**
   * Propiedad para oktaId
   * No es oblogatorio
   */
  @Prop({ required: false })
  oktaId: string;
}

export const userSchema = SchemaFactory.createForClass(User);
