import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import { Calendar } from '../Calendar';

describe('<Calendar />', () => {
    const date = moment(1502459094000);

    it('simple render', () => {
        const tree = renderer.create(
            <Calendar
                date={date}
                timeFormat='HH:mm:ss:SSS'
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
