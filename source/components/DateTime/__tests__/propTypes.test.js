import moment from 'moment';
import { propIsMoment } from '../propTypes';

describe('propTypes', () => {
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
