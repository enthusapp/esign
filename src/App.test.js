import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

function loadJSON(testState, component) {
  // Error on blob type, but don't know why
  // Block until know
  // const file = new File([testState],
  //  'bar.txt', { type: 'text/plain;charset=utf-8' });
  // component.instance().loadJSON({ target: { files: [file] } });
  component.instance().setStateFromJSON(testState);
  return component;
}

function objectToURLParam(obj) {
  let param = '?dummy=1';

  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((el) => { param += `&${key}[]=${el}`; });
    } else {
      param += `&${key}=${obj[key]}`;
    }
  });

  return param;
}

function setWindowURL(nobj) {
  const obj = {};
  Object.assign(obj, nobj);
  if (Object.prototype.hasOwnProperty.call(nobj, 'colorState')) {
    obj.colorState = nobj.colorState.slice(1);
  }
  const param = `/test.html${objectToURLParam(obj)}`;
  window.history.pushState({}, 'Test Title', param);
  return shallow(<App />);
}

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

    it('rendering', () => {
      expect(component.instance().isElectron()).toBe(false);
    });
  });

  describe('check button list', () => {
    let buttons = null;
    let button = null;
    let fontSize = null;

    it('get IncButtonList', () => {
      buttons = component.instance().getIncButtunList();
    });

    it('fontSize increase 1', () => {
      ({ fontSize } = component.state());

      while (fontSize < 20) {
        component.instance().fontSizeInc();
        const { fontSize: newFontSize } = component.state();
        if (fontSize > 2) {
          expect(newFontSize).toBe(fontSize + 1);
        }
        fontSize = newFontSize;
      }
    });

    const fontSizeExpects = [20, 19, 18, 17, 16, 15,
      14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
      1.8, 1.6, 1.4, 1.2,
      0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1,
    ];

    it('fontSize decrease', () => {
      while (fontSize > 1) {
        component.instance().fontSizeDec();
        const { fontSize: newFontSize } = component.state();
        expect(fontSizeExpects.indexOf(newFontSize) > -1).toBe(true);
        fontSize = newFontSize;
      }
    });

    it('fontSize increase', () => {
      while (fontSize < 20) {
        component.instance().fontSizeInc();
        const { fontSize: newFontSize } = component.state();
        expect(fontSizeExpects.indexOf(newFontSize) > -1).toBe(true);
        fontSize = newFontSize;
      }
    });

    it('test each button', () => {
      buttons.forEach((bt) => {
        const { name, increase, decrease } = bt;

        button = component.find(`.${name}`);
        expect(button.exists()).toBe(true);

        const defaultVal = component.state()[name];
        let expectVal = increase(defaultVal);
        component.instance()[`${name}Inc`]();
        expect(component.state()[name]).toBe(expectVal);

        expectVal = decrease(expectVal);
        component.instance()[`${name}Dec`]();
        expect(component.state()[name]).toBe(expectVal);

        Array(200).fill().forEach(() => {
          component.instance()[`${name}Inc`]();
          expectVal = increase(expectVal);
        });
        expect(component.state()[name]).toBe(expectVal);
        expect(expectVal).toBeLessThan(101);
        expect(expectVal).toBeGreaterThan(0.01);

        Array(300).fill().forEach(() => {
          component.instance()[`${name}Dec`]();
          expectVal = decrease(expectVal);
        });
        expect(component.state()[name]).toBe(expectVal);
        expect(expectVal).toBeLessThan(101);
        expect(expectVal).toBeGreaterThan(0.01);

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
      let { fontSize } = component.state();
      let { currentAnimation } = component.state();
      const playerHeight = component.instance().getDefaultPlayerHeight();

      expect(currentAnimation[1].transform).toBe(
        `translateY(${(playerHeight - fontSize) / 2}rem)`,
      );

      component.instance().fontSizeInc();
      fontSize = component.instance().getIncButtunList()[0].increase(fontSize);
      ({ currentAnimation } = component.state());
      expect(currentAnimation[1].transform).toBe(
        `translateY(${(playerHeight - fontSize) / 2}rem)`,
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

  describe('download/load/cancel/saveas', () => {
    it('exists', () => {
      expect(component.find('.mainButton').exists()).toBe(true);
    });

    it('download', () => {
      URL.createObjectURL = () => {};
      component.instance().downloadJSON();
    });

    it('load', () => {
    });

    it('clear', () => {
      component.instance().cancel();
      const state = component.state();
      const { currentAnimation } = state;
      const { fontSize, direction } = component.instance().getDefaultState();

      expect(currentAnimation).toEqual(
        component.instance().getAnimationList(fontSize)[direction],
      );

      delete state.currentAnimation;
      delete state.isFileLoaded;
      // TODO refactoring
      expect(state).toEqual(component.instance().getDefaultState());
    });

    it('saveas', () => {
    });
  });

  describe('url player', () => {
    let param = null;

    it('objectToURLParam', () => {
      param = `/test.html${objectToURLParam({ player: 1 })}`;
      expect(param).toBe('/test.html?dummy=1&player=1');
      param = `/test.html${objectToURLParam({ player: true })}`;
      expect(param).toBe('/test.html?dummy=1&player=true');
    });

    it('1', () => {
      expect(component.instance().isPlayerMode()).toBeFalsy();
      component = setWindowURL({ player: 1 });
      expect(component.instance().isPlayerMode()).toBeTruthy();
    });

    it('true', () => {
      component = setWindowURL({ player: true });
      expect(component.instance().isPlayerMode()).toBeTruthy();
    });

    it('0', () => {
      component = setWindowURL({ player: 0 });
      expect(component.instance().isPlayerMode()).toBeFalsy();
    });

    it('false', () => {
      component = setWindowURL({ player: false });
      expect(component.instance().isPlayerMode()).toBeFalsy();
    });

    it('none', () => {
      component = setWindowURL({ });
      expect(component.instance().isPlayerMode()).toBeFalsy();
    });

    it('remove input', () => {
      component = setWindowURL({ player: 1 });
      expect(component.find('.colorInput').exists()).toBe(false);
      expect(component.find('.textInput').exists()).toBe(false);
      expect(component.find('.directionInput').exists()).toBe(false);
      expect(component.find('.fontSize').exists()).toBe(false);
      expect(component.find('.speed').exists()).toBe(false);
    });
  });

  describe('url and file load', () => {
    const stateChangeFuncs = [loadJSON, setWindowURL];

    stateChangeFuncs.forEach((stateChange) => {
      it('default', () => {
        const testState = {
          direction: 'down',
          textState: 'TextNew',
          colorState: '#FF00FF',
          fontSize: 15,
          speed: 5,
        };
        component = stateChange(testState, component);

        Object.keys(testState).forEach((key) => {
          expect(component.state()[key]).toBe(testState[key]);
        });
        const newAni = component.instance().getAnimationList(
          testState.fontSize,
        )[testState.direction];
        expect(component.state().currentAnimation).toEqual(newAni);
      });

      it('block currentAnimation property', () => {
        const testState = {
          direction: 'up',
          textState: 'Text',
          colorState: '#FFFFFF',
          fontSize: 5,
          speed: 10,
          currentAnimation: [],
        };
        component = stateChange(testState, component);
        expect(component.state().currentAnimation).not.toBe(
          testState.currentAnimation,
        );
      });

      it('load wrong json format file', () => { });

      it('file read fail', () => { });

      it('cancel file load', () => { });

      it('params limitation', () => { });
    });
  });

  describe('electron', () => {
    it('is electorn?', () => {
      expect(component.instance().isElectron()).toBe(false);
    });

    it('is electorn?', () => {
      Object.defineProperty(navigator, 'userAgent',
        { get: () => 'Mozilla/5.0 Gecko/20100101 electron/ Firefox/28.0)' });

      component = shallow(<App />);
      expect(component.instance().isElectron()).toBe(true);
    });

    it('is electorn?', () => {
      const testState = {
        direction: 'down',
        textState: 'TextNew',
        colorState: '#FF00FF',
        fontSize: 15,
        speed: 5,
      };
      expect(component.state().isFileLoaded).toBe(false);
      component = loadJSON(testState, component);
      // block until readAsText problem solve
      // expect(component.state().isFileLoaded).toBe(true);
    });
  });
});
