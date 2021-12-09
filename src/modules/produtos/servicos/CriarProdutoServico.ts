/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entidades/Produto";
import { ProdutoRepositorio } from "../typeorm/repositorios/ProdutoRepositorio";

interface IRequest {
  nome: string;
  preco: number;
  quantidade: number;
}

class CriarProdutoServico {
  public async criar({ nome, preco, quantidade }: IRequest): Promise<Produto> {
    const produtoRepositorio = getCustomRepository(ProdutoRepositorio);
    const produtoExiste = await produtoRepositorio.findByName(nome);

    if (produtoExiste) {
      throw new AppError('Já existe um produto com esse nome');
    }

    const produto = produtoRepositorio.create({
      nome,
      preco,
      quantidade,
    });
    await produtoRepositorio.save(produto);
    return produto;
  }
}
export default CriarProdutoServico;
