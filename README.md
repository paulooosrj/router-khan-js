<p align="center"><img src="https://i.imgur.com/PYCKGPF.png" alt="Ecmascript 6"/></p>

# Router Khan Version ( Ecmascript 6 )
 
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

 
 ### Init RouterKhanJS using Modules [`<script type="module">`]
 
 ```javascript
    "use strict";

    import RouterProvide from "./src/Router.js";

    (async window => {
        const Router = RouterProvide.create();

        // example simple route
        Router.any("/", async (data, viewRouter) => {
          console.log("Init !!");
          viewRouter.innerHTML = "<h1>Router init</h1>";
        });
        
        // simple route using middleware
        Router.any(
          "/home",
          async (data, viewRouter, next) => {
            data.id = Math.random() * 1000;
            next();
          },
          async ({ id }, viewRouter, next) => {
            const homePromise = () =>
              new Promise((resolve, reject) => {
                resolve("Home !! id is: " + id);
              });
            viewRouter.innerHTML = await homePromise();
            next();
          },
          () => console.log("Finish exec middleware")
        );
        
        // simple route redirect
        Router.any("/toRedirect", () => {
          Router.redirect("/redirected");
        });
        
        // simple route receive router
        Router.any("/redirected", (data, viewRouter) => {
          viewRouter.innerHTML = `<h1>Redirecionado com sucesso!!</h1>`;
        });
        
        // simple route with parameters
        Router.any("/perfil/{name}/{id}", async ({ name, id }, viewRouter) => {
          viewRouter.innerHTML = `<h1>Perfil ${name} is ID ${id}</h1>`;
        });
        
        // init router
        Router.dispatch();
 ```
  
 ### License
  The RouterKhan is licensed under the MIT license. See [License File](https://github.com/PaulaoDev/router-khan-js/blob/master/LICENSE) for more information.
  
 ### Contact
   - [Facebook](https://fb.com/PauloRodriguesYT).
   - [Whatsapp](https://bit.ly/whatsappdopaulo).
