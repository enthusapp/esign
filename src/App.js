import React, { Component } from 'react';
import { SwatchesPicker } from 'react-color';
import { saveAs } from 'file-saver';
import TextField from '@material-ui/core/TextField';
import Player from './components/Player';
import IncButton from './components/IncButton';
import DirectionButton from './components/DirectionButton';
import MainButton from './components/MainButton';

const DEFAULT_PLAYER_HEIGHT = 10;

function paramIsTruthy(param) {
  return [1, '1', 'true', 'True'].indexOf(param) > -1;
}

function download(data, filename) {
  const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  saveAs(file, filename);
}

function checkElectron() {
  return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
}

function decimalAdjust(type, inValue, inExp) {
  let value = inValue;
  let exp = inExp;

  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }

  value = +value;
  exp = +exp;

  if (Number.isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }

  value = value.toString().split('e');
  value = Math[type](+(`${value[0]}e${(value[1] ? (+value[1] - exp) : -exp)}`));
  value = value.toString().split('e');

  return +(`${value[0]}e${(value[1] ? (+value[1] + exp) : exp)}`);
}

if (!Math.round10) {
  Math.round10 = (value, exp) => decimalAdjust('round', value, exp);
}

class App extends Component {
  constructor(props) {
    super(props);
    const url = new URL(window.location.href);
    const player = paramIsTruthy(url.searchParams.get('player'));
    const electron = checkElectron();

    this.state = this.getNewStateFromURL(url);
    this.state.currentAnimation = this.getAnimation();
    this.state.isFileLoaded = false;

    App.prototype.isPlayerMode = () => player;
    App.prototype.isElectron = () => electron;

    this.getIncButtunList().forEach((bt) => {
      const { name, increase, decrease } = bt;

      App.prototype[`${name}Inc`] = () => {
        const { [name]: prev } = this.state;
        this.setState({ [name]: increase(prev) }, this.updateAnimation);
      };

      App.prototype[`${name}Dec`] = () => {
        const { [name]: prev } = this.state;
        this.setState({ [name]: decrease(prev) }, this.updateAnimation);
      };
    });
  }

  getIncButtunList = () => [
    {
      name: 'fontSize',
      increase: (fontSize) => {
        let r = 100;
        if (fontSize < 1) {
          r = fontSize + 0.1;
        } else if (fontSize < 2) {
          r = fontSize + 0.2;
        } else if (fontSize < 99) {
          r = fontSize + 1;
        }
        return Math.round10(r, -1);
      },
      decrease: (fontSize) => {
        let r = 0.1;
        if (fontSize > 2) {
          r = fontSize - 1;
        } else if (fontSize > 1) {
          r = fontSize - 0.2;
        } else if (fontSize > 0.2) {
          r = fontSize - 0.1;
        }
        return Math.round10(r, -1);
      },
    },
    {
      name: 'speed',
      increase: speed => (speed > 2 ? speed - 1 : 1),
      decrease: speed => (speed < 100 - 1 ? speed + 1 : 100),
    },
  ];

  getDefaultState = () => ({
    direction: 'up',
    textState: 'Text',
    colorState: '#FFFFFF',
    fontSize: 5,
    speed: 10,
  })

  getNewState = (data) => {
    const newValue = {};
    Object.keys(this.getDefaultState()).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newValue[key] = data[key];
      }
    });
    return newValue;
  }

  getNewStateFromURL = (url) => {
    const newValue = {};

    Object.assign(newValue, this.getDefaultState());

    Object.keys(this.getDefaultState()).forEach((key) => {
      if (url.searchParams.get(key)) {
        switch (key) {
          case 'colorState':
            newValue[key] = `#${url.searchParams.get(key)}`;
            break;
          case 'fontSize':
            newValue[key] = parseInt(url.searchParams.get(key), 10);
            break;
          case 'speed':
            newValue[key] = parseInt(url.searchParams.get(key), 10);
            break;
          default:
            newValue[key] = url.searchParams.get(key);
            break;
        }
      }
    });
    return newValue;
  }

  getDefaultPlayerHeight = () => DEFAULT_PLAYER_HEIGHT;

  getAnimation = () => {
    const { fontSize, direction } = this.state;
    return this.getAnimationList(fontSize)[direction];
  };

  getAnimationList = (fontSize = this.getDefaultState().fontSize) => {
    const heightMiddle = (DEFAULT_PLAYER_HEIGHT - fontSize) / 2;

    return {
      up: [
        { transform: `translateY(${DEFAULT_PLAYER_HEIGHT}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.7 },
        { transform: `translateY(-${DEFAULT_PLAYER_HEIGHT}rem)` },
      ],
      down: [
        { transform: `translateY(-${DEFAULT_PLAYER_HEIGHT}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.7 },
        { transform: `translateY(${DEFAULT_PLAYER_HEIGHT}rem)` },
      ],
      right: [
        { transform: `translate(-100%, ${heightMiddle}rem)` },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.7 },
        { transform: `translate(100%, ${heightMiddle}rem)` },
      ],
      left: [
        { transform: `translate(100%, ${heightMiddle}rem)` },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.7 },
        { transform: `translate(-100%, ${heightMiddle}rem)` },
      ],
    };
  }

  updateAnimation = () => {
    this.setState({ currentAnimation: this.getAnimation() });
  };

  directionChange = (event) => {
    this.setState({ direction: event.target.value }, this.updateAnimation);
  };

  textChange = (event) => {
    this.setState({ textState: event.target.value });
  };

  colorChange = (color) => {
    this.setState({ colorState: color.hex });
  };

  downloadJSON = () => {
    const newValue = {};
    Object.assign(newValue, this.state);

    newValue.mfp_type = 'esign';
    delete newValue.currentAnimation;
    delete newValue.isFileLoaded;
    const data = JSON.stringify({ ...newValue }, null, 4);

    download(data, 'esign.json');
  }

  saveAs = () => {}

  setStateFromJSON = (data) => {
    this.setState(this.getNewState(data), this.updateAnimation);
  }

  loadJSON = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        // TODO: need parse fail error handling
        this.setStateFromJSON(data);
        if (this.isElectron()) {
          this.setState({ isFileLoaded: true });
        }
      };
      reader.readAsText(file);
    }
  }

  cancel = () => {
    if (this.isElectron()) {
      // close window
    } else {
      this.setState(this.getDefaultState(), this.updateAnimation);
    }
  }

  render() {
    const {
      currentAnimation,
      direction,
      textState,
      colorState,
      isFileLoaded,
    } = this.state;
    const playerProps = { };

    this.getIncButtunList().forEach((bt) => {
      const { name } = bt;
      const { [name]: btState } = this.state;
      playerProps[name] = btState;
    });

    const IncButtonComponents = this.getIncButtunList().map(bt => (<IncButton
      key={bt.name}
      name={bt.name}
      className={bt.name}
      increase={App.prototype[`${bt.name}Inc`]}
      decrease={App.prototype[`${bt.name}Dec`]}
    />
    ));

    return (
      <div className="App">
        <Player
          className="player"
          player={this.isPlayerMode()}
          text={textState}
          backgroundColor="black"
          color={colorState}
          height={String(DEFAULT_PLAYER_HEIGHT)}
          direction="left"
          animation={currentAnimation}
          {...playerProps}
        />
        {this.isPlayerMode() ? (<></>) : (
          <div>
            <MainButton
              className="mainButton"
              load={this.loadJSON}
              download={this.downloadJSON}
              cancel={this.cancel}
              saveAs={this.saveAs}
              enableSaveAs={isFileLoaded}
            />
            <SwatchesPicker
              className="colorInput"
              onChangeComplete={this.colorChange}
            />
            <TextField
              label="Text Input"
              className="textInput"
              value={textState}
              onChange={this.textChange}
              margin="normal"
              fullWidth
            />
            <DirectionButton
              name="Direction"
              keys={Object.keys(this.getAnimationList())}
              direction={direction}
              handleChange={this.directionChange}
            />
            {IncButtonComponents}
          </div>)}
      </div>
    );
  }
}

export default App;
