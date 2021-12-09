/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entidades/Produto";
import { ProdutoRepositorio } from "../typeorm/repositorios/ProdutoRepositorio";

interface IRequest {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;

}

class AtualizarProdutoServico {
  public async listar( {
    id,
    nome,
    preco,
    quantidade,
   }: IRequest ): Promise<Produto> {

    const produtoRepositorio = getCustomRepository(ProdutoRepositorio); //instanciando

    const produto = await produtoRepositorio.findOne(id); //procurando

    if (!produto){
      throw new AppError('Produto não encontrado')
    }

    const produtoExiste = await produtoRepositorio.findByName(nome);

    if (produtoExiste && nome != produto.nome) {
      throw new AppError('Já existe um produto com esse nome');
    }

    produto.nome = nome;
    produto.preco = preco;
    produto.quantidade = quantidade;

    await produtoRepositorio.save(produto);

    return produto;
  }
}
export default AtualizarProdutoServico;
