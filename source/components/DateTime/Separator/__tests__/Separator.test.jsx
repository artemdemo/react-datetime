import React from 'react';
import renderer from 'react-test-renderer';
import Separator from '../Separator';

describe('<Separator />', () => {
    it('simple render', () => {
        const tree = renderer.create(
            <Separator />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
