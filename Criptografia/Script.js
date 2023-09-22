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
    res.render('otp.ejs', { encryptedText: null, decryptedText: null });
});

app.post('/otp', (req, res) => {
    const plaintext = req.body.plaintext;
    const key = req.body.key;

    try {
        const encryptedText = encryptOTP(plaintext, key);
        const decryptedText = decryptOTP(encryptedText, key);

        res.render('otp.ejs', { encryptedText, decryptedText });
    } catch (error) {
        res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.get('/cesar', (req, res) => {
    res.render('cesar.ejs', { encryptedText: null, decryptedText: null });
});

app.post('/cesar/encrypt', (req, res) => {
    const plaintext = req.body.plaintext;
    const shift = parseInt(req.body.shift);
  
    try {
      const encryptedText = encryptCaesar(plaintext, shift);
      res.render('cesar.ejs', { encryptedText, decryptedText: null });
    } catch (error) {
      res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.post('/cesar/decrypt', (req, res) => {
    const encryptedText = req.body.encryptedText;
    const shift = parseInt(req.body.shift);
  
    try {
      const decryptedText = decryptCaesar(encryptedText, shift);
      res.render('cesar.ejs', { encryptedText, decryptedText });
    } catch (error) {
      res.status(500).send('Erro ao descriptografar o texto.');
    }
});

app.get('/vigenere', (req, res) => {
    res.render('vigenere.ejs', { encryptedText: null, decryptedText: null });
});

app.post('/vigenere/encrypt', (req, res) => {
    const plaintext = req.body.plaintext;
    const key = req.body.key;
  
    try {
      const encryptedText = encryptVigenere(plaintext, key);
      res.render('vigenere.ejs', { encryptedText, decryptedText: null });
    } catch (error) {
      res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.post('/vigenere/decrypt', (req, res) => {
    const encryptedText = req.body.encryptedText;
    const key = req.body.key;
  
    try {
      const decryptedText = decryptVigenere(encryptedText, key);
      res.render('vigenere.ejs', { encryptedText, decryptedText });
    } catch (error) {
      res.status(500).send('Erro ao descriptografar o texto.');
    }
});

app.get('/hill', (req, res) => {
    res.render('hill.ejs', { encryptedText: null, decryptedText: null });
});

app.post('/hill/encrypt', (req, res) => {
    const plaintext = req.body.plaintext;
    const key = req.body.key;
  
    try {
      // Converte a matriz chave fornecida como uma string em uma matriz numérica
      const keyMatrix = key.split('\n').map(row => row.split(',').map(Number));
      const encryptedText = encryptHill(plaintext, keyMatrix);
      res.render('hill.ejs', { encryptedText, decryptedText: null });
    } catch (error) {
      res.status(500).send('Erro ao criptografar o texto.');
    }
});

app.post('/hill/decrypt', (req, res) => {
    const encryptedText = req.body.encryptedText;
    const key = req.body.key;
  
    try {
      // Converte a matriz chave fornecida como uma string em uma matriz numérica
      const keyMatrix = key.split('\n').map(row => row.split(',').map(Number));
      const decryptedText = decryptHill(encryptedText, keyMatrix);
      res.render('hill.ejs', { encryptedText, decryptedText });
    } catch (error) {
      res.status(500).send('Erro ao descriptografar o texto.');
    }
});

app.get('*:pagina',(req,res)=>{

    let {pagina} = req.params;

    console.log(pagina);
       
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