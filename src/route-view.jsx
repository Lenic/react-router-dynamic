import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Consumer, find,map } from './utils';

class RouteView extends React.Component {
  static DefaultRoute = Route;

  render() {
    return (
      <Consumer>
        {({ routes, matched, routePrefix }) => {
          const currentRoute = find(matched, v => this.props.match.path === v.match.path);

          let renderRoutes = [];
          if (currentRoute) {
            renderRoutes = currentRoute.route.children;
          } else if (this.props.match.path === routePrefix) {
            renderRoutes = routes;
          }

          return (
            <Switch>
              {map(renderRoutes, (v, i) => (
                <RouteView.DefaultRoute {...v} key={v.path || i} />
              ))}
            </Switch>
          );
        }}
      </Consumer>
    );
  }
}

export default withRouter(RouteView);
