const series = [];

function adicionar(serie) {
  series.push(serie);
}

function remover(serie) {
  const indiceSerie = series.findIndex(
    (serieSalva) => serieSalva.titulo === serie.titulo
  );
  series.splice(indiceSerie, 1);
}

function getQtde() {
  return series.length;
}

function buscar(serie) {
  console.log("Buscando série...");
  const indiceSerie = series.findIndex(
    (serieSalva) => serieSalva.titulo === serie.titulo
  );
  return series[indiceSerie];
}

function listar() {
  return Array.from(series);
}

export default {
  adicionar,
  remover,
  buscar,
  getQtde,
  listar,
};
