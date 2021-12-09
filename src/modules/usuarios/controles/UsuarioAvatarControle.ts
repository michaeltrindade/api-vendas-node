/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import AtualizarAvatarUsuarioServico from '../servicos/AtualizarAvatarUsuarioServico';

class UsuarioAvatarControle {
  public async atualizar(request: Request, response: Response): Promise<Response> {
    const atualizarAvatar = new AtualizarAvatarUsuarioServico();

    const usuario = atualizarAvatar.criar({
      usuario_id: request.usuario.id,
      avatarFilename: request.file?.filename as string,
    });
    return response.json(usuario);
  }
}
export default UsuarioAvatarControle;
