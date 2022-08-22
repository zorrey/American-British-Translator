const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');
//let mode = 'american-to-british' // or 'british-to-american'
let  regex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g;

let transData = [...Object.entries(americanOnly),...Object.entries(americanToBritishSpelling)];
let titlesData = [...Object.entries(americanToBritishTitles)];
Object.keys(britishOnly).forEach(key =>{
    transData.push([
        britishOnly[key],
        key
    ])
})
//console.log(transData);
const highString = '<span class="highlight">';
let highLength = highString.length;

class Translator {
   
    compare(word, dictWord, mode){
        if(!word || dictWord == []) return false;
      if(mode == 'american-to-british'){ 
         if(word.trim()==dictWord[0]){

            return `${dictWord[1] }`}
        else{
            if(word.length > dictWord[0].length){
           // let dot = word.slice(-1)=='.' ? '.' : '';
            let temp = 's';

            return ( dictWord[1].slice(-1)=="y" 
                    && dictWord[1].slice(-2,-1)!='a'
                    && dictWord[1].slice(-2,-1)!='e'
                    && dictWord[1].slice(-2,-1)!='i'
                    && dictWord[1].slice(-2,-1)!='o'
                    && dictWord[1].slice(-2,-1)!='u' ) ?   dictWord[1].slice(0,-1) + 'ies'  : 
                    (   (dictWord[1].slice(-1)=='s' ||
                        dictWord[1].slice(-2)=='ss' ||
                        dictWord[1].slice(-1)=='x' ||
                        dictWord[1].slice(-1)=='z' ||
                        dictWord[1].slice(-2)=='ch' ||
                        dictWord[1].slice(-2)=='sh')                   
                            ) ?  `${dictWord[1] + 'es' }` : `${dictWord[1] + temp }`;
        }
            else return `${dictWord[1]}`;
        }}
      if(mode == 'british-to-american'){ 
         if(word.trim()==dictWord[1]){
            //console.log('dictword[0]', dictWord[0])
            return `${dictWord[0] }`}
        else{
            if(word.length > dictWord[1].length){
           // let dot  = word.slice(-1)=='.' ? '.' : '';   
            let temp ='s';
            console.log('word.split(dictWord[1])', temp)
            console.log('dictWord[0] + temp[0]', dictWord[0] + temp[1])

            return ( dictWord[0].slice(-1)=="y" 
                    && dictWord[0].slice(-2,-1)!='a'
                    && dictWord[0].slice(-2,-1)!='e'
                    && dictWord[0].slice(-2,-1)!='i'
                    && dictWord[0].slice(-2,-1)!='o'
                    && dictWord[0].slice(-2,-1)!='u' ) ? dictWord[0].slice(0,-1) + 'ies' : 
                    (   (dictWord[0].slice(-1)=='s' ||
                    dictWord[0].slice(-2)=='ss' ||
                    dictWord[0].slice(-1)=='x' ||
                    dictWord[0].slice(-1)=='z' ||
                    dictWord[0].slice(-2)=='ch' ||
                    dictWord[0].slice(-2)=='sh')                 
                        ) ?  `${dictWord[0] + 'es'}` : `${dictWord[0] + temp}`;
        }
            else return `${dictWord[0] }`;
        }}
    }


    convay(mode, sentence){
        sentence = sentence ;
        console.log("sentence", sentence)
        var toConvay = [sentence, sentence];
        
        let wordNumber = sentence.split(' ').length;
        console.log(wordNumber);
        let time = sentence.match(regex);
        let words = [];
        let titles = [];
        
       // sentence = sentence.toLowerCase();
       //---------------------------------------------------------------------------------------------------------------------------------------
       //   American to British  
       //-------------------------------------------------------------------------------------------------------------------------------     
        if(mode == 'american-to-british'){       

                transData.forEach( word => {
                    if( word[0].slice(-1) == 'y'  && word[0].slice(-2,-1)!='a'
                                            && word[0].slice(-2,-1)!='e'
                                            && word[0].slice(-2,-1)!='i'
                                            && word[0].slice(-2,-1)!='o'
                                            && word[0].slice(-2,-1)!='u'
                                        ) 
                    {
                        var wordregex = new RegExp(`\\b${word[0].slice(0,-1)}y*(ies)*(\\b)`,'i'+'g');
                    }   
                    else { var wordregex = new RegExp(`\\b${word[0]}(s)*(\\b)`,'i'+'g');                
                    }
                   
                    //console.log(wordregex)
                    //console.log(sentence.match(wordregex))


                    if(sentence.match(wordregex)!=null) {
                        let temp = sentence.match(wordregex);
                        console.log('temp: ', temp) ;
                       
                        temp.forEach(item => {
                            
                        sentence = sentence.replace(wordregex, " ");
                        toConvay[1] = toConvay[1].replace(wordregex, `${highString}${this.compare(item, word, mode)}</span>`);
                        toConvay[0] = toConvay[0].replace(wordregex, `${this.compare(item, word, mode)}`);
                            //console.log('compare - item, word[]: --> ', item, word, mode)
                            //console.log('this.compare - item, word[]: --> ', this.compare(item, word, mode))
                            //console.log("toConvay:  ", toConvay);
                        words.push(this.compare(item, word, mode));
                    })
                        
                        console.log('words: ', words) 
                     }              
            });
               
                titlesData.forEach(title => {
                    let wordregex = new RegExp(`\\b${title[0]}`,'g'+'i')
                    if(sentence.match(wordregex) != null) {
                    let arr = sentence.match(wordregex);
                        console.log('arr:  ', arr);
                     
                    arr.forEach(item => {
                       sentence = sentence.replace(item , " ") ;
                       toConvay[0] = toConvay[0].replace(item , `${title[1][0].toUpperCase() + title[1].slice(1) }`) ;  
                       toConvay[1] = toConvay[1].replace(item , `${highString}${title[1][0].toUpperCase() + title[1].slice(1) }</span>`) ;  
                       titles.push(title[1][0].toUpperCase() + title[1].slice(1)) ;
                    })
                       // titles.push(sentence.match(wordregex))
                    
                }                   
                });
                        console.log('titles:  ', titles) 

            
            if(time!=null){
                time.forEach(time=>{
                toConvay[0] = toConvay[0].replace(time , `${time.replace(':', '.')}`)
                toConvay[1] = toConvay[1].replace(time , `${highString}${time.replace(':', '.')}</span>`)
                })            
            }

        }
        //--------------------------------------------------------------------------------------------------------------------------------------------
        //British to American section
        //--------------------------------------------------------------------------------------------------------------------------------------------

        if(mode=='british-to-american'){
            
                transData.forEach(word => {
                    if(word[1].slice(-1) == 'y'  && word[1].slice(-2,-1)!='a'
                                            && word[1].slice(-2,-1)!='e'
                                            && word[1].slice(-2,-1)!='i'
                                            && word[1].slice(-2,-1)!='o'
                                            && word[1].slice(-2,-1)!='u'
                                        ) 
                    {
                        var wordregex = new RegExp(`\\b${word[1].slice(0,-1)}(y)*(ies)*(\\b)`,'i'+'g');
                    }
                        else{var wordregex = new RegExp(`\\b${word[1]}(s)*(\\b)`,'i'+'g');                
                    }
                
                   // console.log(wordregex)
                    //console.log(sentence.match(wordregex))


                    if(sentence.match(wordregex)!=null) {
                        let temp = sentence.match(wordregex);
                        console.log('temp: ', temp) 
                        temp.forEach( item => {                            
                        sentence = sentence.replace(wordregex, " ");
                        toConvay[0] = toConvay[0].replace(wordregex, `${this.compare(item, word, mode)}`)
                        toConvay[1] = toConvay[1].replace(wordregex, `${highString}${this.compare(item, word, mode)}</span>`)
                            //console.log('compare - item, word[]: --> ', item, word)
                            //console.log('this.compare - item, word[]: --> ', this.compare(item, word, mode))
                            //console.log("toConvay:  ", toConvay);
                        words.push(this.compare(item, word, mode));
                    })
                        
                        console.log('words: ', words) 
                    }              
            });

                titlesData.forEach(title => {
                    let wordregex = new RegExp(`\\b${title[1]}\\b`,'g'+'i')
                    //console.log(wordregex)
                    if(sentence.match(wordregex)!=null) {
                    let arr = sentence.match(wordregex);
                                console.log('arr:  ', arr)
                     toConvay[0] = toConvay[0].replace(wordregex, `${title[0][0].toUpperCase() + title[0].slice(1)}`)        
                     toConvay[1] = toConvay[1].replace(wordregex, `${highString}${title[0][0].toUpperCase() + title[0].slice(1)}</span>`)        
                     arr.forEach(item => {
                        //console.log(item)
                    sentence = sentence.replace(wordregex, " ") ;                     
                    //toConvay = toConvay.replace(item, `<span class="highlight">${title[0][0].toUpperCase() + title[0].slice(1)}</span>`);
                        titles.push(title[0][0].toUpperCase() + title[0].slice(1))
                    }) 
                    //titles.push(sentence.match(wordregex))                    
                }                   
                });
                console.log('titles:  ', titles) ;

            
            if(time!=null){
                time.forEach(time=>{
                toConvay[0] = toConvay[0].replace(time , `${time.replace('.', ':')}`)
                toConvay[1] = toConvay[1].replace(time , `${highString}${time.replace('.', ':')}</span>`)
                })            
            }
        }
       toConvay[0] = toConvay[0][0].toUpperCase() + toConvay[0].slice(1);
       toConvay[1] = (toConvay[1][0]=='<')? toConvay[1].slice(0, highLength) + toConvay[1][highLength].toUpperCase() + toConvay[1].slice(highLength+1) : 
                                            toConvay[1][0].toUpperCase() + toConvay[1].slice(1);

                    // console.log('sentence 2 : ', toConvay)
    return toConvay;
        /* return (toConvay[0]=='<')? toConvay.slice(0, highLength)+  toConvay[highLength].toUpperCase() + toConvay.slice(highLength+1) : 
                                    toConvay[0].toUpperCase() + toConvay.slice(1); */
    }    
}

module.exports = Translator;