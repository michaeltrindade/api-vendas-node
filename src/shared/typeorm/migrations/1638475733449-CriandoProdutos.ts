/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**criando as tabelas no banco */

export class CriandoProdutos1638475733449 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      await queryRunner.createTable(
        new Table({
          name: 'produtos',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'nome',
              type: 'varchar',
            },
            {
              name: 'preco',
              type: 'decimal',
              precision: 10,
              scale: 2,
            },
            {
              name: 'quantidade',
              type: 'int',
            },
            {
              name: 'criado_em',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'atualizado_em',
              type: 'timestamp',
              default: 'now()',
            }
          ]
        })
      )
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('produtos');
    }

}
