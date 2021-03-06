import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import DateTime from '../DateTime';

describe('<DateTime />', () => {
    it('simple render', () => {
        const tree = renderer.create(
            <DateTime
                defaultValue={moment(1502459094000)}
                utc
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('inputProps', () => {
        const tree = renderer.create(
            <DateTime
                defaultValue={moment(1502459094000)}
                inputProps={{
                    disabled: true,
                    required: true,
                    name: 'Some name',
                    className: 'some-class',
                    placeholder: 'Some placeholder',
                }}
                utc
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
