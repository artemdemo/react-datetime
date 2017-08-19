import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { propIsMoment } from '../propTypes';

import './TitleController.less';

class TitleController extends React.Component {
    changeForward() {
        const { onChangeForward } = this.props;
        onChangeForward();
    }

    changeBackward() {
        const { onChangeBackward } = this.props;
        onChangeBackward();
    }

    handleTitleClick() {
        const { onTitleClick } = this.props;
        onTitleClick && onTitleClick();
    }

    render() {
        const { date, width, format, onTitleClick } = this.props;
        const titleClass = classnames({
            'datetime-title-controller-title': true,
            'datetime-title-controller-title_clickable': onTitleClick,
        });
        return (
            <table
                className='datetime-title-controller'
                style={{
                    width: width || 'auto',
                }}
            >
                <thead>
                    <tr>
                        <th
                            className='datetime-title-controller-change
                                       datetime-title-controller-change_backward'
                            onClick={this.changeBackward.bind(this)}
                        />
                        <th
                            className={titleClass}
                            colSpan='5'
                            onClick={this.handleTitleClick.bind(this)}
                        >
                            {date.format(format)}
                        </th>
                        <th
                            className='datetime-title-controller-change
                                       datetime-title-controller-change_forward'
                            onClick={this.changeForward.bind(this)}
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
    onChangeForward: PropTypes.func.isRequired,
    onChangeBackward: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onTitleClick: PropTypes.func,
};

TitleController.defaultProps = {
    onTitleClick: null,
    width: 'auto',
};

export default TitleController;
