import React from 'react';
import PropTypes from 'prop-types';
import TimeController from './TimeController';

import './Time.less';

const TIME_TYPES = {
    hour: 'hour',
    minute: 'minute',
    second: 'second',
    millisecond: 'millisecond',
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
];

class Time extends React.Component {
    changeUp(part) {
        const { date, onChange } = this.props;
        onChange(date.clone().add(1, part.type));
    }

    changeDown(part) {
        const { date, onChange } = this.props;
        onChange(date.clone().subtract(1, part.type));
    }

    renderController(part, index) {
        const { timeFormat, date } = this.props;
        const match = part.regex.exec(timeFormat);
        if (match) {
            return (
                <TimeController
                    key={`datepicker-time-controller-${index}`}
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
            <table className='datepicker-time'>
                <tbody>
                    <tr>
                        {TIME_PARTS.map((part, index) => {
                            const result = [];
                            const controller = this.renderController(part, index);
                            if (index !== 0 && controller) {
                                result.push(
                                    <td key={`datepicker-time-controller-${index}-1`}>:</td>,
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
