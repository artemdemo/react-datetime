import React from 'react';
import PropTypes from 'prop-types';

import './TitleController.less';

class TitleController extends React.Component {
    changeMonthForward() {
        const { onChange, date } = this.props;
        onChange(date.clone().add(1, 'month'));
    }

    changeMonthBackward() {
        const { onChange, date } = this.props;
        onChange(date.clone().subtract(1, 'month'));
    }

    render() {
        const { date, format } = this.props;
        return (
            <table className='datetime-title-controller'>
                <thead>
                    <tr>
                        <th
                            className='datetime-title-controller-change-month
                                       datetime-title-controller-change-month_backward'
                            onClick={this.changeMonthBackward.bind(this)}
                        />
                        <th
                            className='datetime-title-controller-current-month-year'
                            colSpan='5'
                        >
                            {date.format(format)}
                        </th>
                        <th
                            className='datetime-title-controller-change-month
                                       datetime-title-controller-change-month_forward'
                            onClick={this.changeMonthForward.bind(this)}
                        />
                    </tr>
                </thead>
            </table>
        );
    }
}

TitleController.displayName = 'TitleController';

TitleController.propTypes = {
    date: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
};

export default TitleController;
