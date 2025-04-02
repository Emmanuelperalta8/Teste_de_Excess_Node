const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Página inicial");
});

app.get("/excecao", (req, res) => {
    throw new Error("Erro gerado propositalmente!");
});

app.get("/demorado", (req, res) => {
    setTimeout(() => {
        res.send("Resposta após 60 segundos");
    }, 60000);
});

app.use((err, req, res, next) => {
    res.status(500).send("Erro no servidor: " + err.message);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
