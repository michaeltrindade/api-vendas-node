/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import AtualizarProdutoServico from '../servicos/AtualizarProdutoServico';
import CriarProdutoServico from '../servicos/CriarProdutoServico';
import DeletarProdutoServico from '../servicos/DeletarProdutoServico';
import ListarProdutoServico from '../servicos/ListarProdutoServico';
import ListarTodosProdutoServico from '../servicos/ListarTodosProdutoServico';

class ProdutosControle {
  public async mostrarProdutos(request: Request, response: Response): Promise<Response> {
    const listarProdutos = new ListarTodosProdutoServico();

    const produtos = await listarProdutos.listarTodos();

    return response.json(produtos);
  }

  public async mostrarProduto(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listarProduto = new ListarProdutoServico();

    const produto = await listarProduto.listar({ id });

    return response.json(produto);
  }

  public async criarProduto(request: Request, response: Response): Promise<Response> {
    const { nome, preco, quantidade } = request.body;

    const criarNovoProduto = new CriarProdutoServico();

    const produto = await criarNovoProduto.criar({
      nome,
      preco,
      quantidade,
    });
    return response.json(produto);
  }

  public async atualizar(request: Request, response: Response): Promise<Response> {
    const { nome, preco, quantidade } = request.body;
    const { id } = request.params;

    const atualizarProduto = new AtualizarProdutoServico();

    const produto = await atualizarProduto.listar({
      id,
      nome,
      preco,
      quantidade,
    });
    return response.json(produto);
  }

  public async deletar(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletarProduto = new DeletarProdutoServico();

    await deletarProduto.deletar({ id });

    return response.json([]);
  }
}
export default ProdutosControle;
