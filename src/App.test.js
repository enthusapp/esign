import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

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

  describe('component', () => {
    let component = null;

    it('rendering', () => {
      component = shallow(<App />);
    });

    it('button exists', () => {
      expect(component.find('button').exists()).toBe(true);
    });

    it('button event', () => {
      component.find('button').simulate('click');
      expect(component.state().number).toBe(31);
    });

    it('button event', () => {
      component.find('button').simulate('click');
      expect(component.state().number).toBe(32);
    });
  });
});
