'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let {text , locale} = req.body;
      if(!locale || text == undefined) return res.json({error: 'Required field(s) missing'});
      if(text == "") return res.json({error: 'No text to translate'});
      if(locale == 'american-to-british'){

      }
      else if(locale == 'british-to-american'){

      }
      else return res.json({error: 'Invalid value for locale field'});
      
    });
};
