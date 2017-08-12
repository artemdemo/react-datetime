import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Month from './Month';
import { propIsMoment } from '../propTypes';

import './Months.less';

class Months extends React.Component {
    monthClickHandler(date) {
        const { onDateChange } = this.props;
        onDateChange(
            date
                .clone()
                .month(date.month())
                .year(date.year()),
        );
    }

    renderMonths() {
        const { date, isValidDate } = this.props;
        const syntheticMoment = moment(date).month(0).date(1);
        const monthsList = [];

        for (let i = 0; i < 12; i++) {
            monthsList.push(
                <Month
                    date={syntheticMoment.clone()}
                    onClick={this.monthClickHandler.bind(this)}
                    isValidDate={isValidDate}
                    key={`datetime-months__month-${i}`}
                />,
            );
            syntheticMoment.add(1, 'month');
        }

        return monthsList;
    }

    render() {
        return (
            <div className='datetime-months'>
                {this.renderMonths()}
            </div>
        );
    }
}

Months.displayName = 'Months';

Months.propTypes = {
    date: propIsMoment.isRequired,
    selectedDate: propIsMoment.isRequired,
    onDateChange: PropTypes.func.isRequired,
    isValidDate: PropTypes.func,
};

Months.defaultProps = {
    isValidDate: null,
};

export default Months;
