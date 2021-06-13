const express = require('express'); //biblioteca para criar o servidor
const routes = express.Router() // parte do express que vai criar os caminhos

const views = __dirname + '/views/'

const profile = {
    name: "Débora",
    avatar: "https://github.com/DeboraSamara.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hour-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso ",
        "daily-hours": 2, 
        "total-hours": 60,
        created_at: Date.now()
    },
    {
        id:2,
        name: "OneTwo Project ",
        "daily-hours": 3, 
        "total-hours": 47,
        created_at: Date.now()
    }
]

function remainingDays(job){
    //Cálculo de tempo restante
    const remainingDays = (job["total-hours"]/job["daily-hours"]).toFixed()
    //tofixed - se esse número for quebrado, arredonde e deixe inteiro

    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDay() + Number(remainingDays)
    //Criação do prazo
    const dueDateInMs = createdDate.setDate(dueDay)

    const timeDiffnMs = dueDateInMs - Date.now()
    //DataFuturo - agora (tempo em mílissegundos)

    //transformar mili sem dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffnMs/dayInMs)

    //restam x dias
    return dayDiff
}


//basePath = caminho base     
//__dirname - vai atrás das traduções

//  o ejs já lê isso por padrão. Por isso, vamos retirar o "const basePath = __dirname + "/views" ""  dessa linha e os basePath dos arquivos abaixo também
// como    routes.get('/', (req, res) => res.render("/index.html")). além disso vamos tirar a barra da frente pq o ejs já sabe que está na pasta views, não é necessário a barra na frente

// req, res
// mudar render, já que não vai mais enviar o arquivo, vai renderizar o arquivo para render
routes.get('/', (req, res) => {

    const updatedJobs = jobs.map((job) => {

        //Ajustes no job
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        //operação ternária - if ternário

        return {
            ...job, //espalhamento
            remaining,
            status,
            budget: profile["value-hour"] * job["total-hours"]
        }
    })

    return res.render(views + "index", {jobs: updatedJobs } )
    
})




routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    //req.body = { name: 'Trabalho legal', 'daily-hours': '5', 'total-hours': '15' }
    //push = empurrar

    const lastId =  jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name, 
        "daily-hours": req.body["daily-hours"], 
        "total-hours": req.body["total-hours"],
        created_at: Date.now() //Atribuindo data de hoje
    })

    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile : profile} ))

module.exports = routes;