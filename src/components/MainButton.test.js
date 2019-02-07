import React from 'react';
import { shallow } from 'enzyme';
import MainButton from './MainButton';

let loadCalled = false;
let downloadCalled = false;
let cancelCalled = false;
let saveAsCalled = false;

function load() {
  loadCalled = true;
}
function download() {
  downloadCalled = true;
}
function cancel() {
  cancelCalled = true;
}
function saveAs() {
  saveAsCalled = true;
}

describe('MainButton', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(
      <MainButton
        load={load}
        download={download}
        cancel={cancel}
        saveAs={saveAs}
        isElectron={false}
      />,
    );
  });

  describe('component', () => {
    it('button exists', () => {
      expect(component.find('.load').exists()).toBe(true);
      expect(component.find('.save').exists()).toBe(true);
      expect(component.find('.cancel').exists()).toBe(true);
      expect(component.find('.saveAs').exists()).toBe(false);
    });

    it('button presss', () => {
      const testState = {
        direction: 'down',
        textState: 'TextNew',
        colorState: '#FF00FF',
        fontSize: 15,
        speed: 5,
      };
      const file = new File([testState], 'bar.txt');

      expect(downloadCalled).toBe(false);
      expect(cancelCalled).toBe(false);
      expect(loadCalled).toBe(false);

      component.find('.load').simulate('submit', { target: { files: [file] } });
      component.find('.save').simulate('click');
      component.find('.cancel').simulate('click');

      expect(downloadCalled).toBe(true);
      expect(cancelCalled).toBe(true);
      // expect(loadCalled).toBe(true);
      // input button test is different
    });
  });

  describe('saveas', () => {
    it('saveas prop true', () => {
      component = shallow(
        <MainButton
          load={load}
          download={download}
          cancel={cancel}
          saveAs={saveAs}
          isElectron
        />,
      );
    });

    it('saveAs prop true', () => {
      expect(component.find('.saveAs').exists()).toBe(false);
      expect(component.state().enableSaveAs).toBe(false);
      expect(saveAsCalled).toBe(false);
    });

    it('make saveAs', () => {
      component.instance().load();
      expect(component.state().enableSaveAs).toBe(true);
      expect(component.find('.saveAs').exists()).toBe(true);
    });

    it('saveAs click', () => {
      component.find('.saveAs').simulate('click');
      expect(saveAsCalled).toBe(true);
    });
  });
});
