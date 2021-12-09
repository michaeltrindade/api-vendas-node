/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProdutoRepositorio } from "../typeorm/repositorios/ProdutoRepositorio";

interface IRequest {
  id: string;
}

class DeletarProdutoServico {
  public async deletar( { id }: IRequest ): Promise<void> {
    const produtoRepositorio = getCustomRepository(ProdutoRepositorio);

    const produto = await produtoRepositorio.findOne(id);

    if (!produto){
      throw new AppError('Produto não encontrado')
    }
    await produtoRepositorio.remove(produto);
  }
}
export default DeletarProdutoServico;
