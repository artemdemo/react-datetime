import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Days from '../Days';

describe('<Days />', () => {
    const date = moment(1502459094000);

    it('simple render', () => {
        const tree = renderer.create(
            <Days
                date={date}
                selectedDate={date}
                onDateChange={() => {}}
                test
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handle click on date', () => {
        let selectedTimestamp = 0;
        const wrapper = mount(
            <Days
                date={date}
                selectedDate={date}
                onDateChange={(date) => {
                    selectedTimestamp = date.valueOf();
                }}
                test
            />,
        );
        wrapper.find('.datetime-day').first().simulate('click');
        expect(selectedTimestamp).toEqual(1501422294000);
    });

    it('all dates after 1 of august (not incl) should be disabled', () => {
        const tree = renderer.create(
            <Days
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
