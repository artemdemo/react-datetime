import React from 'react';
import PropTypes from 'prop-types';

import './Time.less';

const TIME_PART = {
    hour: 'hour',
    minute: 'minute',
    second: 'second',
};

class Time extends React.Component {
    changeUp(type) {
        const { date, onChange } = this.props;
        onChange(date.clone().add(1, type));
    }

    changeDown(type) {
        const { date, onChange } = this.props;
        onChange(date.clone().subtract(1, type));
    }

    render() {
        const { date } = this.props;
        return (
            <table className='datepicker-time'>
                <tbody>
                    <tr>
                        <td
                            className='datepicker-time-controller
                                       datepicker-time-controller_up'
                            onClick={() => this.changeUp(TIME_PART.hour)} />
                        <td />
                        <td
                            className='datepicker-time-controller
                                       datepicker-time-controller_up'
                            onClick={() => this.changeUp(TIME_PART.minute)} />
                        <td />
                        <td
                            className='datepicker-time-controller
                                       datepicker-time-controller_up'
                            onClick={() => this.changeUp(TIME_PART.second)} />
                        <td />
                    </tr>
                    <tr>
                        <td>{date.format('HH')}</td>
                        <td>:</td>
                        <td>{date.format('mm')}</td>
                        <td>:</td>
                        <td>{date.format('ss')}</td>
                    </tr>
                    <tr>
                        <td
                            className='datepicker-time-controller
                                       datepicker-time-controller_down'
                            onClick={() => this.changeDown(TIME_PART.hour)} />
                        <td />
                        <td
                            className='datepicker-time-controller
                                       datepicker-time-controller_down'
                            onClick={() => this.changeDown(TIME_PART.minute)} />
                        <td />
                        <td
                            className='datepicker-time-controller
                                       datepicker-time-controller_down'
                            onClick={() => this.changeDown(TIME_PART.second)} />
                    </tr>
                </tbody>
            </table>
        );
    }
}

Time.propTypes = {
    date: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Time;
