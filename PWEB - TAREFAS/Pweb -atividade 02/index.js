const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

const rotaMiddleware = (nome) => {
  return (req, res, next) => {
    console.log(`Entrou na rota: ${nome}`)
    next()
  }
}

app.get('/', rotaMiddleware('index'), (req, res) => {
  res.send('Página Index')
})

app.get('/about', rotaMiddleware('about'), (req, res) => {
  res.send('Página About')
})

app.get('/signup', rotaMiddleware('signup'), (req, res) => {
  res.send('Página Signup')
})

app.get('/signin', rotaMiddleware('signin'), (req, res) => {
  res.redirect('/signup')
})

app.get('/users/:userid', rotaMiddleware('users'), (req, res) => {
  const user = req.params.userid
  res.send(`Bem-vindo, ${user}!`)
})

app.post('/data', rotaMiddleware('data'), (req, res) => {
  res.send('Dados recebidos POST')
})

app.use((req, res) => {
  res.status(404).send(`
    <h1>Erro 404</h1>
    <p>Página não encontrada</p>
    <a href="/">Voltar para o início</a>
  `)
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})