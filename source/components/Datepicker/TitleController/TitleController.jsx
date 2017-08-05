import React from 'react';
import PropTypes from 'prop-types';

import './TitleController.less';

class TitleController extends React.Component {
    changeMonthForward() {
        const { onChangeMonth, date } = this.props;
        onChangeMonth && onChangeMonth(date.clone().add(1, 'month'));
    }

    changeMonthBackward() {
        const { onChangeMonth, date } = this.props;
        onChangeMonth && onChangeMonth(date.clone().subtract(1, 'month'));
    }

    render() {
        const { date } = this.props;
        return (
            <table className='datepicker-title-controller'>
                <thead>
                    <tr>
                        <th
                            className='datepicker-title-controller-change-month
                                       datepicker-title-controller-change-month_backward'
                            onClick={this.changeMonthBackward.bind(this)} />
                        <th
                            className='datepicker-title-controller-current-month-year'
                            colSpan='5'>
                            {date.format('MMMM, YYYY')}
                        </th>
                        <th
                            className='datepicker-title-controller-change-month
                                       datepicker-title-controller-change-month_forward'
                            onClick={this.changeMonthForward.bind(this)} />
                    </tr>
                </thead>
            </table>
        );
    }
}

TitleController.propTypes = {
    date: PropTypes.shape({}).isRequired,
    onChangeMonth: PropTypes.func,
};

TitleController.defaultProps = {
    onChangeMonth: null,
};

export default TitleController;
