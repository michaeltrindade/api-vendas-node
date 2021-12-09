/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entidades/Produto";
import { ProdutoRepositorio } from "../typeorm/repositorios/ProdutoRepositorio";

interface IRequest {
  id: string;
}

class ListarProdutoServico {
  public async listar( { id }: IRequest ): Promise<Produto> {
    const produtoRepositorio = getCustomRepository(ProdutoRepositorio);

    const produto = await produtoRepositorio.findOne(id);

    if (!produto){
      throw new AppError('Produto não encontrado')
    }
    return produto;
  }
}
export default ListarProdutoServico;
