import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-click-outside';
import Days from '../Days/Days';
import Time from '../Time/Time';
import Separator from '../Separator/Separator';
import TitleController from '../TitleController/TitleController';
import { propIsMoment } from '../propTypes';

import './Calendar.less';
import Months from '../Months/Months';

const PAGINATION_DIRECTION = {
    forward: 'forward',
    backward: 'backward',
};

export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        const { date } = props;
        this.state = {
            daysWidth: null,
            viewDays: true,
            monthDate: date,
            selectedDate: date,
        };

        this.daysRef = null;
    }

    componentDidMount() {
        this.setState({
            daysWidth: this.daysRef.getWidth(),
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.date !== nextProps.date) {
            this.setState({
                monthDate: nextProps.date,
                selectedDate: nextProps.date,
            });
        }
    }

    setDaysRef(ref) {
        this.daysRef = ref;
    }

    handleClickOutside(e) {
        const { onClickOutside } = this.props;
        onClickOutside && onClickOutside(e);
    }

    handleDayChange(selectedDate) {
        const { onChange } = this.props;
        this.setState({
            selectedDate,
        });
        onChange && onChange(selectedDate);
    }

    handleTimeChange(newDate) {
        const { onChange } = this.props;
        onChange && onChange(newDate);
    }

    handleMonthChange(monthDate) {
        const { onChange } = this.props;
        const selectedDate = this.state.selectedDate.clone()
            .month(monthDate.month())
            .year(monthDate.year());
        this.setState({
            monthDate,
            selectedDate,
            viewDays: true,
        });
        onChange && onChange(selectedDate);
    }

    handleTitlePagination(direction) {
        const step = this.state.viewDays ? 'month' : 'year';
        if (direction === PAGINATION_DIRECTION.forward) {
            this.setState({
                monthDate: this.state.monthDate.clone().add(1, step),
            });
        } else {
            this.setState({
                monthDate: this.state.monthDate.clone().subtract(1, step),
            });
        }
    }

    handleViewChange() {
        this.setState({
            viewDays: !this.state.viewDays,
        });
    }

    renderView() {
        const { isValidDate, test } = this.props;
        let view;
        if (this.state.viewDays) {
            view = (
                <Days
                    ref={this.setDaysRef.bind(this)}
                    date={this.state.monthDate}
                    selectedDate={this.state.selectedDate}
                    isValidDate={isValidDate}
                    onDateChange={this.handleDayChange.bind(this)}
                    test={test}
                />
            );
        } else {
            view = (
                <Months
                    width={this.state.daysWidth}
                    date={this.state.monthDate}
                    isValidDate={isValidDate}
                    onDateChange={this.handleMonthChange.bind(this)}
                    test={test}
                />
            );
            this.daysRef = null;
        }
        return (
            <div className='datetime-calendar__view'>
                {view}
            </div>
        );
    }

    renderTime() {
        const { date, timeFormat } = this.props;
        if (!timeFormat) {
            return null;
        }
        return (
            <div>
                <Separator />
                <Time
                    date={date}
                    timeFormat={timeFormat}
                    onChange={this.handleTimeChange.bind(this)}
                />
            </div>
        );
    }

    render() {
        const titleFormat = this.state.viewDays ? 'MMMM, YYYY' : 'YYYY';
        return (
            <div className='datetime-calendar'>
                <TitleController
                    date={this.state.monthDate}
                    format={titleFormat}
                    width={this.state.daysWidth}
                    onTitleClick={this.handleViewChange.bind(this)}
                    onChangeForward={this.handleTitlePagination.bind(this, PAGINATION_DIRECTION.forward)}
                    onChangeBackward={this.handleTitlePagination.bind(this, PAGINATION_DIRECTION.backward)}
                />
                <Separator />
                {this.renderView()}
                {this.renderTime()}
            </div>
        );
    }
}

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
    date: propIsMoment.isRequired,
    timeFormat: PropTypes.string.isRequired,
    onClickOutside: PropTypes.func,
    onChange: PropTypes.func,
    isValidDate: PropTypes.func,
    test: PropTypes.bool,
};

Calendar.defaultProps = {
    timeFormat: null,
    onClickOutside: null,
    onChange: null,
    isValidDate: null,
    test: false,
};

export default onClickOutside(Calendar);
