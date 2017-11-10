<p align="center"><img src="https://telerikhelper.files.wordpress.com/2015/08/es6.png" alt="Ecmascript 6"/></p>

# Router Khan Version ( Ecmascript 6 )
  
 ### Router install
  `bower install router-khan-js`
 
 ### About Router Khan JS
  - Fast and simple.
  - Routes without needing the hash.
  - History was used api.
  
 ### Documentation
  - Complete system documentation is available online at [this link](https://paulaodev.github.io/RouterKhanJs/documentation).
  
 ### Contribution
  - Send error reports, suggestions, and upload requests to the [GitHub issue tracker](https://github.com/PaulaoDev/router-khan-js/issues).
  - Read the [File](https://github.com/PaulaoDev/router-khan-js/blob/master/CONTRIBUTING.md).
  
 ### System Requirements
  - Ecmascript >= 6
 
 ### Init Router Khan JS [`<script type="module">`]
 
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
  
 ### License
  The RouterKhan is licensed under the MIT license. See [License File](https://github.com/PaulaoDev/router-khan-js/blob/master/LICENSE) for more information.
  
 ### Contact
   - [Facebook](https://fb.com/PauloRodriguesYT).
   - [Whatsapp](https://bit.ly/whatsappdopaulo).
