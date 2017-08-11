import React from 'react';
import PropTypes from 'prop-types';

import './TimeController.less';

class TimeController extends React.Component {
    handleUp() {
        const { onUp, timePart } = this.props;
        onUp(timePart);
    }

    handleDown() {
        const { onDown, timePart } = this.props;
        onDown(timePart);
    }

    render() {
        const { date, format } = this.props;
        return (
            <td>
                <div
                    className='datetime-time-controller
                               datetime-time-controller_up'
                    onClick={this.handleUp.bind(this)} />
                <div>{date.format(format)}</div>
                <div
                    className='datetime-time-controller
                               datetime-time-controller_down'
                    onClick={this.handleDown.bind(this)} />
            </td>
        );
    }
}

TimeController.propTypes = {
    date: PropTypes.shape({}).isRequired,
    format: PropTypes.string.isRequired,
    timePart: PropTypes.shape({}).isRequired,
    onUp: PropTypes.func.isRequired,
    onDown: PropTypes.func.isRequired,
};

export default TimeController;
