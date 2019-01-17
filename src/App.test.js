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
    let player = null;

    it('rendering', () => {
      component = shallow(<App />);
      player = component.find('.player');
      expect(player.exists()).toBe(true);
    });

    describe('check button list', () => {
      const buttons = [
        {
          name: '.btIncFontSize',
          inc: 'increaseFontSize',
          dec: 'decreaseFontSize',
          val: 'fontSize',
        },
        {
          name: '.btSpeed',
          inc: 'increaseSpeed',
          dec: 'decreaseSpeed',
          val: 'speed',
        },
      ];

      buttons.forEach((bt) => {
        let button = null;

        it('font size button exists', () => {
          button = component.find(bt.name);
          expect(button.exists()).toBe(true);
        });

        it('font size button event', () => {
          component.instance()[bt.inc]();
          expect(component.state()[bt.val]).toBe(31);

          component.instance()[bt.dec]();
          expect(component.state()[bt.val]).toBe(30);
        });

        describe('font size button event limitation', () => {
          it('max', () => {
            Array(200).fill().forEach(() => {
              component.instance()[bt.inc]();
            });
            expect(component.state()[bt.val]).toBeLessThan(101);
          });

          it('min', () => {
            Array(200).fill().forEach(() => {
              component.instance()[bt.dec]();
            });
            expect(component.state()[bt.val]).toBeGreaterThan(0);
          });
        });

        describe('button to player', () => {
          it('has proporty', () => {
            player = component.find('.player');
            expect(player.props()[bt.val]).toBe(component.state()[bt.val]);
          });

          it('click and fontSize', () => {
            component.instance().decreaseFontSize();
            player = component.find('.player');
            expect(player.props()[bt.val]).toBe(component.state()[bt.val]);
          });
        });
      });
    });
  });
});
