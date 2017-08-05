import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Days from '../Days/Days';

import './Calendar.less';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(e) {
        const { onClickOutside } = this.props;
        onClickOutside && onClickOutside(e);
    }

    renderDays() {
        const { date } = this.props;
        return (
            <Days date={date} />
        );
    }

    render() {
        return (
            <div className='datepicker-calendar'>
                {this.renderDays()}
            </div>
        );
    }
}

Calendar.propTypes = {
    onClickOutside: PropTypes.func,
    date: PropTypes.shape({}),
};

Calendar.defaultProps = {
    onClickOutside: null,
    value: null,
};

export default onClickOutside(Calendar);
