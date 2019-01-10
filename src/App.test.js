import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('basic app test', () => {
  const div = document.createElement('div');

  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('renders without crashing', () => {
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('set app title', () => {
    ReactDOM.render(<App />, div);
    window.requestAnimationFrame(() => {
     expect(document.title).to.equal('Enthus Esign');
     done();
    });
    ReactDOM.unmountComponentAtNode(div);
  });
})