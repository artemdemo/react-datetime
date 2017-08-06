import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Calendar from './Calendar/Calendar';

import './Datepicker.less';

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

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
            inputValue: moment.isMoment(date) ? date.format(DEFAULT_FORMAT) : '',
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

    handleDateClick(newDate) {
        this.setState({
            date: newDate,
            inputValue: newDate.format(DEFAULT_FORMAT),
        });
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value,
        });
    }

    renderCalendar() {
        if (this.state.showCalendar) {
            return (
                <div className='datepicker-calendar-container'>
                    <Calendar
                        date={this.state.date}
                        onChange={this.handleDateClick.bind(this)}
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
                    value={this.state.inputValue}
                    onChange={this.handleInputChange.bind(this)}
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
