import React from 'react';
import PropTypes from 'prop-types';
import TimeController from './TimeController';

import './Time.less';
import TimeInput from './TimeInput';

const CHANGE_DIRECTION = {
    up: 'up',
    down: 'down',
};

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
        this.changeTime(part, CHANGE_DIRECTION.up);
    }

    changeDown(part) {
        this.changeTime(part, CHANGE_DIRECTION.down);
    }

    changeTime(part, direction) {
        const { date, onChange } = this.props;
        const dateProps = {
            date: date.date(),
            month: date.month(),
            year: date.year(),
        };
        const newDate = date.clone();
        const changeAction = direction === CHANGE_DIRECTION.up ? 'add' : 'subtract';
        if (part.type === TIME_TYPES.meridiem) {
            newDate[changeAction](12, TIME_TYPES.hour);
        } else {
            newDate[changeAction](1, part.type);
        }
        onChange(newDate.date(dateProps.date).month(dateProps.month).year(dateProps.year));
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
                                className='datetime-time-input'
                            />
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
                    date={date}
                />
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

Time.displayName = 'Time';

Time.propTypes = {
    date: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    timeFormat: PropTypes.string.isRequired,
};

export default Time;
