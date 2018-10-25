import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import { Consumer, find, map } from './utils';

class RouteView extends React.PureComponent {
  static Render = props => React.createElement(Route, props);

  render() {
    const { match: { path } } = this.props;

    return (
      <Switch>
        <Consumer>
          {
            ({ routes, matched, routePrefix }) => {
              const currentRoute = find(matched, v => path === v.match.path);

              let renderRoutes = [];
              if (currentRoute) {
                renderRoutes = currentRoute.route.children || [];
              }

              return map(renderRoutes, ({ children, ...props }, i) => (
                <RouteView.Render {...props} key={props.path || i} />
              ));
            }
          }
        </Consumer>
      </Switch>
    );
  }
}

export default withRouter(RouteView);
