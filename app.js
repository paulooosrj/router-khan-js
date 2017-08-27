import {jquery as $} from './modules/jquery.js';
import {JskhanCore as Jskhan} from './modules/Jskhan-Core.js';

const Khan = new Jskhan();
const Router = Khan.Router();
const Middleware = Router.Middleware();

Khan.Set('nome', "PaulaoDev");
Khan.Set('DataAtual', new Date());

Middleware.use((next) => {
	this.nome = Khan.Get('nome');
	this.data = Khan.Get('DataAtual');
	next();
});

// Rota Default
Router.io('/', (Req, Res) => {
	Res.ActiveCache();
	Res.LoadView("<h1>Rota: <span class='code'>{{pagina}}</span></h1><br/><h1>Rota Default</h1>", { 
		pagina: Req.Url() 
	});
});

// Rota com Parametro
Router.io('/home/{page}', (Req, Res) => {
	//Res.ActiveCache();
	Res.Render(`
		<h1>Rota : <span class="code">${Req.Url()}</span></h1><br/>
		<h1>Parametro : <span class="code">${Req.Params("page")}</span></h1>
	`);
});

Router.Listen(() => {
	console.log(this.nome);
	console.log(this.data);
});