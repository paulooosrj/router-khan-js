# Router Khan Version ( Ecmascript 6 )
  
 Router install
  - **bower install router-khan-js**
 
 About Router Khan JS
  - Fast and simple.
  - Routes without needing the hash.
  - History was used api.
 
 Init Router Khan JS
 ```javascript
 
    "use strict";

    		import { Router as RouterClass } from "http://my_url/bower_components/router-khan/src/Router.js";

    		;(async (window) => {

    			const Router = RouterClass.create()

    			Router.any('/', async () => document.body.innerHTML +=  "Init !!")
    			Router.any('/perfil/{name}/{id}', async (param) => {
    				document.body.innerHTML += `
    					<h1>Perfil ${param["name"]} is ID ${param["id"]}</h1>
    				`;
    			})

    			Router.dispatch();

    		})(window);
 
 ```
