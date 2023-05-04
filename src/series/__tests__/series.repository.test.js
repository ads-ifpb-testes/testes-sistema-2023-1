import { PostgreSqlContainer } from "testcontainers";
import SeriesRepository from "../series.repository";

import Knex from "knex";

describe("Integração com o banco de dados", () => {
  let container;
  let seriesRepository;
  let knex;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    knex = Knex({
      client: "pg",
      connection: {
        host: container.getHost(),
        port: container.getPort(),
        user: container.getUsername(),
        password: container.getPassword(),
        database: container.getDatabase(),
      },
    });
    // Executa a migração com o script SQL de criação de tabelas
    await knex.schema.raw(`
      CREATE TABLE series (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        ano INTEGER NOT NULL
      );
    `);

    seriesRepository = new SeriesRepository(knex);
  });

  beforeEach(async () => {
    // Limpa a tabela de séries antes de cada teste
    await knex("series").delete();
  });

  test("Deve inserir uma série", async () => {
    const serie = {
      titulo: "Succession",
      ano: 2018,
    };
    const serieSalva = await seriesRepository.salvar(serie);
    console.log(serieSalva);
    expect(serieSalva).toBeDefined();
    expect(serieSalva.id).toBeDefined();
  });

  test("Deve inserir várias séries, cada uma deve ter um id diferente", async () => {
    const serie1 = {
      titulo: "Succession",
      ano: 2018,
    };
    const serie2 = {
      titulo: "Mr. Robot",
      ano: 2013,
    };
    const serieSalva1 = await seriesRepository.salvar(serie1);
    const serieSalva2 = await seriesRepository.salvar(serie2);

    console.log(serieSalva1, serieSalva2);
    expect(serieSalva1.id).not.toBe(serieSalva2.id);
  });

  test("Não deve existir uma série", async () => {
    const serieSalva = await seriesRepository.buscar(1);
    expect(serieSalva).not.toBeDefined();
  });

  afterAll(async () => {
    knex.destroy();
    container.stop();
  });
});
