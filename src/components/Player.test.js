import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';

describe('Player', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(<Player />);
  });

  it('text correctly', () => {
    expect(component.text()).toEqual('Text');
  });

  describe('style', () => {
    let style = null;

    beforeEach(() => {
      component = shallow(<Player />);
      [style] = component.get(0).props;
    });

    it('backgroundColor correctly', () => {
      expect(style.backgroundColor).toEqual('black');
    });

    it('color correctly', () => {
      expect(style.color).toEqual('white');
    });
  });
});
