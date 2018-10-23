import ReactDOM from 'react-dom';

import RouteView, { provider } from '../..';

import Main from './main';
import Login from './login';

ReactDOM.render(provider([Login, Main]), document.getElementById('container'));
