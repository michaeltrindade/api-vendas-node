import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entidades/Usuario';
import UsuarioRepositorio from '../typeorm/repositorios/UsuarioRepositorio';

class ListarTodosUsuarioServico {
  public async listarTodos(): Promise<Usuario[]> {
    const usuarioRepositorio = getCustomRepository(UsuarioRepositorio);

    const usuarios = usuarioRepositorio.find();
    return usuarios;
  }
}
export default ListarTodosUsuarioServico;
