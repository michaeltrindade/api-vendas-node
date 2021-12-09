/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import CriarUsuarioServico from '../servicos/CriarUsuarioServico';
import ListarTodosUsuarioServico from '../servicos/ListarTodosUsuarioServico';
import ListarUsuarioServico from '../servicos/ListarUsuarioServico';

class UsuariosControle {
  public async mostrarUsuarios(request: Request, response: Response) {
    const listarUsuarios = new ListarTodosUsuarioServico();

    const usuarios = await listarUsuarios.listarTodos();

    return response.json(usuarios);
  }

  public async mostrarUsuario(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listarUsuario = new ListarUsuarioServico();

    const usuario = await listarUsuario.listar({ id });

    return response.json(usuario);
  }

  public async criarUsuario(request: Request, response: Response): Promise<Response> {
    const { nome, email, password } = request.body;

    const criarNovoUsuario = new CriarUsuarioServico();

    const usuario = await criarNovoUsuario.criar({
      nome,
      email,
      password,
    });
    return response.json(usuario);
  }
}
export default UsuariosControle;
