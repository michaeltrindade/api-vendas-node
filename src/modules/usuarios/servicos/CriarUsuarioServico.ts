/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entidades/Usuario";
import UsuarioRepositorio from "../typeorm/repositorios/UsuarioRepositorio";

interface IRequest {
  nome: string;
  email: string;
  password: string;
}

class CriarUsuarioServico {
  public async criar({ nome, email, password }: IRequest): Promise<Usuario> {
    const usuarioRepositorio = getCustomRepository(UsuarioRepositorio);
    const emailExiste = await usuarioRepositorio.findByEmail(email);

    if (emailExiste) {
      throw new AppError('Já existe esse email cadastrado');
    }

    const criptografandoSenha = await hash(password, 8);

    const usuario = usuarioRepositorio.create({
      nome,
      email,
      password: criptografandoSenha,
    });
    await usuarioRepositorio.save(usuario);
    return usuario;
  }
}
export default CriarUsuarioServico;
