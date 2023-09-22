const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

const porta = 3000;
const { encryptOTP, decryptOTP } = require('./resources/criptog/otp.js');
const { encryptCaesar, decryptCaesar } = require('./resources/criptog/cesar');
const { encryptVigenere, decryptVigenere } = require('./resources/criptog/vigenere');
const { encryptHill, decryptHill } = require('./resources/criptog/hill');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('WEB_IFSP\public'));

app.get('/',(req,res)=>{
    res.status(200).render('home');
});

app.get('/otp', (req, res) => {
    res.render('otp.ejs', { etext: null, decryptedText: null });
});

app.post('/otp', (req, res) => {
    const text = req.body.text;
    const key = req.body.key;

    try {
        const etext = encryptOTP(text, key);
        const decryptedText = decryptOTP(etext, key);

        res.render('otp.ejs', { etext, decryptedText });
    } catch (error) {
        res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.get('/cesar', (req, res) => {
    res.render('cesar.ejs', { etext: null, decryptedText: null });
});

app.post('/cesar/encrypt', (req, res) => {
    const text = req.body.text;
    const shift = parseInt(req.body.shift);
  
    try {
      const etext = encryptCaesar(text, shift);
      res.render('cesar.ejs', { etext, decryptedText: null });
    } catch (error) {
      res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.post('/cesar/decrypt', (req, res) => {
    const etext = req.body.etext;
    const shift = parseInt(req.body.shift);
  
    try {
      const decryptedText = decryptCaesar(etext, shift);
      res.render('cesar.ejs', { etext, decryptedText });
    } catch (error) {
      res.status(500).send('Erro ao descriptografar o texto.');
    }
});

app.get('/vigenere', (req, res) => {
    res.render('vigenere.ejs', { etext: null, decryptedText: null });
});

app.post('/vigenere/encrypt', (req, res) => {
    const text = req.body.text;
    const key = req.body.key;
  
    try {
      const etext = encryptVigenere(text, key);
      res.render('vigenere.ejs', { etext, decryptedText: null });
    } catch (error) {
      res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.post('/vigenere/decrypt', (req, res) => {
    const etext = req.body.etext;
    const key = req.body.key;
  
    try {
      const decryptedText = decryptVigenere(etext, key);
      res.render('vigenere.ejs', { etext, decryptedText });
    } catch (error) {
      res.status(500).send('Erro ao descriptografar o texto.');
    }
});

app.get('/hill', (req, res) => {
    res.render('hill.ejs', { etext: null, decryptedText: null });
});

app.post('/hill/encrypt', (req, res) => {
    const text = req.body.text;
    const key = req.body.key;
  
    try {
      // Converte a matriz chave fornecida como uma string em uma matriz numérica
      const keyMatrix = key.split('\n').map(row => row.split(',').map(Number));
      const etext = encryptHill(text, keyMatrix);
      res.render('hill.ejs', { etext, decryptedText: null });
    } catch (error) {
      res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.post('/hill/decrypt', (req, res) => {
    const etext = req.body.etext;
    const key = req.body.key;
  
    try {
      // Converte a matriz chave fornecida como uma string em uma matriz numérica
      const keyMatrix = key.split('\n').map(row => row.split(',').map(Number));
      const decryptedText = decryptHill(etext, keyMatrix);
      res.render('hill.ejs', { etext, decryptedText });
    } catch (error) {
      res.status(500).send('Erro ao descriptografar o texto.');
    }
});

app.get('*:pagina',(req,res)=>{

  let {pagina} = req.params;

  res.status(200).render('erro', {pagina});
       
})

/*
    REST
    Recurso: comentario

    Endpoint: /comentario

    CRUD:

    GET     /comentario                 - READ
    GET     /comentario/:id             - READ
    GET     /comentario/:id/comentario  - READ
    POST    /comentario                 - CREATE
    PATCH   /comentario/:id             - UPDATE
    DELETE  /comentario/:id             - DELETE/DESTROY

*/
app.listen(porta, ()=>{
    console.log('Working on port'+ porta +'!')
});