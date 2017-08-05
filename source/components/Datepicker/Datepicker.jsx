import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Calendar from './Calendar/Calendar';

import './Datepicker.less';

class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
        };
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

    renderCalendar() {
        if (this.state.showCalendar) {
            const { utc, value } = this.props;
            const date = value || moment();
            if (utc) {
                date.utc();
            }
            return (
                <div className='datepicker-calendar-container'>
                    <Calendar
                        date={date}
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
    value: null,
    utc: false,
};

export default Datepicker;
