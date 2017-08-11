/* eslint-disable no-console */

import React from 'react';
import Datepicker from '../components/DateTime/DateTime';

import './AppView.less';

const AppView = () => {
    const onDateChange = () => {};
    const isValidDate = current => current.valueOf() <= +new Date();
    return (
        <div className='container container_top-margin'>
            <Datepicker
                defaultValue={1483228800000}
                isValidDate={isValidDate}
                timeFormat='HH:mm:ss:SSS'
                onChange={onDateChange} />
        </div>
    );
};

export default AppView;
