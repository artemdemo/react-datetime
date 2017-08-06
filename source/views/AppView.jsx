import React from 'react';
import Datepicker from '../components/Datepicker/Datepicker';

import './AppView.less';

const AppView = () => {
    return (
        <div className='container container_top-margin'>
            <Datepicker timeFormat='hh:mm:ss:SSS a' />
        </div>
    );
};

export default AppView;
