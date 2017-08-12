import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { propIsMoment } from '../propTypes';

import './Month.less';

class Month extends React.Component {
    clickHandler(validDate) {
        const { date, onClick } = this.props;
        if (validDate) {
            onClick && onClick(date);
        }
    }

    render() {
        const { date, current, selected, faded, isValidDate } = this.props;
        const monthClass = classnames({
            'datetime-month': true,
        });
        const validDate = isValidDate ? isValidDate(date) : true;
        const contentClass = classnames({
            'datetime-month__content': true,
            'datetime-month__content_current': current,
            'datetime-month__content_selected': selected,
            'datetime-month__content_faded': faded,
            'datetime-month__content_disabled': !validDate,
        });
        return (
            <div
                className={monthClass}
                onClick={this.clickHandler.bind(this, validDate)}
            >
                <div className={contentClass}>
                    {date.format('MMM')}
                </div>
            </div>
        );
    }
}

Month.displayName = 'Month';

Month.propTypes = {
    date: propIsMoment.isRequired,
    onClick: PropTypes.func,
    isValidDate: PropTypes.func,
    current: PropTypes.bool,
    selected: PropTypes.bool,
    faded: PropTypes.bool,
};

Month.defaultProps = {
    onClick: null,
    isValidDate: null,
    current: false,
    selected: false,
    faded: false,
};

export default Month;
