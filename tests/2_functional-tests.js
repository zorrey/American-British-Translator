const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator;
const AMBR = 'american-to-british';
const BRAM = 'british-to-american';
const highString = '<span class="highlight">';

suite('Functional Tests', () => {
    suite('Post request to api/translate', () => {
         // #1
        test('Translation with text and locale fields: POST request to /api/translate', 
        function (done) {
        chai
       .request(server)
       .post('/api/translate')
       .send({
           locale:BRAM,
           text: "I have new trousers and two new brollies"
             })
       .end(function (err, res) {
         if (err) console.error();
        assert.equal(res.status, 200);
        console.log('res.body', res.body)
         assert.equal(res.body.translation, `I have new ${highString}pants</span> and two new ${highString}umbrellas</span>`);
         assert.equal(res.body.text, "I have new trousers and two new brollies");
         assert.isObject(res.body, 'Response is an object');
         assert.property(res.body,'translation', 'Response includes "translation"');
         assert.property(res.body,'text', 'Response includes "text"');
         done();
       });
      });
         // #2
        test('Translation with text and invalid locale field: POST request to /api/translate', 
        function (done) {
        chai
       .request(server)
       .post('/api/translate')
       .send({
           locale:"smth",
           text: "I have new trousers and two new brollies"
             })
       .end(function (err, res) {
         if (err) console.error();
        assert.equal(res.status, 200);
        console.log('res.body', res.body)
         assert.equal(res.body.error, 'Invalid value for locale field');
         assert.isObject(res.body, 'Response is an object');
         assert.property(res.body,'error', 'Response includes "error"');
         done();
       });
      });
         // #3
        test('Translation with missing text field: POST request to /api/translate', 
        function (done) {
        chai
       .request(server)
       .post('/api/translate')
       .send({
           locale:AMBR
             })
       .end(function (err, res) {
         if (err) console.error();
         assert.equal(res.status, 200);
         assert.equal(res.body.error, 'Required field(s) missing');
         assert.isObject(res.body, 'Response is an object');
         assert.property(res.body, 'error', 'Response includes "error"');
         done();
       });
      });
         // #4
        test('Translation with missing locale field: POST request to /api/translate', 
        function (done) {
        chai
       .request(server)
       .post('/api/translate')
       .send({
           //locale:AMBR,
           text: "I have new trousers and two new brollies"
             })
       .end(function (err, res) {
         if (err) console.error();
         assert.equal(res.status, 200);
         assert.equal(res.body.error, 'Required field(s) missing');
         assert.isObject(res.body, 'Response is an object');
         assert.property(res.body, 'error', 'Response includes "error"');
         done();
       });
      });
         // #5
        test('Translation with empty text: POST request to /api/translate', 
        function (done) {
        chai
       .request(server)
       .post('/api/translate')
       .send({
           locale:AMBR,
           text: ""
             })
       .end(function (err, res) {
         if (err) console.error();
         assert.equal(res.status, 200);
         assert.equal(res.body.error, 'No text to translate');
         assert.isObject(res.body, 'Response is an object');
         assert.property(res.body, 'error', 'Response includes "error"');
         done();
       });
      });
         // #6
        test('Translation with text that needs no translation: POST request to /api/translate', 
        function (done) {
        chai
       .request(server)
       .post('/api/translate')
       .send({
           locale:AMBR,
           text: "I have new trousers and two new brollies"
             })
       .end(function (err, res) {
         if (err) console.error();
         assert.equal(res.status, 200);
         assert.equal(res.body.translation, 'Everything looks good to me!');
         assert.isObject(res.body, 'Response is an object');
         assert.property(res.body, 'translation', 'Response includes "translation"');
         assert.property(res.body, 'text', 'Response includes "text"');
         done();
       });
      });
    })
});
