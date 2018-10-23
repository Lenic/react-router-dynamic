import { Link } from 'react-router-dom';

import RouteView from '../../../';

import Breadcrumb from './breadcrumb';

class Main extends React.Component {
  logoutHandler() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <div>
          <input type="button" value="logout" onClick={this.logoutHandler.bind(this)} />
        </div>
        <div>
          <div>可点击的菜单项</div>
          <ul>
            <li>
              <Link to="/">回到首页</Link>
            </li>
            <li>
              <Link to="/roles">角色列表</Link>
            </li>
            <li>
              <Link to="/users">账户列表</Link>
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <Breadcrumb />
          <hr />
          <RouteView />
        </div>
      </div>
    );
  }
}

export default Main;
