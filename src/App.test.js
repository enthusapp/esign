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

  let component = null;
  let player = null;

  describe('component', () => {
    it('rendering', () => {
      component = shallow(<App />);
      player = component.find('.player');
      expect(player.exists()).toBe(true);
    });
  });

  describe('check button list', () => {
    let buttons = null;
    let button = null;

    it('get IncButtonList', () => {
      buttons = component.instance().getIncButtunList();
    });

    it('test each button', () => {
      buttons.forEach((bt) => {
        const {
          name,
          defaultVal,
          lowLimit,
          highLimit,
          reverse,
        } = bt;

        button = component.find(`.${name}`);
        expect(button.exists()).toBe(true);

        let expectVal = reverse ? defaultVal - 1 : defaultVal + 1;
        component.instance()[`${name}Inc`]();
        expect(component.state()[name]).toBe(expectVal);

        expectVal = defaultVal;
        component.instance()[`${name}Dec`]();
        expect(component.state()[name]).toBe(expectVal);

        Array(highLimit * 2).fill().forEach(() => {
          component.instance()[`${name}Inc`]();
        });
        expect(component.state()[name]).toBe(reverse ? lowLimit : highLimit);
        expect(component.state()[name]).toBeLessThan(highLimit + 1);
        expect(component.state()[name]).toBeGreaterThan(lowLimit - 1);

        Array(highLimit * 3).fill().forEach(() => {
          component.instance()[`${name}Dec`]();
        });
        expect(component.state()[name]).toBe(reverse ? highLimit : lowLimit);
        expect(component.state()[name]).toBeLessThan(highLimit + 1);
        expect(component.state()[name]).toBeGreaterThan(lowLimit - 1);

        player = component.find('.player');
        expect(player.props()[name]).toBe(component.state()[name]);
      });
    });
  });

  describe('fontSize and animation change', () => {
    it('getAnimation operation', () => {
      const playerHeight = component.instance().getDefaultPlayerHeight();

      expect(component.instance().getAnimationList(10).up[1].transform).toBe(
        `translateY(${(playerHeight - 10) / 2}rem)`,
      );
    });

    it('Inc then animation change', () => {
      const { fontSize } = component.state();
      let { currentAnimation } = component.state();
      const playerHeight = component.instance().getDefaultPlayerHeight();

      expect(currentAnimation[1].transform).toBe(
        `translateY(${(playerHeight - fontSize) / 2}rem)`,
      );

      component.instance().fontSizeInc();
      ({ currentAnimation } = component.state());
      expect(currentAnimation[1].transform).toBe(
        `translateY(${(playerHeight - fontSize - 1) / 2}rem)`,
      );
    });
  });
});
