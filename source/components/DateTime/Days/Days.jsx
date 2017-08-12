import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from './Day';
import { propIsMoment } from '../propTypes';

import './Days.less';

class Days extends React.Component {
    constructor(props) {
        super(props);
        const { selectedDate } = this.props;

        this.state = {
            selectedDate: selectedDate.clone(),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDate !== this.props.selectedDate) {
            this.setState({
                selectedDate: nextProps.selectedDate.clone(),
            });
        }
    }

    getDaysOfWeek() {
        const localeDate = this.state.selectedDate.localeData();
        const weekdaysMin = localeDate.weekdaysMin();
        const first = localeDate.firstDayOfWeek();
        const dow = [];
        let i = 0;

        weekdaysMin.forEach((day) => {
            dow[((7 + (i++)) - first) % 7] = day;
        });

        return dow;
    }

    dayClickHandler(date) {
        const { onDateChange } = this.props;
        onDateChange(date);
    }

    renderDaysOfWeek() {
        return (
            <thead>
                <tr>
                    {this.getDaysOfWeek().map((day, index) => (
                        <th key={`datetime-day-of-week-${index}`}>
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }

    renderDays() {
        const { date } = this.props;
        const prevMonth = date.clone().subtract(1, 'month');
        const currentYear = date.year();
        const currentMonth = date.month();
        const weeksRows = [];
        let daysColumns = [];

        // Go to the last week of the previous month
        prevMonth.date(prevMonth.daysInMonth()).startOf('week');
        const lastDay = prevMonth.clone().add(42, 'day');

        // resetting date will clear time data
        prevMonth.set({
            hour: date.get('hour'),
            minute: date.get('minute'),
            second: date.get('second'),
            millisecond: date.get('millisecond'),
        });

        const { isValidDate } = this.props;

        while (prevMonth.isBefore(lastDay)) {
            const pastMonth = (prevMonth.year() === currentYear && prevMonth.month() < currentMonth) ||
                               prevMonth.year() < currentYear;

            const futureMonth = (prevMonth.year() === currentYear && prevMonth.month() > currentMonth) ||
                                 prevMonth.year() > currentYear;

            daysColumns.push(
                <Day
                    date={prevMonth.clone()}
                    onClick={this.dayClickHandler.bind(this)}
                    current={prevMonth.isSame(moment(), 'day')}
                    selected={prevMonth.isSame(this.state.selectedDate)}
                    faded={pastMonth || futureMonth}
                    isValidDate={isValidDate}
                    key={`days-columns-${prevMonth.format('M_D')}`}>
                    {prevMonth.format('D')}
                </Day>,
            );

            if (daysColumns.length === 7) {
                weeksRows.push(
                    <tr key={`weeks-rows-${prevMonth.format('M_D')}`}>
                        {daysColumns}
                    </tr>,
                );
                daysColumns = [];
            }

            prevMonth.add(1, 'day');
        }

        return (
            <tbody>
                {weeksRows}
            </tbody>
        );
    }

    render() {
        return (
            <table
                className='datetime-days'>
                {this.renderDaysOfWeek()}
                {this.renderDays()}
            </table>
        );
    }
}

Days.displayName = 'Days';

Days.propTypes = {
    date: propIsMoment.isRequired,
    selectedDate: propIsMoment.isRequired,
    onDateChange: PropTypes.func.isRequired,
    isValidDate: PropTypes.func,
};

Days.defaultProps = {
    isValidDate: null,
};

export default Days;
