import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import Time from '../Time';

describe('<Time />', () => {
    const date = moment(1502459094000);

    it('simple render, with time format "HH:mm:ss:SSS"', () => {
        const tree = renderer.create(
            <Time
                date={date}
                onChange={() => {}}
                timeFormat='HH:mm:ss:SSS'
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('time format "HH:mm:ss"', () => {
        const tree = renderer.create(
            <Time
                date={date}
                onChange={() => {}}
                timeFormat='HH:mm:ss'
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('time format "HH:mm"', () => {
        const tree = renderer.create(
            <Time
                date={date}
                onChange={() => {}}
                timeFormat='HH:mm'
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
