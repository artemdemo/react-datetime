import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import Calendar from './Calendar/Calendar';
import { propIsMoment } from './propTypes';

import './DateTime.less';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        const { defaultValue, utc } = this.props;
        const date = moment(defaultValue);
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

    handleDateChange(newDate) {
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
            const { timeFormat, isValidDate } = this.props;
            return (
                <div className='datetime-calendar-container'>
                    <Calendar
                        date={this.state.date}
                        onChange={this.handleDateChange.bind(this)}
                        timeFormat={timeFormat}
                        isValidDate={isValidDate}
                        onClickOutside={this.handleClickOutside.bind(this)}
                    />
                </div>
            );
        }
        return null;
    }

    render() {
        const { className, inputProps } = this.props;
        const datetimeClass = classnames('datetime', className);
        const inputClass = classnames('datetime-input', inputProps.className);
        return (
            <div className={datetimeClass}>
                <input
                    ref={this.setInputRef.bind(this)}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange.bind(this)}
                    onFocus={this.inputFocusHandler.bind(this)}
                    className={inputClass}
                    disabled={inputProps.disabled}
                    required={inputProps.required}
                    name={inputProps.name}
                    placeholder={inputProps.placeholder}
                />
                {this.renderCalendar()}
            </div>
        );
    }
}

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
    defaultValue: PropTypes.oneOfType([
        propIsMoment,
        PropTypes.string,
        PropTypes.number,
    ]),
    inputProps: PropTypes.shape({
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        name: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
    }),
    onChange: PropTypes.func,
    isValidDate: PropTypes.func,
    utc: PropTypes.bool,
    className: PropTypes.string,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
};

DatePicker.defaultProps = {
    defaultValue: moment(),
    inputProps: {
        disabled: false,
        required: false,
        placeholder: '',
    },
    onChange: null,
    isValidDate: null,
    utc: false,
    className: '',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
};

export default DatePicker;
