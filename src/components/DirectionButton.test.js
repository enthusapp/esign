import React from 'react';
import { mount } from 'enzyme';
import Radio from '@material-ui/core/Radio';
import DirectionButton from './DirectionButton';

describe('DirectionButton', () => {
  let component = null;
  const TestName = 'TestName';
  const KeyList = ['up', 'down', 'right', 'left'];

  it('renders correctly', () => {
    component = mount(
      <DirectionButton
        name={TestName}
        keys={KeyList}
      />,
    );
    expect(Object.hasOwnProperty.call(component.props(), 'name')).toBe(true);
    expect(Object.hasOwnProperty.call(component.props(), 'keys')).toBe(true);
  });

  it('props value check', () => {
    expect(component.props().name).toBe(TestName);
    expect(component.props().keys).toBe(KeyList);
  });

  it('generate Raido', () => {
    const radioList = component.find(Radio);
    expect(radioList.exists()).toBe(true);
    expect(radioList.length).toBe(KeyList.length);
  });
});
