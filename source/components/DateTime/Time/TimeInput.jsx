import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TIME_REGEX = /^\d+$/;

class TimeInput extends React.Component {
    constructor(props) {
        super(props);

        const { value } = props;
        this.state = {
            value,
        };
    }

    handleChange(e) {
        const { onChange } = this.props;
        const newValue = e.target.value;
        if (newValue === '' || TIME_REGEX.test(newValue)) {
            this.setState({
                value: newValue,
            });
            onChange && onChange(newValue);
        }
    }

    render() {
        const { className } = this.props;
        const inputClass = classnames(className);
        return (
            <input
                type='text'
                className={inputClass}
                value={this.state.value}
                onChange={this.handleChange.bind(this)} />
        );
    }
}

TimeInput.displayName = 'TimeInput';

TimeInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

TimeInput.defaultProps = {
    className: '',
    value: '',
    onChange: null,
};

export default TimeInput;
