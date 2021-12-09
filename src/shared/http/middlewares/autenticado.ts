/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function autenticado (
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  //este metodo nao retornará nada e ira verificar se no cabeçalho existe um token
  const cabecalhoAutenticado = request.headers.authorization;

  if (!cabecalhoAutenticado) {
    throw new AppError('Token JWT não informado');
  }
  //abaixo estou verificando se o token que veio foi passado com as requisições veio com a secret da nossa aplicação
  const [, token] = cabecalhoAutenticado.split(' ');

  try {
    const tokenDecodificado = verify(token, authConfig.jwt.secret);
//devido o typescrip não conseguir saber o tipo que tem dentro do objeto tokenDecodificado.
//será necessario criar uma interface, para passar essa informação através de (as) ITokenPayload.
//com isso o objeto (sub) passa a ser entendido pelo typescript.
    const { sub } = tokenDecodificado as ITokenPayload;
//abaixo será necessario fazer uma subscrita(override) de tipo para o objeto usuario do tipo request: @types/express/index.d.ts.
    request.usuario = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token JWT inválido');
  }
}
export default autenticado;
//este metodo nao retornará nada e ira verificar se no cabeçalho existe um token
