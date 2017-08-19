import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TIME_REGEX = /^\d+$/;

class TimeInput extends React.Component {
    handleChange(e) {
        const { onChange } = this.props;
        const newValue = e.target.value;
        if (newValue === '' || TIME_REGEX.test(newValue)) {
            onChange && onChange(newValue);
        }
    }

    render() {
        const { value, className } = this.props;
        const inputClass = classnames(className);
        return (
            <input
                type='text'
                className={inputClass}
                value={value}
                onChange={this.handleChange.bind(this)}
            />
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
