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
            inputValue: moment.isMoment(date) ? date.format(this.getFormat()) : '',
            date,
        };
        this.inputRef = null;
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

    setInputRef(ref) {
        this.inputRef = ref;
    }

    getFormat() {
        const { dateFormat, timeFormat } = this.props;
        return `${dateFormat} ${timeFormat}`;
    }

    inputFocusHandler() {
        this.setState({
            showCalendar: true,
        });
    }

    handleClickOutside(e) {
        if (e.target !== this.inputRef) {
            this.setState({
                showCalendar: false,
            });
        }
    }

    handleDateClick(newDate) {
        this.setState({
            date: newDate,
            inputValue: newDate.format(this.getFormat()),
        });
    }

    handleInputChange(e) {
        const date = moment(e.target.value, this.getFormat());
        this.setState(Object.assign(
            { inputValue: e.target.value },
            date.isValid() ? { date } : null,
        ));
    }

    renderCalendar() {
        if (this.state.showCalendar) {
            return (
                <div className='datepicker-calendar-container'>
                    <Calendar
                        date={this.state.date}
                        onChange={this.handleDateClick.bind(this)}
                        onClickOutside={this.handleClickOutside.bind(this)} />
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className='datepicker'>
                <input
                    ref={this.setInputRef.bind(this)}
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
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
};

Datepicker.defaultProps = {
    value: moment(),
    utc: false,
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
};

export default Datepicker;
