import { Router } from 'express';
import ProdutosControle from '../controles/ProdutosControle';
import { celebrate, Joi, Segments } from 'celebrate';

const produtosRotas = Router();
const produtosControle = new ProdutosControle();

//abaixo esta um exemplo de rotas sem validação funcionando normalmente, entretanto,
//seguiremos com os modelos com validação usando o midware da função celebrate
//produtosRotas.get('/:id', produtosControle.mostrarProduto);

produtosRotas.get('/', produtosControle.mostrarProdutos);

produtosRotas.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosControle.mostrarProduto
);

produtosRotas.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      preco: Joi.number().precision(2).required(),
      quantidade: Joi.number().required(),
    },
  }),
  produtosControle.criarProduto
);

produtosRotas.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      preco: Joi.number().precision(2).required(),
      quantidade: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosControle.atualizar
);

produtosRotas.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosControle.deletar
);

export default produtosRotas;
