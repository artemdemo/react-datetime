import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Days from '../Days/Days';
import Time from '../Time/Time';
import Separator from '../Separator/Separator';

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
        const { date, isValidDate } = this.props;
        return (
            <Days
                date={date}
                isValidDate={isValidDate}
                onDateChange={this.handleDateChange.bind(this)} />
        );
    }

    render() {
        const { date, timeFormat } = this.props;
        return (
            <div className='datetime-calendar'>
                {this.renderDays()}
                <Separator />
                <Time
                    date={date}
                    timeFormat={timeFormat}
                    onChange={this.handleTimeChange.bind(this)} />
            </div>
        );
    }
}

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
    onClickOutside: PropTypes.func,
    onChange: PropTypes.func,
    isValidDate: PropTypes.func,
    date: PropTypes.shape({}).isRequired,
    timeFormat: PropTypes.string.isRequired,
};

Calendar.defaultProps = {
    onClickOutside: null,
    onChange: null,
    isValidDate: null,
    value: null,
};

export default onClickOutside(Calendar);
