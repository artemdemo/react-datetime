import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import DateTime, { propIsMoment } from '../DateTime';

describe('<DateTime />', () => {
    it('simple render', () => {
        const tree = renderer.create(
            <DateTime
                defaultValue={moment(1502459094000)}
                utc />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('propIsMoment', () => {
        it('return error if value is incorrect', () => {
            expect(
                propIsMoment(
                    { value: 'some text' },
                    'value',
                    'ComponentName',
                ),
            ).toBeInstanceOf(Error);
        });

        it('should accept moment', () => {
            expect(
                propIsMoment(
                    { value: moment() },
                    'value',
                    'ComponentName',
                ),
            ).toBe(undefined);
        });
    });
});
