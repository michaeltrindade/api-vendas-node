import { createConnection } from 'typeorm';

createConnection();

/** nesse arquivo será feito a chamada ao metodo createconnection,
 * ao ser chamado, irá procurar em toda a estrutura de pastas do
 * projeto, o arquivo ORMCONFIG, Pois é nesse arquivo que estara os
 * parametros de acesso ao banco de dados. basta fazer a importação
 * deste arquivo no nosso server.ts
 */
