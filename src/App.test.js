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
    let btDecFontSize = null;

    it('rendering', () => {
      component = shallow(<App />);
      btIncFontSize = component.find('.btIncFontSize');
      btDecFontSize = component.find('.btDecFontSize');
    });

    it('button exists', () => {
      expect(btIncFontSize.exists()).toBe(true);
      expect(btDecFontSize.exists()).toBe(true);
    });

    it('button event', () => {
      btIncFontSize.simulate('click');
      expect(component.state().number).toBe(31);
    });

    it('button event', () => {
      btIncFontSize.simulate('click');
      expect(component.state().number).toBe(32);
    });

    it('button event', () => {
      btDecFontSize.simulate('click');
      expect(component.state().number).toBe(31);
    });

    it('button event', () => {
      btDecFontSize.simulate('click');
      expect(component.state().number).toBe(30);
    });

    describe('button to player', () => {
      let player = null;

      it('player exists', () => {
        player = component.find('.player');
        expect(player.exists()).toBe(true);
      });

      it('fontSize', () => {
        expect(player.props().fontSize).toBe(30);
      });

      it('click and fontSize', () => {
        btDecFontSize.simulate('click');
        player = component.find('.player');
        expect(player.props().fontSize).toBe(29);
      });
    });
  });
});
