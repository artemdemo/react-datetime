import React from 'react';
import PropTypes from 'prop-types';
import TimeController from './TimeController';

import './Time.less';
import TimeInput from './TimeInput';

const TIME_TYPES = {
    hour: 'hour',
    minute: 'minute',
    second: 'second',
    millisecond: 'millisecond',
    meridiem: 'meridiem',
};

const TIME_PARTS = [
    {
        type: TIME_TYPES.hour,
        regex: /h{1,2}|H{1,2}|k{1,2}/,
    },
    {
        type: TIME_TYPES.minute,
        regex: /m{1,2}/,
    },
    {
        type: TIME_TYPES.second,
        regex: /s{1,2}/,
    },
    {
        type: TIME_TYPES.millisecond,
        regex: /S{1,3}/,
    },
    {
        type: TIME_TYPES.meridiem,
        regex: /[aA]/,
    },
];

class Time extends React.Component {
    changeUp(part) {
        const { date, onChange } = this.props;
        if (part.type === TIME_TYPES.meridiem) {
            if (parseInt(date.format('H'), 10) > 11) {
                onChange(date.clone().subtract(12, TIME_TYPES.hour));
            } else {
                onChange(date.clone().add(12, TIME_TYPES.hour));
            }
        } else {
            onChange(date.clone().add(1, part.type));
        }
    }

    changeDown(part) {
        const { date, onChange } = this.props;
        if (part.type === TIME_TYPES.meridiem) {
            if (parseInt(date.format('H'), 10) > 11) {
                onChange(date.clone().subtract(12, TIME_TYPES.hour));
            } else {
                onChange(date.clone().add(12, TIME_TYPES.hour));
            }
        } else {
            onChange(date.clone().subtract(1, part.type));
        }
    }

    changeMilliseconds(milliseconds) {
        const { date, onChange } = this.props;
        onChange(date.clone().set(TIME_TYPES.millisecond, milliseconds));
    }

    renderController(part, index) {
        const { timeFormat, date } = this.props;
        const match = part.regex.exec(timeFormat);
        if (match) {
            if (part.type === TIME_TYPES.millisecond) {
                return (
                    <td>
                        <div className='datetime-time-input-wrap'>
                            <TimeInput
                                value={date.format('SSS')}
                                onChange={this.changeMilliseconds.bind(this)}
                                className='datetime-time-input' />
                        </div>
                    </td>
                );
            }
            return (
                <TimeController
                    key={`datetime-time-controller-${index}`}
                    format={match[0]}
                    timePart={part}
                    onUp={this.changeUp.bind(this)}
                    onDown={this.changeDown.bind(this)}
                    date={date} />
            );
        }
        return null;
    }


    render() {
        return (
            <table className='datetime-time'>
                <tbody>
                    <tr>
                        {TIME_PARTS.map((part, index) => {
                            const result = [];
                            const controller = this.renderController(part, index);
                            if (index !== 0 && controller) {
                                result.push(
                                    <td key={`datetime-time-controller-${index}-1`}>:</td>,
                                );
                            }
                            result.push(
                                controller,
                            );
                            return result;
                        })}
                    </tr>
                </tbody>
            </table>
        );
    }
}

Time.propTypes = {
    date: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    timeFormat: PropTypes.string.isRequired,
};

export default Time;
