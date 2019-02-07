import React from 'react';
import { shallow } from 'enzyme';
import MainButton from './MainButton';

let loadCalled = false;
let saveCalled = false;
let cancelCalled = false;
let saveAsCalled = false;

function calledClear() {
  loadCalled = false;
  saveCalled = false;
  cancelCalled = false;
  saveAsCalled = false;
}

function load(event) {
  const file = event.target.files[0];
  loadCalled = file;
}
function download() {
  saveCalled = true;
}
function cancel() {
  cancelCalled = true;
}
function saveAs() {
  saveAsCalled = true;
}

function isTextRight(component, button, text) {
  return component.find(button).html().indexOf(text) > -1;
}

describe('MainButton', () => {
  let component = null;

  describe('on web browser', () => {
    beforeEach(() => {
      component = shallow(
        <MainButton
          load={load}
          download={download}
          cancel={cancel}
          saveAs={saveAs}
          isElectron={false}
        />,
      );
      calledClear();
    });

    it('button exists', () => {
      expect(component.find('.load').exists()).toBe(true);
      expect(component.find('.save').exists()).toBe(true);
      expect(component.find('.cancel').exists()).toBe(true);
      expect(component.find('.saveAs').exists()).toBe(false);
    });

    it('button text', () => {
      expect(isTextRight(component, '.loadText', '읽어오기')).toBe(true);
      expect(isTextRight(component, '.save', '완료')).toBe(true);
      expect(isTextRight(component, '.cancel', '초기화')).toBe(true);
    });

    it('load presss', () => {
      const file = 'loadTest';
      component.find('.load').simulate('change', { target: { files: [file] } });
      expect(loadCalled).toBe(file);
    });

    it('save presss', () => {
      component.find('.save').simulate('click');
      expect(saveCalled).toBe(true);
    });

    it('cancel presss', () => {
      component.find('.cancel').simulate('click');
      expect(cancelCalled).toBe(true);
    });
  });

  describe('isElectron', () => {
    beforeEach(() => {
      component = shallow(
        <MainButton
          load={load}
          download={download}
          cancel={cancel}
          saveAs={saveAs}
          isElectron
        />,
      );
      calledClear();
    });

    it('button text', () => {
      expect(isTextRight(component, '.loadText', '읽어오기')).toBe(true);
      expect(isTextRight(component, '.save', '새로 만들기')).toBe(true);
      expect(isTextRight(component, '.cancel', '취소')).toBe(true);
    });

    it('button layout default', () => {
      expect(component.find('.saveAs').exists()).toBe(false);
      expect(component.state().isLoaded).toBe(false);
    });

    it('press save, but work saveAs', () => {
      component.find('.save').simulate('click');
      expect(saveAsCalled).toBe(true);
      expect(saveCalled).toBe(false);
    });

    describe('isLoaded', () => {
      beforeEach(() => {
        component.find('.load').simulate('change', { target: { files: ['test'] } });
      });

      it('press load', () => {
        expect(component.state().isLoaded).toBe(true);
        expect(component.find('.saveAs').exists()).toBe(true);
      });

      it('text change', () => {
        expect(component.find('.load').exists()).toBe(false);
        expect(isTextRight(component, '.save', '수정완료')).toBe(true);
        expect(isTextRight(component, '.saveAs', '새로 만들기')).toBe(true);
      });

      it('press saveAs, and saveAs action', () => {
        component.find('.saveAs').simulate('click');
        expect(saveAsCalled).toBe(true);
      });

      it('press save, and save after file loading', () => {
        component.find('.save').simulate('click');
        expect(saveCalled).toBe(true);
        expect(saveAsCalled).toBe(false);
      });
    });
  });
});
