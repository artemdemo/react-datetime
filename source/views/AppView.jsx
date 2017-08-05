import React from 'react';
import Datepicker from '../components/Datepicker/Datepicker';

import './AppView.less';

const AppView = (props) => {
    return (
        <div className='container container_top-margin'>
            <Datepicker />
        </div>
    );
};

export default AppView;
