import React from 'react';
import { withRouter } from 'react-router';
import { HashRouter as Router, Switch } from 'react-router-dom';

import RouteView, { getRender } from './route-view';
import { Provider, matchRoutes, refreshRoutePrefix, map } from './utils';

let matchedRoutes = [],
  matchedRoutesPathName = null;

export default (routes, { routePrefix = '/', callback = null, router = Router } = {}) => {
  refreshRoutePrefix(routes, routePrefix, callback);

  const routesRender = props => {
    const pathname = props.location ? props.location.pathname : null;

    if (matchedRoutesPathName !== pathname) {
      matchedRoutesPathName = pathname;
      matchedRoutes = matchRoutes(routes, matchedRoutesPathName);
    }

    const Render = getRender();
    return (
      <Provider value={{ routes, routePrefix, matched: matchedRoutes }}>
        <Switch>
          {map(routes, ({ children, ...props }, i) => (
            <Render {...props} key={props.path || i} />
          ))}
        </Switch>
      </Provider>
    );
  };

  const DefaultRouter = router;
  return (
    <DefaultRouter>
      {React.createElement(withRouter(routesRender))}
    </DefaultRouter>
  );
};
