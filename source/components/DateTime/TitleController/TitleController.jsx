import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { propIsMoment } from '../propTypes';

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

    handleTitleClick() {
        const { onTitleClick } = this.props;
        onTitleClick && onTitleClick();
    }

    render() {
        const { date, format, onTitleClick } = this.props;
        const titleClass = classnames({
            'datetime-title-controller-title': true,
            'datetime-title-controller-title_clickable': onTitleClick,
        });
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
                            className={titleClass}
                            colSpan='5'
                            onClick={this.handleTitleClick.bind(this)}
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
    date: propIsMoment.isRequired,
    onChange: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
    onTitleClick: PropTypes.func,
};

TitleController.defaultProps = {
    onTitleClick: null,
};

export default TitleController;
