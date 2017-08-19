import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Months from '../Months';

describe('<Months />', () => {
    const date = moment(1502459094000);

    it('simple render', () => {
        const tree = renderer.create(
            <Months
                date={date}
                onDateChange={() => {}}
                test
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handle click on date', () => {
        let selectedTimestamp = 0;
        const wrapper = mount(
            <Months
                date={date}
                selectedDate={date}
                onDateChange={(date) => {
                    selectedTimestamp = date.valueOf();
                }}
                test
            />,
        );
        wrapper.find('.datetime-month').first().simulate('click');
        expect(selectedTimestamp).toEqual(1483281894000);
    });

    it('all months after august (not incl) should be disabled', () => {
        const tree = renderer.create(
            <Months
                date={date}
                selectedDate={date}
                isValidDate={_date => _date.valueOf() < 1501681494000}
                onDateChange={() => {}}
                test
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
