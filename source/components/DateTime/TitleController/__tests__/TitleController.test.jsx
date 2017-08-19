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
                onChangeForward={() => {}}
                onChangeBackward={() => {}}
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
                onChangeForward={() => {}}
                onChangeBackward={() => {}}
                onTitleClick={() => titleClicked = true}
            />,
        );
        wrapper.find('.datetime-title-controller-title').first().simulate('click');
        expect(titleClicked).toBe(true);
    });

    it('backward clicked', () => {
        let clicked = false;
        const wrapper = mount(
            <TitleController
                date={date}
                format='MMMM, YYYY'
                onChangeForward={() => {}}
                onChangeBackward={() => clicked = true}
            />,
        );
        wrapper.find('.datetime-title-controller-change_backward').first().simulate('click');
        expect(clicked).toBe(true);
    });

    it('forward clicked', () => {
        let clicked = false;
        const wrapper = mount(
            <TitleController
                date={date}
                format='MMMM, YYYY'
                onChangeForward={() => clicked = true}
                onChangeBackward={() => {}}
            />,
        );
        wrapper.find('.datetime-title-controller-change_forward').first().simulate('click');
        expect(clicked).toBe(true);
    });
});
