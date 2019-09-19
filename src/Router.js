"use strict";

export default class RouterProvide {
  static create(...args) {
    if (!RouterProvide.instance) {
      RouterProvide.instance = new this(...args);
    }
    return RouterProvide.instance;
  }

  constructor(browser = true) {
    if (browser) {
      document.body.innerHTML += '<div id="view-router"></div>';
    }
    this.routes = new Map();
    this.params = [];
  }

  escapeRegExp(string) {
    return "^" + string.replace(/\//gim, "\\/") + "$";
  }

  isRouteParam(url) {
    const isParamUrl = url => url.match(/\{(.*?)\}/gim);
    const verify = isParamUrl(url);
    if (verify && Array.isArray(verify)) {
      const replaceParam = parameter => parameter.replace(/(\{|\})/gim, "");
      const replaceKeys = (link, keys) => {
        return link.replace(new RegExp(`(${keys.join("|")})`, "gim"), "(.*?)");
      };
      const keys = verify.map(param => replaceParam(param).trim());
      const newRoute = replaceKeys(url, verify);
      return { keys, newRoute };
    }
    return false;
  }

  toRoute(route) {
    return "/#" + route;
  }

  redirect(route) {
    const location = this.toRoute(route);
    window.location = location;
    return location;
  }

  any(route, ...calls) {
    if (this.routes.has(route) === false) {
      const verifyParam = this.isRouteParam(route);
      if (verifyParam === false || verifyParam === null) {
        this.routes.set(new RegExp(this.escapeRegExp(route)), calls.reverse());
      } else if (verifyParam.hasOwnProperty("newRoute")) {
        let escaped = new RegExp(this.escapeRegExp(verifyParam.newRoute));
        this.params.push({ route: escaped, keys: verifyParam.keys });
        this.routes.set(escaped, calls.reverse());
      }
    }
  }

  async runMiddleware(middleware, chain) {
    let view = document.getElementById("view-router");
    let next = null;
    for (let i = 0; i < middleware.length; i += 1) {
      next = middleware[i].bind(null, chain, view, next);
    }
    // run the middleware chain
    next();
  }

  trate(eventUrl) {
    const routesMap = Array.from(this.routes.keys());
    const find = routesMap.find((routeMaped, key) => routeMaped.test(eventUrl));
    if (find) {
      const findCall = this.routes.get(find);
      const isParam = this.params.find(routed => routed.route === find);
      if (isParam && findCall) {
        let [, ...values] = eventUrl.match(isParam.route);
        let keysValues = {};
        isParam.keys.map((vKey, iKey) => (keysValues[vKey] = values[iKey]));
        console.log(keysValues);
        return this.runMiddleware(findCall, keysValues);
      }
      return this.runMiddleware(findCall, {});
    }
  }

  push_event(e) {
    window.history.pushState(
      {
        url: e
      },
      e,
      e
    );
    let param = this.trate(e);
  }

  dispatch() {
    window.onpopstate = e => {
      var url =
        window.location.hash !== ""
          ? window.location.hash.split("#").pop()
          : window.location.pathname;
      this.push_event(url);
    };

    let url =
      window.location.hash !== ""
        ? window.location.hash.split("#").pop()
        : window.location.pathname;

    this.push_event(url);
  }
}
