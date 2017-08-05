import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';

import './styles/general.less';

import AppView from './views/AppView';

render(
    <AppView />,
    document.getElementById('app'),
);
