/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import Produto from '../entidades/Produto';

@EntityRepository(Produto)
export class ProdutoRepositorio extends Repository<Produto> {
  public async findByName(nome: string): Promise<Produto | undefined> {
      const produto = this.findOne({
        where: {
          nome,
        },
      });
      return produto;
  }
}
export default ProdutoRepositorio;
