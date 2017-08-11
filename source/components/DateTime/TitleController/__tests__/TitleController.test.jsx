import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import TitleController from '../TitleController';

describe('<TitleController />', () => {
    const date = moment(1502459094000);

    it('simple render', () => {
        const tree = renderer.create(
            <TitleController
                date={date}
                onChange={() => {}}
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
