import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  let component = null;
  let button = null;

  it('renders correctly', () => {
    component = shallow(
      <Button
        text="+"
        number={0}
      />,
    );
    button = component.find('button').get(0);
  });

  describe('button', () => {
    it('text correctly', () => {
      expect(component.text()).toEqual('+');
    });
    it('type correctly', () => {
      expect(button.type).toEqual('button');
    });
  });
});
