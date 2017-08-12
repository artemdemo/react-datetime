/* eslint-disable max-len */
import moment from 'moment';

const isRequiredFactory = (propFunc) => {
    propFunc.isRequired = (props, propName, componentName) => {
        if (props[propName] === null) {
            return new Error(
                `The prop \`${propName}\` is marked as required (in \`${componentName}\`), but its value is \`null\``,
            );
        } else if (props[propName] === undefined) {
            return new Error(
                `The prop \`${propName}\` is marked as required (in \`${componentName}\`), but its value is \`undefined\``,
            );
        }
        return propFunc(props, propName, componentName);
    };
    return propFunc;
};

export const propIsMoment = isRequiredFactory((props, propName, componentName) => {
    if (!moment.isMoment(props[propName])) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`,
        );
    }
    return undefined;
});
