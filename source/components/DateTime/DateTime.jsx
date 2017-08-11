import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import Calendar from './Calendar/Calendar';

import './DateTime.less';

class DatePicker extends React.Component {
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
        const { onChange } = this.props;
        this.setState({
            date: newDate,
            inputValue: newDate.format(this.getFormat()),
        });
        onChange && onChange(newDate);
    }

    handleInputChange(e) {
        const inputValue = e.target.value;
        const date = moment(e.target.value, this.getFormat());
        this.setState(Object.assign(
            { inputValue },
            date.isValid() ? { date } : null,
        ));

        const { onChange } = this.props;
        onChange && onChange(date.isValid() ? date : inputValue);
    }

    renderCalendar() {
        if (this.state.showCalendar) {
            const { timeFormat } = this.props;
            return (
                <div className='datetime-calendar-container'>
                    <Calendar
                        date={this.state.date}
                        onChange={this.handleDateClick.bind(this)}
                        timeFormat={timeFormat}
                        onClickOutside={this.handleClickOutside.bind(this)} />
                </div>
            );
        }
        return null;
    }

    render() {
        const { className } = this.props;
        const datetimeClass = classnames('datetime', className);
        return (
            <div className={datetimeClass}>
                <input
                    ref={this.setInputRef.bind(this)}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange.bind(this)}
                    onFocus={this.inputFocusHandler.bind(this)}
                    className='datetime-input' />
                {this.renderCalendar()}
            </div>
        );
    }
}

DatePicker.propTypes = {
    value: PropTypes.instanceOf(moment),
    onChange: PropTypes.func,
    utc: PropTypes.bool,
    className: PropTypes.string,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
};

DatePicker.defaultProps = {
    value: moment(),
    onChange: null,
    utc: false,
    className: '',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
};

export default DatePicker;
