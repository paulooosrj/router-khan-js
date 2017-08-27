import * as io from './Helpers.js';
import {Router as JskhanRouter} from './Jskhan-Router.js';

"use strict";

class JskhanCore{
	
  	constructor(){
      if(!io.isset('$')) throw io.utf8_decode("Jquery não foi Importado!!!");
  		this.log("JskhanCore Carregado!!");
  	}

    Router(){
      return new JskhanRouter();
    }

  	log(msg){
  		console.log(msg);
  	}

  	write(msg){
  		var e = document.createElement('h1');
		  e.textContent = msg;
  		document.body.appendChild(e);
  	}

}

export { JskhanCore };