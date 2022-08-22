'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let {text , locale} = req.body;
      if(!locale || text == undefined) return res.json({error: 'Required field(s) missing'});
      if(text == "") return res.json({error: 'No text to translate'});

      if(locale=='american-to-british' || locale == 'british-to-american'){
        console.log('locale, text', locale, text)
        let newText = translator.convay(locale, text)[0];
        let newTextHignlight = translator.convay(locale, text)[1];
        console.log('newText1: ', newText)
       // console.log('text.toLowerCase() === newText.toLowerCase()', text.toLowerCase() === newText.toLowerCase());
       // console.log('text.toLowerCase() , newText.toLowerCase()', text.toLowerCase() , newText.toLowerCase());
        if(text.toLowerCase().trim() === newText.toLowerCase().trim())  {res.json({text: text, translation: "Everything looks good to me!"}); return;}
        console.log('newText1: ', newText)
        return res.json({text: text , translation: newTextHignlight});
      } else 
      return res.json({error: 'Invalid value for locale field'});
      
     });
};
