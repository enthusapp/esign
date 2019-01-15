import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('basic app test', () => {
  const div = document.createElement('div');

  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('renders without crashing', () => {
    ReactDOM.render(<App />, div);
    window.requestAnimationFrame(() => {
      expect(document.title).to.equal('Enthus Esign');
    });
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('component', () => {
    let component = null;
    let btIncFontSize = null;

    it('rendering', () => {
      component = shallow(<App />);
      btIncFontSize = component.find('.btIncFontSize');
    });

    it('font size button exists', () => {
      expect(btIncFontSize.exists()).toBe(true);
    });

    it('font size button event', () => {
      component.instance().increaseFontSize();
      expect(component.state().fontSize).toBe(31);

      component.instance().decreaseFontSize();
      expect(component.state().fontSize).toBe(30);
    });

    describe('font size button event limitation', () => {
      it('max', () => {
        Array(200).fill().forEach(() => {
          component.instance().increaseFontSize();
        });
        expect(component.state().fontSize).toBeLessThan(101);
      });

      it('min', () => {
        Array(200).fill().forEach(() => {
          component.instance().decreaseFontSize();
        });
        expect(component.state().fontSize).toBeGreaterThan(0);
      });
    });

    describe('button to player', () => {
      let player = null;

      it('player exists', () => {
        player = component.find('.player');
        expect(player.exists()).toBe(true);
      });

      it('fontSize', () => {
        expect(player.props().fontSize).toBe(component.state().fontSize);
      });

      it('click and fontSize', () => {
        component.instance().decreaseFontSize();
        player = component.find('.player');
        expect(player.props().fontSize).toBe(component.state().fontSize);
      });
    });
  });
});
