import express from 'express';

const app = express();

/**
 * GET => buscar
 * POST => salvar
 * PUSH => alterar 
 * DELETE => deletar
 * PATCH => alteração especifica
*/

    // http://localhost:8080/users
app.get("/", (req, res) => {
    return res.json({message: "Hello World - NLW4"});
})

// 1 param => Rota (RECURSO DA API)
// 2 param => (requeste, response)

app.post("/", (req, res) => {
    return res.json({message: "Dados salvos com sucesso"});
});

app.listen(3333, () => console.log("Server is running!"));
