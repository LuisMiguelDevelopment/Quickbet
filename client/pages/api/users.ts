import axios from "./axios";

interface RegisterUser {
  correo: string;
  contrasena: string;
}

interface RegisterUserResponse {
  message: string;
  user?: {
    correo: string;
    contrasena: string;
    _id: string;
  };
}


