import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import { Consumer, find, map } from './utils';

class RouteView extends React.PureComponent {
  static DefaultRoute = Route;

  render() {
    return (
      <Consumer>
        {({ routes, matched, routePrefix }) => {
          const currentRoute = find(matched, v => this.props.match.path === v.match.path);

          let renderRoutes = [];
          if (currentRoute) {
            renderRoutes = currentRoute.route.children || [];
          }

          return (
            <Switch>
              {map(renderRoutes, ({ children, ...props }, i) => (
                <RouteView.DefaultRoute {...props} key={props.path || i} />
              ))}
            </Switch>
          );
        }}
      </Consumer>
    );
  }
}

export default withRouter(RouteView);
