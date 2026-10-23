const express = require("express");

const app = express();
app.use(express.json());

const PORTA = 3000;

let titulos = [
  { id: 1, titulo: "Flamengo 1981" },
  { id: 2, titulo: "Corinthians 2012" },
  { id: 3, titulo: "Palmeiras 2021" },
  { id: 4, titulo: "Botafogo-PB 2013" },
];

app.get("/api/titulos", (request, response) => {
  console.log(titulos);
  return response.status(200).json(titulos);
});

app.post("/api/titulos", (request, response) => {
  const titulo = request.body.titulo;
  const novoTitulo = {
    id: titulos.length + 1,
    titulo: titulo,
  };
  titulos.push(novoTitulo);
  console.log(titulos);
  return response.status(201).json(novoTitulo);
});

app.delete("/api/titulos/:id", (request, response) => {
  const id = Number(request.params.id);
  titulos = titulos.filter((titulo) => titulo.id !== id);
  console.log(titulos);
  return response.status(200).send();
});

app.patch("/api/titulos/:id", (request, response) => {
  const id = Number(request.params.id);
  const titulo = request.body.titulo;
  const tituloExistente = titulos.find((item) => item.id === id);
  tituloExistente.titulo = titulo;
  console.log(titulos);
  return response.status(200).json(tituloExistente);
});

app.listen(PORTA, "0.0.0.0", () => {
  console.log(titulos);
  console.log(`API disponível na porta ${PORTA}`);
});
