import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Day.less';

class Day extends React.Component {
    clickHandler() {
        const { date, onClick } = this.props;
        onClick && onClick(date);
    }

    render() {
        const { date, current, faded } = this.props;
        const dayClass = classnames({
            'datepicker-day': true,
        });
        const contentClass = classnames({
            'datepicker-day__content': true,
            'datepicker-day__content_current': current,
            'datepicker-day__content_faded': faded,
        });
        return (
            <td
                className={dayClass}
                onClick={this.clickHandler.bind(this)}>
                <div className={contentClass}>
                    {date.format('D')}
                </div>
            </td>
        );
    }
}

Day.propTypes = {
    date: PropTypes.shape({}).isRequired,
    onClick: PropTypes.func,
    current: PropTypes.bool,
    faded: PropTypes.bool,
};

Day.defaultProps = {
    onClick: null,
    current: false,
    faded: false,
};

export default Day;
