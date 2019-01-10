import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('set app title', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  window.requestAnimationFrame(() => {
    expect(document.title).to.equal('Enthus Esign');
    done();
  });
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
