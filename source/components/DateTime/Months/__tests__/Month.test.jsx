import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Month from '../Month';

describe('<Month />', () => {
    const date = moment(1502459094000);

    it('simple render', () => {
        const tree = renderer.create(
            <Month date={date} />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('onClick', () => {
        let clicked = false;
        const wrapper = mount(
            <Month
                date={date}
                onClick={() => clicked = true}
            />,
        );
        wrapper.find('.datetime-month').first().simulate('click');
        expect(clicked).toEqual(true);
    });

    it('isValidDate', () => {
        const tree = renderer.create(
            <Month
                date={date}
                isValidDate={() => false}
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('faded', () => {
        const tree = renderer.create(
            <Month
                date={date}
                faded
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
