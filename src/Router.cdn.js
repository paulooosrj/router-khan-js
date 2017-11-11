"use strict";

const Router = class {

  static create() {
    if (!Router.instance) {
      Router.instance = new this();
    }
    return Router.instance;
  }

  constructor() {
    this.routes = new Map();
  }

  any(route, call) {
    if (this.routes.has(route) === false) {
      this.routes.set(route, call);
    }
  }

  toObject(names, values) {
    var result = {};
    for (var i = 0; i < names.length; i++) result[names[i]] = values[i];
    return result;
  }

  trate(e) {
    let p_call = [],
        i = this,
        p = e;
    if (this.routes.has(e) === false) for (var key of this.routes.keys()) if (key.includes('{') && key.includes('}')) p_call.push(key);
    if (p_call.length > 0) p_call = p_call.map(c => {
      var p_test = new RegExp(c.replace(/{(.*?)}/gi, '(.*)'), "gi"),
          p1 = new RegExp(c.replace(/{(.*?)}/gi, '(.*)'), "gi"),
          p2 = new RegExp(c.replace(/{(.*?)}/gi, '(.*)'), "gi");
      if (p_test.test(p) === false) return false;
      var [, ...keys] = p1.exec(c),
          [, ...vs] = p2.exec(p);
      keys = keys.map(k => k.replace(/[{}]/gi, ''));
      return { route: c, param: i.toObject(keys, vs) };
    });
    return p_call[0];
    return false;
  }

  push_event(e) {
    window.history.pushState({
      url: e
    }, e, e);
    var param = this.trate(e);
    if (param) this.routes.get(param["route"])(param["param"]);
    if (this.routes.has(e) && !param) this.routes.get(e)();
  }

  dispatch() {

    window.onpopstate = e => {
      var url = window.location.hash !== "" ? window.location.hash.split('#').pop() : window.location.pathname;
      this.push_event(url);
    };

    let url = window.location.hash !== "" ? window.location.hash.split('#').pop() : window.location.pathname;

    this.push_event(url);
  }

};
