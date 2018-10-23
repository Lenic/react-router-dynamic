import Main from './main';
import Roles from './roles';
import Users from './users';

export default {
  path: '',
  name: '系统主页',
  component: Main,
  children: [Roles, Users],
}
