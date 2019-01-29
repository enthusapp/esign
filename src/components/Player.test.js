import React from 'react';
import { mount } from 'enzyme';
import Player from './Player';

describe('Player', () => {
  let component = null;
  let style = null;
  const targetSpeed = 2000;

  it('renders correctly', () => {
    component = mount(
      <Player
        player={false}
        text="Text"
        backgroundColor="black"
        color="white"
        height="100"
        direction="scroll-up"
        fontSize={30}
        speed={targetSpeed}
      />,
    );
  });

  it('style correctly', () => {
    ({ style } = component.find('div').props());

    expect(style.backgroundColor).toEqual('black');
    expect(style.color).toEqual('white');
    expect(style.overflow).toEqual('hidden');
    expect(style.position).toEqual('relative');
    expect(style.height).toEqual('100rem');
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
      expect(style.fontSize).toEqual('30rem');
    });
  });

  it('player mode', () => {
    component = mount(
      <Player
        player
        text="Text"
        backgroundColor="black"
        color="white"
        height="100"
        direction="scroll-up"
        fontSize={30}
        speed={targetSpeed}
      />,
    );
  });

  it('style correctly', () => {
    ({ style } = component.find('div').props());

    expect(style.backgroundColor).toEqual(undefined);
    expect(style.color).toEqual('white');
    expect(style.overflow).toEqual('hidden');
    expect(style.position).toEqual('relative');
    expect(style.height).toEqual('100rem');
  });

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
      expect(style.fontSize).toEqual('30rem');
    });
  });
});
