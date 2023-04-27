import seriesRepository from "./series.repository";
class SeriesService {
  constructor() {}

  add(serie, isTesting) {
    const contemTitulo = "titulo" in serie && serie.titulo !== "";
    if (!contemTitulo) {
      throw Error("Série não contem titulo");
    }
    if (serie.ano > new Date().getFullYear()) {
      throw Error("Não é possível cadastrar séries futuras");
    }
    if (serie.genero === undefined || serie.genero.length === 0) {
      throw Error("Não é possível cadastrar séries sem gênero");
    }
    const serieExistente = seriesRepository.buscar(serie);
    if (serieExistente) {
      throw Error("A série já está cadastrada");
    }
    return seriesRepository.adicionar(serie);
  }

  getQtdeSeries() {
    return seriesRepository.getQtde();
  }
}

export { SeriesService };
