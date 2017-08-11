import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Day from '../Day';

describe('<Day />', () => {
    const date = moment(1502459094000);
    const DayContainer = props => (
        <table>
            <tbody>
                <tr>
                    {props.children}
                </tr>
            </tbody>
        </table>
    );

    it('simple render', () => {
        const tree = renderer.create(
            <DayContainer>
                <Day date={date} />
            </DayContainer>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('onClick', () => {
        let clicked = false;
        const wrapper = mount(
            <DayContainer>
                <Day
                    date={date}
                    onClick={() => clicked = true}
                />
            </DayContainer>,
        );
        wrapper.find('.datetime-day').first().simulate('click');
        expect(clicked).toEqual(true);
    });

    it('isValidDate', () => {
        const tree = renderer.create(
            <DayContainer>
                <Day
                    date={date}
                    isValidDate={() => false}
                />
            </DayContainer>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('current', () => {
        const tree = renderer.create(
            <DayContainer>
                <Day
                    date={date}
                    current
                />
            </DayContainer>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('selected', () => {
        const tree = renderer.create(
            <DayContainer>
                <Day
                    date={date}
                    selected
                />
            </DayContainer>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('faded', () => {
        const tree = renderer.create(
            <DayContainer>
                <Day
                    date={date}
                    faded
                />
            </DayContainer>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
