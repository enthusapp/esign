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

  describe('direction and animation change', () => {
    let keyList = null;
    let direction = null;

    beforeEach(() => {
      keyList = Object.keys(component.instance().getAnimationList());
      ({ direction } = component.state());
    });

    it('direction keys', () => {
      expect(keyList.indexOf(direction)).toBeGreaterThan(-1);
    });

    it('direction change', () => {
      const value = keyList[keyList.length - 1];
      component.instance().directionChange({ target: { value } });

      ({ direction } = component.state());
      expect(keyList.indexOf(direction)).toBeGreaterThan(-1);
    });

    it('direction change', () => {
      const value = keyList[keyList.length - 1];
      const { currentAnimation } = component.state();

      component.instance().directionChange({ target: { value } });

      const { currentAnimation: newAni } = component.state();

      if (keyList.length !== 1) {
        expect(currentAnimation).not.toBe(newAni);
      } else {
        expect(currentAnimation).toBe(newAni);
      }
    });
  });

  describe('text input', () => {
    let textInput = null;
    let textState = null;

    beforeEach(() => {
      textInput = component.find('.textInput');
      ({ textState } = component.state());
    });

    it('exists', () => {
      expect(textInput.exists()).toBe(true);
      expect(textState).not.toBe(undefined);
    });

    it('onChange', () => {
      const newText = `${textState}test`;

      component.instance().textChange({ target: { value: newText } });

      const { textState: newTextState } = component.state();

      expect(textState).not.toBe(newTextState);
      expect(newTextState).toBe(newText);
    });
  });

  describe('color input', () => {
    let colorInput = null;
    let colorState = null;

    beforeEach(() => {
      colorInput = component.find('.colorInput');
      ({ colorState } = component.state());
    });

    it('exists', () => {
      expect(colorInput.exists()).toBe(true);
      expect(colorState).not.toBe(undefined);
    });

    it('onChange', () => {
      let newColor = { hex: '#000000' };

      component.instance().colorChange(newColor);
      ({ colorState } = component.state());
      expect(colorState).toBe(newColor.hex);

      newColor = { hex: '#00FF00' };
      component.instance().colorChange(newColor);

      const { colorState: newColorState } = component.state();
      expect(colorState).not.toBe(newColorState);
      expect(newColorState).toBe(newColor.hex);
    });
  });

  describe('download', () => {
    it('exists', () => {
      expect(component.find('.download').exists()).toBe(true);
    });
    it('click', () => {
      URL.createObjectURL = () => {};
      component.find('.download').simulate('click');
    });
  });

  describe('player url', () => {
    it('1', () => {
      expect(component.instance().isPlayerMode()).toBeFalsy();
      window.history.pushState({}, 'Test Title', '/test.html?player=1');
      component = shallow(<App />);
      expect(component.instance().isPlayerMode()).toBeTruthy();
    });

    it('true', () => {
      window.history.pushState({}, 'Test Title', '/test.html?player=true');
      component = shallow(<App />);
      expect(component.instance().isPlayerMode()).toBeTruthy();
    });

    it('0', () => {
      window.history.pushState({}, 'Test Title', '/test.html?player=0');
      component = shallow(<App />);
      expect(component.instance().isPlayerMode()).toBeFalsy();
    });

    it('false', () => {
      window.history.pushState({}, 'Test Title', '/test.html?player=false');
      component = shallow(<App />);
      expect(component.instance().isPlayerMode()).toBeFalsy();
    });

    it('none', () => {
      window.history.pushState({}, 'Test Title', '/test.html');
      component = shallow(<App />);
      expect(component.instance().isPlayerMode()).toBeFalsy();
    });

    it('remove input', () => {
      window.history.pushState({}, 'Test Title', '/test.html?player=1');
      component = shallow(<App />);
      expect(component.find('.colorInput').exists()).toBe(false);
      expect(component.find('.textInput').exists()).toBe(false);
      expect(component.find('.directionInput').exists()).toBe(false);
      expect(component.find('.fontSize').exists()).toBe(false);
      expect(component.find('.speed').exists()).toBe(false);
    });
  });
});
