import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import Tool from './tool';

function makeNormalDownloadData(component) {
  return component.instance().makeDownloadFormat(component.state());
}

function load(testState, component, fileName = 'foo.esign') {
  // Use fileReaderOnLoad because error on FileReader of JSDOM
  const reader = { result: JSON.stringify(testState) };
  const file = { name: fileName };

  component.instance().fileReaderOnLoad(reader, file);
  return component;
}

function downloadTest(component, callback) {
  const inst = component.instance();
  URL.createObjectURL = () => { };
  inst.download = callback;
}

function objectToURLParam(obj) {
  let param = '?dummy=1';

  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((el) => { param += `&${key}=${el}`; });
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
        if (name === 'speed') {
          expect(player.props()[name]).toBe(
            component.state()[name] * component.state().direction.length,
          );
        } else {
          expect(player.props()[name]).toBe(component.state()[name]);
        }
      });
    });
  });

  describe('fontSize and animation change', () => {
    it('getAnimation operation', () => {
      const playerHeight = component.instance().getPlayerHeight();
      const up = component.instance().getAnimationList(10).up[1];

      expect(`translate(${up[0]}%, ${up[1]}rem)`).toBe(
        `translate(0%, ${(playerHeight - 10) / 2}rem)`,
      );
    });

    it('Inc then animation change', () => {
      let { fontSize } = component.state();
      let { currentAnimation } = component.state();
      const playerHeight = component.instance().getPlayerHeight();

      expect(currentAnimation[1].transform).toBe(
        `translate(0%, ${(playerHeight - fontSize) / 2}rem)`,
      );

      component.instance().fontSizeInc();
      fontSize = component.instance().getIncButtunList()[0].increase(fontSize);
      ({ currentAnimation } = component.state());
      expect(currentAnimation[1].transform).toBe(
        `translate(0%, ${(playerHeight - fontSize) / 2}rem)`,
      );
    });
  });

  describe('getAnimation', () => {
    let keyList = null;
    let animation = null;

    beforeEach(() => {
      keyList = Object.keys(component.instance().getAnimationList());
      animation = component.instance().getAnimation();
    });

    it('direction format', () => {
      const offset = Tool.ceil10(1 / (animation.length - 1), -4);
      let sum = 0;

      animation.forEach((ani) => {
        expect(Object.prototype.hasOwnProperty.call(ani, 'transform')).toBe(true);
        expect(ani.offset).toBe(sum);
        sum = Tool.ceil10(sum + offset, -4);
        if (sum > 1) sum = 1;
      });

      expect(animation[0].offset).toBe(0);
      expect(animation[animation.length - 1].offset).toBe(1);
    });

    describe('direction all true', () => {
      beforeEach(() => {
        keyList.forEach((key) => {
          component.instance().directionChange({
            target: { value: key, checked: true },
          });
        });
      });

      it('length', () => {
        const { currentAnimation } = component.state();
        expect(currentAnimation.length).toBeGreaterThanOrEqual(
          keyList.length * component.instance().getAnimationList().up.length,
        );
      });

      it('remove cross', () => {
        const inst = component.instance();
        const anima = inst.removeCrossAnimation(
          inst.sumAnimations(component.state()),
        );
        let preAni = anima[0];
        anima.forEach((ani) => {
          expect(ani[0] !== preAni[0] && ani[1] !== preAni[1]).toBe(false);
          preAni = ani;
        });
      });
    });

    it('direction all false', () => {
      keyList.forEach((key) => {
        component.instance().directionChange({
          target: { value: key, checked: false },
        });
      });

      const { currentAnimation: newAni } = component.state();
      expect(newAni.length).toBe(
        component.instance().getAnimationList().up.length,
      );
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

  describe('player sticky', () => {
    it('sticky style', () => {
      const { position, top, zIndex } = component
        .find('.PlayerWrap').props().style;
      expect(position).toBe('sticky');
      expect(top).toBe(0);
      const { zIndex: inputZIndex } = component
        .find('.InputWrap').props().style;
      expect(zIndex).toBeGreaterThan(inputZIndex);
    });
  });

  describe('main menu on web', () => {
    it('exists', () => {
      expect(component.find('.mainButton').exists()).toBe(true);
    });

    it('download', () => {
      downloadTest(component, (rdata) => {
        expect(makeNormalDownloadData(component)).toEqual(rdata);
      });

      component.instance().save();
    });

    it('makeDownloadFormat', () => {
      const testState = {
        foo: 'bar',
        ...component.instance().getDefaultState(),
      };
      expect(component.instance().makeDownloadFormat(testState)).toEqual(
        { mfp_type: 'esign', ...component.instance().getDefaultState() },
      );
    });

    it('clear', () => {
      component.instance().cancel();
      const state = component.state();

      // TODO refactoring
      delete state.currentAnimation;
      delete state.currentSpeed;
      expect(state).toEqual(component.instance().getDefaultState());
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
      let fullHeight = window.innerHeight;
      fullHeight /= parseFloat(
        getComputedStyle(document.querySelector('body'))['font-size'],
      );
      component = setWindowURL({ player: 1 });
      expect(component.instance().getPlayerHeight()).toBe(fullHeight);
      expect(component.find('.colorInput').exists()).toBe(false);
      expect(component.find('.textInput').exists()).toBe(false);
      expect(component.find('.directionInput').exists()).toBe(false);
      expect(component.find('.fontSize').exists()).toBe(false);
      expect(component.find('.speed').exists()).toBe(false);
    });
  });

  describe('url and file load', () => {
    const stateChangeFuncs = [load, setWindowURL];

    stateChangeFuncs.forEach((stateChange) => {
      it('default', () => {
        const testState = {
          direction: ['down'],
          textState: 'TextNew',
          colorState: '#FF00FF',
          fontSize: 15,
          speed: 5,
        };
        component = stateChange(testState, component);

        Object.keys(testState).forEach((key) => {
          expect(component.state()[key]).toEqual(testState[key]);
        });
      });

      it('block currentAnimation property', () => {
        const testState = {
          direction: ['up'],
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

    it('clear on electron', () => {
      downloadTest(component, (rdata) => {
        expect({ cancel: true }).toEqual(rdata);
      });

      component.instance().cancel();
    });

    it('saveAs on electron', () => {
      downloadTest(component, (rdata) => {
        const dData = { saveAs: true, ...makeNormalDownloadData(component) };
        expect(dData).toEqual(rdata);
      });

      component.instance().saveAs();
    });

    describe('electron save and saveAs after load', () => {
      const fileName = 'bar.esign';

      beforeEach(() => {
        component = load(
          component.instance().getDefaultState(),
          component,
          fileName,
        );
      });

      it('saveAs should do save work after load', () => {
        downloadTest(component, (rdata) => {
          const dData = { saveAs: true, ...makeNormalDownloadData(component) };
          expect(dData).toEqual(rdata);
        });

        component.instance().saveAs();
      });

      it('save should have fileName after load', () => {
        downloadTest(component, (rdata) => {
          const dData = { fileName, ...makeNormalDownloadData(component) };
          expect(dData).toEqual(rdata);
        });

        component.instance().save();
      });
    });
  });
});
