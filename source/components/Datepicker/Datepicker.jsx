import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Calendar from './Calendar/Calendar';

import './Datepicker.less';

class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        const { value, utc } = this.props;
        const date = value;
        if (utc) {
            date.utc();
        }
        this.state = {
            showCalendar: false,
            date,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            const date = nextProps.value;
            if (nextProps.utc) {
                date.utc();
            }
            this.setState({
                date,
            });
        }
    }

    inputFocusHandler() {
        this.setState({
            showCalendar: true,
        });
    }

    hideCalendar() {
        this.setState({
            showCalendar: false,
        });
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate,
        });
    }

    renderCalendar() {
        if (this.state.showCalendar) {
            return (
                <div className='datepicker-calendar-container'>
                    <Calendar
                        date={this.state.date}
                        onChange={this.handleDateChange.bind(this)}
                        onClickOutside={this.hideCalendar.bind(this)} />
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className='datepicker'>
                <input
                    value={this.state.date.format('YYYY-MM-DD HH:mm:ss')}
                    onFocus={this.inputFocusHandler.bind(this)}
                    className='datepicker-input' />
                {this.renderCalendar()}
            </div>
        );
    }
}

Datepicker.propTypes = {
    value: PropTypes.instanceOf(moment),
    utc: PropTypes.bool,
};

Datepicker.defaultProps = {
    value: moment(),
    utc: false,
};

export default Datepicker;
