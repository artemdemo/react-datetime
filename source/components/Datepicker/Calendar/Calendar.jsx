import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Days from '../Days/Days';
import Time from '../Time/Time';

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

    handleDateChange(newDate) {
        const { onChange } = this.props;
        onChange && onChange(newDate);
    }

    handleTimeChange(newDate) {
        const { onChange } = this.props;
        onChange && onChange(newDate);
    }

    renderDays() {
        const { date } = this.props;
        return (
            <Days date={date} onDateChange={this.handleDateChange.bind(this)} />
        );
    }

    render() {
        const { date } = this.props;
        return (
            <div className='datepicker-calendar'>
                {this.renderDays()}
                <Time date={date} onChange={this.handleTimeChange.bind(this)} />
            </div>
        );
    }
}

Calendar.propTypes = {
    onClickOutside: PropTypes.func,
    onChange: PropTypes.func,
    date: PropTypes.shape({}),
};

Calendar.defaultProps = {
    onClickOutside: null,
    onChange: null,
    value: null,
};

export default onClickOutside(Calendar);
