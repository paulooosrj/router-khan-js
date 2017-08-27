import * as Helpers from './Jskhan-Router-Helpers.js';

"use strict";

class Router{

	// Pega a Rota Na URL
	constructor(){
		if(location.hash == "") location.href = "#/";
		this.$uri = location.hash.substring(1);
		this.$currentUri = `${this.$uri}`.toString();
		this.routess = {};
	}

	params(){
		var url = this.$currentUri;
		var exists = Object.keys(this.routess).filter((route) => {
			return route.match(/[{}]/gi) !== null;
		});

		if(exists.length > 0){

			var validacao_1 = (exists[0].split('/')[0] === url.split('/')[0]) ? true : false,
				validacao_2 = (exists[0].split('/').length === url.split('/').length) ? true : false;

			if(validacao_1 && validacao_2){


				var prms = exists[0].split('/');
				var data = url.split('/');
				var r = {};
				delete data[0] && delete data[1] && delete prms[0] && delete prms[1];
				prms.map((v, i) => {
					if(v.match(/[{}]/gi) !== null) v = v.replace(/[{}]/gi, '');
					r[v] = data[i];
				});

				this.paramActive = {
					route: exists[0],
					data: r
				};

				return true;
				
			}else{

				return false;

			}

		}

		return false;

	}

	io(route, callback){
		this.routess[route] = callback;
	}

	Run(){
		if(this.$currentUri in this.routess){
			let Request = new Helpers.Request(this.$currentUri),
				Response = new Helpers.Response();
			this.routess[this.$currentUri]( Request, Response );
		} else if(this.params()){
			if(typeof this.paramActive == "object"){
				let Request = new Helpers.Request(this.paramActive["route"]),
					Response = new Helpers.Response();
				Request.Set('Params', this.paramActive["data"]);
				this.routess[this.paramActive["route"]]( Request, Response );
			}
		}
	}

}

export {Router};