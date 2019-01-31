import React from 'react';
import { shallow } from 'enzyme';
import MainButton from './MainButton';

let loadCalled = false;
let downloadCalled = false;
let cancelCalled = false;

function load() {
  loadCalled = true;
}
function download() {
  downloadCalled = true;
}
function cancel() {
  cancelCalled = true;
}

describe('MainButton', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(
      <MainButton
        load={load}
        download={download}
        cancel={cancel}
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
          enableSaveAs
        />,
      );
    });

    it('saveas prop true', () => {
      expect(component.find('.saveAs').exists()).toBe(true);
    });
  });
});
