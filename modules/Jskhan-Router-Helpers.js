"use strict";

class Request{

	constructor(current){
		this.$currentUrl = current;
	}

	Url(){
		return this.$currentUrl;
	}

	Set(name, data){
		if(typeof this[name] === "undefined"){
			this[name] = (n) => { 
				return this.$currentData[name][n]; 
			};
			if(typeof this.$currentData === "undefined") this.$currentData = {};
			this.$currentData[name] = data;
		}
	}

}

class Response{

	constructor(){
		this.cacheStates = false;
	}

	Render(code){
		if(!$("[load-view-khan]")){
			if(this.cacheStates) $("body").append(this.isCache(code));
			else if(!this.cacheStates) $("body").append(code);
		}else{
			if(this.cacheStates) $("[load-view-khan]").append(this.isCache(code));
			else if(!this.cacheStates) $("[load-view-khan]").append(code);
		}
	}

	LoadView(template, data){

		if(!this.existsCache()){

			Object.keys(data).map((k) => {
				if(template.includes(`{{${k}}}`)){
					template = template.replace(new RegExp(`{{${k}}}`, 'gi'), data[k]);
				}
			});

			if(!$("[load-view-khan]")){
				if(this.cacheStates) $("body").append(this.isCache(template));
				else if(!this.cacheStates) $("body").append(this.isCache(template));
			}else{
				if(this.cacheStates) $("[load-view-khan]").append(this.isCache(template));
				else if(!this.cacheStates) $("[load-view-khan]").append(this.isCache(template));
			}

		}else{

			if(!$("[load-view-khan]")){
				if(this.cacheStates) $("body").append(this.isCache(template));
				else if(!this.cacheStates) $("body").append(this.isCache(template));
			}else{
				if(this.cacheStates) $("[load-view-khan]").append(this.isCache(template));
				else if(!this.cacheStates) $("[load-view-khan]").append(this.isCache(template));
			}

		}

	}

	existsCache(){
		if(!sessionStorage.getItem(location.href)){
			return false;
		}else{
			return true;
		}
	}

	isCache(code){
		if(!this.existsCache()){
			sessionStorage.setItem(location.href, code);
			return sessionStorage.getItem(location.href);
		}else{
			console.log("Load Cache!!");
			return sessionStorage.getItem(location.href);
		}
	}

	ActiveCache(){
		this.cacheStates = true;
	}
	
}

export {Request, Response};