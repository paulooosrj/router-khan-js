import RouterProvide from "../src/Router";

describe('RouterProvide', () => {

    let Router;

    let window = {
        location: '',
        pushState: () => {}
    };

    let document = {
        body: ''
    };

    beforeEach(() => {
        Router = RouterProvide.create();
    });

    it('escapeRegExp(string)', async () => {
        const response = Router.escapeRegExp('/home');
        expect(response).toEqual('^\\/home$');
    });

    it('isRouteParam(url) true', async () => {
        const response = Router.isRouteParam('/index/{id}');
        expect(response).toEqual({ keys: [ 'id' ], newRoute: '/index/(.*?)' });
    });

    it('isRouteParam(url) false', async () => {
        const response = Router.isRouteParam('/index');
        expect(response).toEqual(false);
    });

    it('toRoute(route)', async () => {
        const response = Router.toRoute('/index');
        expect(response).toEqual('/#/index');
    });

    it('redirect(route)', async () => {
        const response = Router.redirect('/index');
        expect(response).toEqual('/#/index');
    });

    it('any(route, ...calls) no parameters', async () => {
        Router.any('/', async (data, viewRouter) => {
            viewRouter.innerHTML = templateLinks;
        })
    });

    it('any(route, ...calls) with parameters', async () => {
        Router.any('/index/{home}', async (data, viewRouter) => {
            viewRouter.innerHTML = templateLinks;
        })
    });

    it('trate(eventUrl) with parameter', async () => {
        Router.any('/index/{name}', async ({ name }, viewRouter) => {
            expect(name).toEqual('Paulo');
            return "Init !!";
        });
        const response = await Router.trate('/index/Paulo');
    });

    it('trate(eventUrl) no parameter', async () => {
        Router.any('/index', async (data, viewRouter) => {
            return "Init !!";
        });
        const response = await Router.trate('/index');
        expect(response).toEqual(undefined);
    });

    it('dispatch()', async () => {
        window.location = {
            pathname: '/index'
        };

        Router.any('/index', async (data, viewRouter) => {
            return "Init !!";
        });
        
        const response = await Router.dispatch();
        console.log(response)
    });

})