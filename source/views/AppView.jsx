/* eslint-disable no-console */

import React from 'react';
import Datepicker from '../components/DateTime/DateTime';

import './AppView.less';

const AppView = () => {
    const onDateChange = () => {};
    return (
        <div className='container container_top-margin'>
            <Datepicker
                timeFormat='HH:mm:ss:SSS'
                onChange={onDateChange} />
        </div>
    );
};

export default AppView;
