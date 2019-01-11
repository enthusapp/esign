import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  let component = null;
  let button = null;
  let number = 0;

  function handleEvent(data) {
    number = data + 1;
    return number;
  }

  it('renders correctly', () => {
    component = shallow(
      <Button
        text="+"
        number={0}
        handleEvent={handleEvent}
      />,
    );

    button = component.find('button');
  });

  describe('button', () => {
    it('text correctly', () => {
      expect(button.text()).toEqual('+');
    });

    it('type correctly', () => {
      expect(button.get(0).type).toEqual('button');
    });

    it('type correctly', () => {
      button.simulate('click');
      expect(number).toBe(1);
    });

    it('type correctly', () => {
      button.simulate('click');
      expect(number).toBe(2);
    });
  });
});
