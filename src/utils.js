import { matchPath, Router } from 'react-router';

const { computeMatch } = Router.prototype;

const context = React.createContext();

export const Provider = context.Provider;

export const Consumer = context.Consumer;

export const find = function find(list, fn) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    if (!!fn(item)) {
      return item;
    }
  }
};

export const some = (list, fn) => !!find(list, fn);

export const map = function map(list, fn) {
  const result = [];

  for (let i = 0; i < list.length; i++) {
    result.push(fn(list[i], i));
  }

  return result;
};

export const each = function each(list, fn) {
  for (let i = 0; i < list.length; i++) {
    fn(list[i]);
  }
};

export const isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};

export function matchRoutes(routes, pathname, /*not public API*/ branch = []) {
  some(routes, route => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
        ? branch[branch.length - 1].match // use parent match
        : computeMatch(pathname); // use default "root" match

    if (match) {
      branch.push({ route, match });

      if (route.children) {
        matchRoutes(route.children, pathname, branch);
      }
    }

    return match;
  });

  return branch;
}

export function refreshRoutePrefix(routes, routePrefix, callback) {
  each(routes, v => {
    if (v.path === undefined || v.path === null) {
      refreshRoutePrefix(v.children || [], routePrefix, callback);
    } else {
      if (v.path.indexOf(routePrefix) !== 0) {
        v.path = `${routePrefix === '/' ? routePrefix : `${routePrefix}/`}${v.path}`;

        isFunction(callback) && callback(v, routePrefix);

        refreshRoutePrefix(v.children || [], v.path, callback);
      }
    }
  });
}
