import { Request, Response } from 'express';
import CriarSessoesServico from '../servicos/CriarSessoesServico';

class SessoesControle {
  public async criar(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const criarSessao = new CriarSessoesServico();

    const usuario = await criarSessao.criar({
      email,
      password,
    });
    return response.json(usuario);
  }
}
export default SessoesControle;
