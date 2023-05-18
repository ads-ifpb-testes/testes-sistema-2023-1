import SeriesRepository from "./series.repository.js";

export class SeriesService {
  constructor(repository) {
    this.repository = repository || new SeriesRepository();
  }

  async salvar(serie) {
    const contemTitulo = "titulo" in serie && serie.titulo.length > 0;
    if (!contemTitulo) {
      throw Error("Série não contem titulo");
    }
    if (serie.ano > new Date().getFullYear()) {
      throw Error("Não é possível cadastrar séries futuras");
    }
    const existente = await this.repository.buscarPor(serie.titulo, serie.ano);
    if (existente) throw Error("Série já existe");
    return this.repository.salvar(serie);
  }
  async buscar(id) {
    return this.repository.buscar(id);
  }
  async listar() {
    return this.repository.listar();
  }
  async getQtde() {
    return this.repository.getQtde();
  }
  async atualizar(serie) {
    return this.repository.atualizar(serie);
  }
  async remover(id) {
    return this.repository.remover(id);
  }
}
