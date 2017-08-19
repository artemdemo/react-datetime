import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { propIsMoment } from '../propTypes';

import './Day.less';

class Day extends React.Component {
    clickHandler(validDate) {
        const { date, onClick } = this.props;
        if (validDate) {
            onClick && onClick(date);
        }
    }

    render() {
        const { date, current, selected, faded, isValidDate } = this.props;
        const dayClass = classnames({
            'datetime-day': true,
        });
        const validDate = isValidDate ? isValidDate(date) : true;
        const contentClass = classnames({
            'datetime-day__content': true,
            'datetime-day__content_current': current,
            'datetime-day__content_selected': selected,
            'datetime-day__content_faded': faded,
            'datetime-day__content_disabled': !validDate,
        });
        return (
            <td
                className={dayClass}
                onClick={this.clickHandler.bind(this, validDate)}
            >
                <div className={contentClass}>
                    {date.format('D')}
                </div>
            </td>
        );
    }
}

Day.displayName = 'Day';

Day.propTypes = {
    date: propIsMoment.isRequired,
    onClick: PropTypes.func,
    isValidDate: PropTypes.func,
    current: PropTypes.bool,
    selected: PropTypes.bool,
    faded: PropTypes.bool,
};

Day.defaultProps = {
    onClick: null,
    isValidDate: null,
    current: false,
    selected: false,
    faded: false,
};

export default Day;
