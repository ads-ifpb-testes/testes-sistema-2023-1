class SeriesRepository {
  constructor(knexClient) {
    this.knexClient = knexClient;
  }

  async salvar(serie) {
    const { titulo, ano } = serie;
    const [series] = await this.knexClient("series")
      .insert({ titulo, ano })
      .returning("*");
    return series;
  }

  async buscar(id) {
    const [series] = await this.knexClient("series").where({ id });
    return series;
  }

  async listar() {
    const series = await this.knexClient("series");
    return series;
  }

  async getQtde() {
    const series = await this.knexClient("series");
    return series.length;
  }

  async atualizar(serie) {
    const { id, titulo, ano } = serie;
    const [series] = await this.knexClient("series")
      .where({ id })
      .update({ titulo, ano })
      .returning("*");
    return series;
  }

  async remover(id) {
    const [series] = await this.knexClient("series")
      .where({ id })
      .delete()
      .returning("*");
    return series;
  }
}

export default SeriesRepository;
