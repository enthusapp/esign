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
      />,
    );
  });

  it('text correctly', () => {
    expect(component.text()).toEqual('Text');
  });

  describe('background style', () => {
    it('backgroundColor correctly', () => {
      ({ style } = component.get(0).props);
      expect(style.backgroundColor).toEqual('black');
    });

    it('color correctly', () => {
      expect(style.color).toEqual('white');
    });

    it('overflow correctly', () => {
      expect(style.overflow).toEqual('hidden');
    });

    it('position correctly', () => {
      expect(style.position).toEqual('relative');
    });

    it('height correctly', () => {
      expect(style.height).toEqual('100px');
    });
  });

  let tcomp = null;

  describe('text', () => {
    it('text correctrly', () => {
      tcomp = component.find('p');
      expect(tcomp.text()).toEqual('Text');
    });

    describe('style', () => {
      it('text correctrly', () => {
        ({ style } = tcomp.get(0).props);
        expect(style.position).toEqual('absolute');
      });
      it('width correctrly', () => {
        expect(style.width).toEqual('100%');
      });
      it('height correctrly', () => {
        expect(style.height).toEqual('100%');
      });
      it('margin correctrly', () => {
        expect(style.margin).toEqual('0');
      });
      it('line-height correctrly', () => {
        expect(style.lineHeight).toEqual('100%');
      });
      it('text-align correctrly', () => {
        expect(style.textAlign).toEqual('center');
      });
      it('font-size correctrly', () => {
        expect(style.fontSize).toEqual('30px');
      });
    });
  });
});
