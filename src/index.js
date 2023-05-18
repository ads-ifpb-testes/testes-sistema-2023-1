// Importar os módulos necessários
import express, { urlencoded } from "express";
import nunjucks from "nunjucks";
import { SeriesService } from "./series/series.service.js";

// Criar uma instância do Express
const app = express();

// Configurar o middleware para analisar o corpo das requisições
app.use(urlencoded({ extended: true }));

// Configurar o mecanismo de visualização do Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const seriesService = new SeriesService();

app.get("/", (req, res) => res.redirect("/series"));

// Definir a rota inicial
app.get("/series", async (req, res) => {
  const series = await seriesService.listar();
  res.render("index.njk", { series });
});

// Tratar a submissão do formulário
app.post("/series/add", async (req, res, next) => {
  const titulo = req.body.titulo;
  const ano = req.body.ano;
  try {
    const serie = await seriesService.salvar({ titulo, ano });
    res.redirect("/");
  } catch (error) {
    res.redirect("/erro");
  }
});

app.get("/series/remove/:id", async (req, res) => {
  const { id } = req.params;
  const serie = await seriesService.remover(id);
  res.redirect("/");
});

app.get("/erro", (req, res) => res.render("erro.njk"));

// Iniciar o servidor
app.listen(3000, () => {
  console.log("API de Séries rodando na porta 3000");
});
