import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';

describe('Player', () => {
  let component = null;
  let style = null;

  it('renders correctly', () => {
    component = shallow(
      <Player
        text="Text"
        backgroundColor="black"
        color="white"
        height="100px"
        direction="scroll-up"
        fontSize={30}
      />,
    );
  });

  it('backgroundColor style correctly', () => {
    ({ style } = component.get(0).props);

    expect(style.backgroundColor).toEqual('black');
    expect(style.color).toEqual('white');
    expect(style.overflow).toEqual('hidden');
    expect(style.position).toEqual('relative');
    expect(style.height).toEqual('100px');
  });

  let tcomp = null;

  describe('text', () => {
    it('text correctrly', () => {
      tcomp = component.find('p');
      expect(tcomp.text()).toEqual('Text');
    });

    it('text style correctrly', () => {
      ({ style } = tcomp.get(0).props);

      expect(style.position).toEqual('absolute');
      expect(style.width).toEqual('100%');
      expect(style.height).toEqual('100%');
      expect(style.margin).toEqual('0');
      expect(style.lineHeight).toEqual('100%');
      expect(style.textAlign).toEqual('center');
      expect(style.fontSize).toEqual('30px');
      expect(style.animation).toEqual('scroll-up 10s linear infinite');
    });
  });
});
