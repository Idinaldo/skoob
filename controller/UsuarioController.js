const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();
const path = "layouts/usuario";

// Rotas principais


// GET | rota para views/layout/usuario/index.handlebars
router.get("/user", async (req, res) => {
  let Usuarios = await Usuario.findAll();
  Usuarios = Usuarios.map((Usuario) => Usuario.dataValues);
  
  res.render(path + '/index', { Usuarios });
}); // funciona | testado


// GET | rota para views/layout/usuario/create.handlebars
router.get('/user/create', (req, res) => {
  res.render(path + '/create');
}); // funciona | testado


// POST | rota para views/layout/usuario/create.handlebars
router.post('/user/create', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Usuario.create({  id, titulo, dtlanc, autor, genero, preco, adap_cinema });
  res.redirect('/');
}); // não sei se funciona | não testado


// GET | rota para views/layout/usuario/edit.handlebars
router.get('/user/edit/:id', async (req, res) => {
  let Usuario = await Usuario.findByPk(req.params.id);
  Usuario = Usuario.dataValues;
  
  res.render(path + '/edit', { Usuario });
}); // não sei se funciona | não testado


// POST | rota para views/layout/usuario/edit.handlebars
router.post('/user/edit/:id', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Usuario.update({id, titulo, dtlanc, autor, genero, preco, adap_cinema }, { where: { id: req.params.id } });
  res.redirect('/');
});


// ARQUIVO INEXISTENTE
// GET | rota para views/layout/usuario/delete.handlebars
router.get('/user/delete/:id', async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

/*
app.get('/user/main', async (req, res) => {
  let Usuarios = await Usuario.findAll();
  Usuarios = Usuarios.map((Usuario) => Usuario.dataValues);
  
  res.render('livros/index', { Usuarios });
});

app.get('/create-user', (req, res) => {
  res.render('create-user');
});

app.post('/create-user', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Usuario.create({  id, titulo, dtlanc, autor, genero, preco, adap_cinema });
  res.redirect('/');
});

app.get('/edit-user/:id', async (req, res) => {
  let Usuario = await Usuario.findByPk(req.params.id);
  Usuario = Usuario.dataValues;
  
  res.render('edit-user', { Usuario });
});

app.post('/edit-user/:id', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Usuario.update({id, titulo, dtlanc, autor, genero, preco, adap_cinema }, { where: { id: req.params.id } });
  res.redirect('/');
});

app.get('/delete-user/:id', async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

*/
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;