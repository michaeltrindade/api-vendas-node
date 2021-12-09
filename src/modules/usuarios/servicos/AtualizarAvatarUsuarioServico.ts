/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entidades/Usuario";
import UsuarioRepositorio from "../typeorm/repositorios/UsuarioRepositorio";
import uploadConfig from '@config/upload';

interface IRequest {
  usuario_id: string;
  avatarFilename: string;
}

class AtualizarAvatarUsuarioServico {
  public async criar({ usuario_id, avatarFilename }: IRequest): Promise<Usuario> {
    const usuarioRepositorio = getCustomRepository(UsuarioRepositorio);

    const usuario = await usuarioRepositorio.findById(usuario_id);

    if (!usuario) {
      throw new AppError('Usuario não encontrado');
    }

    if (usuario.avatar) {
      const usuarioAvatarFilePath = path.join(uploadConfig.directory, usuario.avatar);

      const usuarioAvatarFileExiste = await fs.promises.stat(usuarioAvatarFilePath);

      if (usuarioAvatarFileExiste) {
        await fs.promises.unlink(usuarioAvatarFilePath);
      }
    }
    usuario.avatar = avatarFilename;

    await usuarioRepositorio.save(usuario);

    return usuario;
  }
}
export default AtualizarAvatarUsuarioServico;
