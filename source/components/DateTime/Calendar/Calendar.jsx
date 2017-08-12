import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Days from '../Days/Days';
import Time from '../Time/Time';
import Separator from '../Separator/Separator';
import TitleController from '../TitleController/TitleController';

import './Calendar.less';

export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        const { date } = props;
        this.state = {
            monthDate: date,
            selectedDate: date,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.date !== nextProps.date) {
            this.setState({
                monthDate: nextProps.date,
            });
        }
    }

    handleClickOutside(e) {
        const { onClickOutside } = this.props;
        onClickOutside && onClickOutside(e);
    }

    handleDateChange(selectedDate) {
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
        this.setState({
            monthDate,
        });
    }

    renderDays() {
        const { isValidDate } = this.props;
        return (
            <Days
                date={this.state.monthDate}
                selectedDate={this.state.selectedDate}
                isValidDate={isValidDate}
                onDateChange={this.handleDateChange.bind(this)} />
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
                    onChange={this.handleTimeChange.bind(this)} />
            </div>
        );
    }

    render() {
        return (
            <div className='datetime-calendar'>
                <TitleController
                    date={this.state.monthDate}
                    format='MMMM, YYYY'
                    onChange={this.handleMonthChange.bind(this)} />
                <Separator />
                {this.renderDays()}
                {this.renderTime()}
            </div>
        );
    }
}

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
    date: PropTypes.shape({}).isRequired,
    timeFormat: PropTypes.string.isRequired,
    onClickOutside: PropTypes.func,
    onChange: PropTypes.func,
    isValidDate: PropTypes.func,
};

Calendar.defaultProps = {
    timeFormat: null,
    onClickOutside: null,
    onChange: null,
    isValidDate: null,
};

export default onClickOutside(Calendar);
