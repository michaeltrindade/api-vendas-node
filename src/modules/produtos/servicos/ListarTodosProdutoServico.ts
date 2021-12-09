/* eslint-disable prettier/prettier */
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entidades/Produto";
import ProdutoRepositorio from "../typeorm/repositorios/ProdutoRepositorio";

class ListarTodosProdutoServico {
  public async listarTodos(): Promise<Produto[]> {
    const produtoRepositorio = getCustomRepository(ProdutoRepositorio);

    const produtos = produtoRepositorio.find();
    return produtos;
  }
}
export default ListarTodosProdutoServico;
