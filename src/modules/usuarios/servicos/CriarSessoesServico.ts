/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth';
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entidades/Usuario";
import UsuarioRepositorio from "../typeorm/repositorios/UsuarioRepositorio";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  usuario: Usuario;
  token: string;
}

class CriarSessoesServico {
  public async criar({ email, password }: IRequest): Promise<IResponse> {
    const usuarioRepositorio = getCustomRepository(UsuarioRepositorio);
    const usuario = await usuarioRepositorio.findByEmail(email);

    if (!usuario) {
      throw new AppError('E-mail ou Senha Inválido.', 401);
    }

    const confirmandoSenha = await compare(password, usuario.password);

    if (!confirmandoSenha) {
      throw new AppError('E-mail ou Senha Inválido.', 401);
    }

    //configurando token abaixo, obs: nao se deve colocar infor...sensivel no payload, por isso foi criado o arquivo auth.ts para guardar as configurações.
    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}
export default CriarSessoesServico;
