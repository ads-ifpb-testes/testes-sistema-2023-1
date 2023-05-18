/// <reference types="Cypress" />

describe("template spec", () => {
  const host = "http://localhost:3000";

  beforeEach(() => cy.visit(host));

  it("Deve exibir uma lista de filmes", () => {
    cy.get("#lista-series").should("exist");
  });

  it("Deve exibir um formulário para criação de séries", () => {
    cy.get("#form-serie").should("exist");
  });

  it("Deve permitir cadastrar uma série", () => {
    cy.get("#titulo").type("Friends");
    cy.get("#ano").type("1994");
    cy.get("#botao-enviar").click();

    // Deve voltar para a página inicial
    cy.url().should("eq", `${host}/series`);
    cy.contains("Friends").should("exist");
  });

  it("Deve permitir cadastrar várias séries", () => {
    const series = [
      { titulo: "Breaking Bad", ano: 2008 },
      { titulo: "Game of Thrones", ano: 2011 },
      { titulo: "Stranger Things", ano: 2016 },
      { titulo: "The Big Bang Theory", ano: 2007 },
      { titulo: "The Office", ano: 2005 },
      { titulo: "Lost", ano: 2004 },
      { titulo: "The Walking Dead", ano: 2010 },
      { titulo: "Sherlock", ano: 2010 },
    ];

    for (const serie of series) {
      cy.get("#titulo").type(serie.titulo);
      cy.get("#ano").type(serie.ano);
      cy.get("#botao-enviar").click();
    }

    // Deve voltar para a página inicial
    cy.url().should("eq", `${host}/series`);

    cy.get("#lista-series")
      .find("li")
      .should("have.length.at.least", series.length);
  });

  it("Deve ser permitido excluir uma série", () => {
    const serie = { titulo: "How I Met Your Mother", ano: 2005 };
    cy.get("#titulo").type(serie.titulo);
    cy.get("#ano").type(serie.ano);
    cy.get("#botao-enviar").click();

    cy.contains(serie.titulo).parent().find("a").click();
    cy.contains(serie.titulo).should("not.exist");
  });

  it("Deve ser permitido excluir várias séries", () => {
    const series = [
      { titulo: "Black Mirror", ano: 2011 },
      { titulo: "Westworld", ano: 2016 },
    ];

    for (const serie of series) {
      cy.get("#titulo").type(serie.titulo);
      cy.get("#ano").type(serie.ano);
      cy.get("#botao-enviar").click();
    }

    for (const serie of series) {
      cy.contains(serie.titulo).parent().find("a").click();
      cy.contains(serie.titulo).should("not.exist");
    }
  });

  it("Não deve ser permitido cadastrar a mesma série", () => {
    const serie = { titulo: "The Sopranos", ano: 1999 };

    for (let i = 0; i < 2; i++) {
      cy.get("#titulo").type(serie.titulo);
      cy.get("#ano").type(serie.ano);
      cy.get("#botao-enviar").click();
    }

    cy.url().should("eq", `${host}/erro`);
    cy.get("#erro").should("exist");
  });

  it("Deve existir um botão para retornar ao formulário após um erro", () => {
    const serie = { titulo: "Better Call Saul", ano: 2015 };

    for (let i = 0; i < 2; i++) {
      cy.get("#titulo").type(serie.titulo);
      cy.get("#ano").type(serie.ano);
      cy.get("#botao-enviar").click();
    }

    cy.contains("Retornar").should("exist");
    cy.contains("Retornar").should("have.attr", "href");
  });
});
