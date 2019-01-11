import React from 'react';
import { shallow } from 'enzyme';
import IncButton from './IncButton';

describe('IncButton', () => {
  let component = null;
  let number = 0;

  function increase() {
    number += 1;
  }

  function decrease() {
    number -= 1;
  }

  it('renders correctly', () => {
    component = shallow(
      <IncButton
        increase={increase}
        decrease={decrease}
      />,
    );
  });

  describe('component', () => {
    let btIncFontSize = null;
    let btDecFontSize = null;

    it('rendering', () => {
      btIncFontSize = component.find('.btIncFontSize');
      btDecFontSize = component.find('.btDecFontSize');
    });

    it('button exists', () => {
      expect(btIncFontSize.exists()).toBe(true);
      expect(btDecFontSize.exists()).toBe(true);
    });

    it('button event', () => {
      btIncFontSize.simulate('click');
      expect(number).toBe(1);
    });

    it('button event', () => {
      btIncFontSize.simulate('click');
      expect(number).toBe(2);
    });

    it('button event', () => {
      btDecFontSize.simulate('click');
      expect(number).toBe(1);
    });

    it('button event', () => {
      btDecFontSize.simulate('click');
      expect(number).toBe(0);
    });

    describe('button style', () => {
      let style = null;

      it('exists', () => {
        ({ style } = btDecFontSize.props());
      });

      it('exists', () => {
        let height = null;
        let width = null;
        let margin = null;
        let fontSize = null;

        ({
          height,
          width,
          margin,
          fontSize,
        } = style);

        expect(height).toBe('100px');
        expect(width).toBe('100px');
        expect(margin).toBe('10px');
        expect(fontSize).toBe('30px');
      });
    });
  });
});
