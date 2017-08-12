import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import TitleController from '../TitleController';

describe('<TitleController />', () => {
    const date = moment(1502459094000);

    it('simple render', () => {
        const tree = renderer.create(
            <TitleController
                date={date}
                format='MMMM, YYYY'
                onChange={() => {}}
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('title clicked', () => {
        let titleClicked = false;
        const wrapper = mount(
            <TitleController
                date={date}
                format='MMMM, YYYY'
                onChange={() => {}}
                onTitleClick={() => titleClicked = true}
            />,
        );
        wrapper.find('.datetime-title-controller-title').first().simulate('click');
        expect(titleClicked).toBe(true);
    });

    it('backward clicked', () => {
        let dateResultMoment = null;
        const wrapper = mount(
            <TitleController
                date={date}
                format='MMMM, YYYY'
                onChange={dateResult => dateResultMoment = dateResult}
            />,
        );
        wrapper.find('.datetime-title-controller-change-month_backward').first().simulate('click');
        expect(
            date.clone().subtract(1, 'month').isSame(dateResultMoment),
        ).toBe(true);
    });

    it('forward clicked', () => {
        let dateResultMoment = null;
        const wrapper = mount(
            <TitleController
                date={date}
                format='MMMM, YYYY'
                onChange={dateResult => dateResultMoment = dateResult}
            />,
        );
        wrapper.find('.datetime-title-controller-change-month_forward').first().simulate('click');
        expect(
            date.clone().add(1, 'month').isSame(dateResultMoment),
        ).toBe(true);
    });
});
