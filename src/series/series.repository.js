import { configureDatabase } from "../database/config.js";

class SeriesRepository {
  constructor(knexClient) {
    this.client = knexClient || configureDatabase();
  }

  async salvar(serie) {
    const { titulo, ano } = serie;
    const [series] = await this.client("series")
      .insert({ titulo, ano })
      .returning("*");
    return series;
  }

  async buscar(id) {
    const [series] = await this.client("series").where({ id: id });
    return series;
  }

  async buscarPor(titulo, ano) {
    const [series] = await this.client("series").select("*").where({
      titulo: titulo,
      ano: ano,
    });
    return series;
  }

  async listar() {
    const series = await this.client("series");
    return series;
  }

  async getQtde() {
    const series = await this.client("series");
    return series.length;
  }

  async atualizar(serie) {
    const { id, titulo, ano } = serie;
    const [series] = await this.client("series")
      .where({ id })
      .update({ titulo, ano })
      .returning("*");
    return series;
  }

  async remover(id) {
    const [series] = await this.client("series")
      .where({ id })
      .delete()
      .returning("*");
    return series;
  }
}

export default SeriesRepository;
