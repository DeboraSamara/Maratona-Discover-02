const express = require('express'); //biblioteca para criar o servidor
const routes = express.Router() // parte do express que vai criar os caminhos

const views = __dirname + '/views/'

const profile = {
    name: "Débora",
    avatar: "https://github.com/DeboraSamara.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hour-per-day": 5,
    "vacation-per-year": 4
}

//basePath = caminho base     
//__dirname - vai atrás das traduções

//  o ejs já lê isso por padrão. Por isso, vamos retirar o "const basePath = __dirname + "/views" ""  dessa linha e os basePath dos arquivos abaixo também
// como    routes.get('/', (req, res) => res.render("/index.html")). além disso vamos tirar a barra da frente pq o ejs já sabe que está na pasta views, não é necessário a barra na frente

// req, res
// mudar render, já que não vai mais enviar o arquivo, vai renderizar o arquivo para render
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile : profile} ))

module.exports = routes;