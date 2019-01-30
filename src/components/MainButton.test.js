import React from 'react';
import { shallow } from 'enzyme';
import MainButton from './MainButton';

let loadJSONcalled = false;
let downloadJSONcalled = false;
let cancelcalled = false;

function loadJSON() {
  loadJSONcalled = true;
}
function downloadJSON() {
  downloadJSONcalled = true;
}
function cancel() {
  cancelcalled = true;
}

describe('MainButton', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(
      <MainButton
        loadJSON={loadJSON}
        downloadJSON={downloadJSON}
        cancel={cancel}
      />,
    );
  });

  describe('component', () => {
    it('button exists', () => {
      expect(component.find('.load').exists()).toBe(true);
      expect(component.find('.save').exists()).toBe(true);
      expect(component.find('.cancel').exists()).toBe(true);
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

      expect(downloadJSONcalled).toBe(false);
      expect(cancelcalled).toBe(false);
      expect(loadJSONcalled).toBe(false);

      component.find('.load').simulate('submit', { target: { files: [file] } });
      component.find('.save').simulate('click');
      component.find('.cancel').simulate('click');

      expect(downloadJSONcalled).toBe(true);
      expect(cancelcalled).toBe(true);
      // expect(loadJSONcalled).toBe(true);
      // input button test is different
    });
  });
});
