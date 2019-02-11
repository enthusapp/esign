import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '@material-ui/core/Checkbox';
import DirectionButton2 from './DirectionButton2';

function handleChange() {
}

describe('DirectionButton2', () => {
  let component = null;
  const KeyList = ['up', 'down', 'right', 'left'];
  const checkList = ['down', 'right', 'left'];

  it('renders correctly', () => {
    component = mount(
      <DirectionButton2
        keys={KeyList}
        checkedKeys={checkList}
        handleChange={handleChange}
      />,
    );
    expect(Object.hasOwnProperty.call(component.props(), 'keys')).toBe(true);
  });

  it('generate Checkbox', () => {
    const checkBoxs = component.find(Checkbox);
    expect(checkBoxs.exists()).toBe(true);
    expect(checkBoxs.length).toBe(KeyList.length);
  });

  it('checked box', () => {
    KeyList.forEach((el) => {
      const { props } = component.find(`.${el}checkBox`).get(0);
      expect(props.checked).toBe(checkList.indexOf(props.value) > -1);
    });
  });

  it('simulate Checkbox', () => {
    // cannot simulate material-ui checkbox
  });
});
