import React from 'react';
import { shallow } from 'enzyme';
import MainButton from './MainButton';

function isTextRight(component, button, text) {
  return component.find(button).html().indexOf(text) > -1;
}

describe('MainButton', () => {
  let component = null;
  let loadMock;
  let saveMock;
  let saveAsMock;
  let cancelMock;
  const loadEvent = { target: { files: ['loadTest'] } };

  beforeEach(() => {
    loadMock = jest.fn();
    saveMock = jest.fn();
    saveAsMock = jest.fn();
    cancelMock = jest.fn();
  });

  afterEach(() => {
    loadMock.mockReset();
    saveMock.mockReset();
    saveAsMock.mockReset();
    cancelMock.mockReset();
  });

  describe('on web browser', () => {
    beforeEach(() => {
      component = shallow(
        <MainButton
          load={loadMock}
          download={saveMock}
          cancel={cancelMock}
          saveAs={saveAsMock}
          isElectron={false}
        />,
      );
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
      component.find('.load').simulate('change', loadEvent);

      expect(loadMock).toHaveBeenCalledTimes(1);
      expect(loadMock.mock.calls[0][0]).toEqual(loadEvent);
    });

    it('save presss', () => {
      component.find('.save').simulate('click');
      expect(saveMock).toHaveBeenCalledTimes(1);
    });

    it('cancel presss', () => {
      component.find('.cancel').simulate('click');
      expect(cancelMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('isElectron', () => {
    beforeEach(() => {
      component = shallow(
        <MainButton
          load={loadMock}
          download={saveMock}
          cancel={cancelMock}
          saveAs={saveAsMock}
          isElectron
        />,
      );
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
      expect(saveAsMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveBeenCalledTimes(0);
    });

    describe('isLoaded', () => {
      beforeEach(() => {
        component.find('.load').simulate('change', loadEvent);
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
        expect(saveAsMock).toHaveBeenCalledTimes(1);
      });

      it('press save, and save after file loading', () => {
        component.find('.save').simulate('click');
        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(saveAsMock).toHaveBeenCalledTimes(0);
      });
    });
  });
});
