/* eslint-disable prettier/prettier */
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entidades/Usuario';
import UsuarioRepositorio from '../typeorm/repositorios/UsuarioRepositorio';

interface IRequest {
  id: string;
}

class ListarUsuarioServico {
  public async listar({ id }: IRequest): Promise<Usuario> {
    const usuarioRepositorio = getCustomRepository(UsuarioRepositorio);

    const usuario = await usuarioRepositorio.findOne(id);

    if (!usuario) {
      throw new AppError('Usuario não encontrado')
    }
    return usuario;
  }
}
export default ListarUsuarioServico;
