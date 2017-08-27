import * as io from './Helpers.js';
import {Router as JskhanRouter} from './Jskhan-Router.js';

"use strict";

class JskhanCore{
	
  	constructor(){
      if(!io.isset('$')) throw io.utf8_decode("Jquery não foi Importado!!!");
  		this.log("JskhanCore Carregado!!");
      this.router = new JskhanRouter();
      this.$db = {};
  	}

    Get(n){
      return this.$db[n];
    }

    Set(n, v){
      this.$db[n] = v;
    }

    Router(){
      return this.router;
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