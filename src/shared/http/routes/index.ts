import { Router } from 'express';
import produtosRotas from '@modules/produtos/rotas/produtos.rotas';
import usuariosRotas from '@modules/usuarios/rotas/usuarios.rotas';
import sessoesRotas from '@modules/usuarios/rotas/sessoes.rotas';

const routes = Router();

routes.use('/produtos', produtosRotas);
routes.use('/usuarios', usuariosRotas);
routes.use('/sessoes', sessoesRotas);

export default routes;
