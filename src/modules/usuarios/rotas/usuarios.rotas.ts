import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsuariosControle from '../controles/UsuariosControle';
import autenticado from '../../../shared/http/middlewares/autenticado';
import UsuarioAvatarControle from '../controles/UsuarioAvatarControle';

const usuariosRotas = Router();
const usuariosControle = new UsuariosControle();
const usuarioAvatarControle = new UsuarioAvatarControle();

const upload = multer(uploadConfig);

usuariosRotas.get('/', autenticado, usuariosControle.mostrarUsuarios);

usuariosRotas.get(
  '/:id',
  autenticado,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usuariosControle.mostrarUsuario,
);

usuariosRotas.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usuariosControle.criarUsuario,
);
//metodo patch é sado para atualizar um ou mais campos, acompanhado do single, atualizará um unico campo.
usuariosRotas.patch(
  '/avatar',
  autenticado,
  upload.single('avatar'),
  usuarioAvatarControle.atualizar,
);
export default usuariosRotas;
