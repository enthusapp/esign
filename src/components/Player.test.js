import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';

describe('Player', () => {
  let component = null;
  let style = null;

  it('renders correctly', () => {
    component = shallow(<Player />);
  });

  it('text correctly', () => {
    expect(component.text()).toEqual('Text');
  });

  describe('style', () => {
    it('backgroundColor correctly', () => {
      ({ style } = component.get(0).props);
      expect(style.backgroundColor).toEqual('black');
    });

    it('color correctly', () => {
      expect(style.color).toEqual('white');
    });
  });
});
