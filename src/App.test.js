import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

function loadJSON(testState, component) {
  // Error on blob type, but don't know why
  // Block until know
  // const file = new File([testState], 'bar.txt');
  // component.find('.load').simulate('click',
  //   { target: { files: [file] } });
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
          lowLimit,
          highLimit,
          reverse,
        } = bt;

        button = component.find(`.${name}`);
        expect(button.exists()).toBe(true);

        const defaultVal = component.state()[name];
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

  describe('download/load', () => {
    it('exists', () => {
      expect(component.find('.download').exists()).toBe(true);
      expect(component.find('.load').exists()).toBe(true);
    });

    it('click', () => {
      URL.createObjectURL = () => {};
      component.find('.download').simulate('click');
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
});
