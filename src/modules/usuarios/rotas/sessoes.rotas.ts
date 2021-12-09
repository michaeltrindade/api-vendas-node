import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessoesControle from '../controles/SessoesControle';

const sessoesRotas = Router();
const sessoesControle = new SessoesControle();

sessoesRotas.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessoesControle.criar,
);
export default sessoesRotas;
