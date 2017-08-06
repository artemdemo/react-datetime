import React from 'react';
import Datepicker from '../components/Datepicker/Datepicker';

import './AppView.less';

const AppView = () => {
    return (
        <div className='container container_top-margin'>
            <Datepicker timeFormat='HH:mm:ss:SSS' />
        </div>
    );
};

export default AppView;
