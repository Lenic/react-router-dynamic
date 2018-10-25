import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import { Consumer, find, map } from './utils';

let DefaultRender = props => React.createElement(Route, props);

class RouteView extends React.PureComponent {
  static setRender = render => DefaultRender = render;

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
                <DefaultRender {...props} key={props.path || i} />
              ));
            }
          }
        </Consumer>
      </Switch>
    );
  }
}

export default withRouter(RouteView);
export const getRender = () => DefaultRender;
