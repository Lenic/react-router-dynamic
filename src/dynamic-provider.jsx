import { withRouter } from 'react-router';

import { Provider, matchRoutes, refreshRoutePrefix } from './utils';

let matchedRoutes = [],
  matchedRoutesPathName = null;

export default (routes, { routePrefix = '/', callback = null }) => Component => {
  refreshRoutePrefix(routes, routePrefix, callback);

  const ComponentWithRouter = withRouter(Component);

  return props => {
    if (matchedRoutesPathName !== props.location.pathname) {
      matchedRoutesPathName = props.location.pathname;
      matchedRoutes = matchRoutes(routes, matchedRoutesPathName);
    }

    return (
      <Provider value={{ routes, routePrefix, matched: matchedRoutes }}>
        <ComponentWithRouter {...props} />
      </Provider>
    );
  };
};
