import React, { Component } from 'react';
import { SwatchesPicker } from 'react-color';
import { saveAs } from 'file-saver';
import TextField from '@material-ui/core/TextField';
import Player from './components/Player';
import IncButton from './components/IncButton';
import DirectionButton from './components/DirectionButton';
import MainButton from './components/MainButton';

function paramIsTruthy(param) {
  return [1, '1', 'true', 'True'].indexOf(param) > -1;
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
    let fullHeight = window.innerHeight;
    fullHeight /= parseFloat(
      getComputedStyle(document.querySelector('body'))['font-size'],
    );
    const height = player ? fullHeight : 10;

    App.prototype.isPlayerMode = () => player;
    App.prototype.isElectron = () => electron;
    App.prototype.getPlayerHeight = () => height;

    if (electron) {
      App.prototype.cancel = () => this.download({ cancel: true });
    } else {
      App.prototype.cancel = () => this.setState(
        this.getDefaultState(), this.updateAnimation,
      );
    }

    this.state = this.getNewStateFromURL(url);
    this.state.currentAnimation = this.getAnimation();
    this.state.fileName = undefined;

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
    textState: 'Enthus 메시지 편집기',
    colorState: '#FFCCBC',
    fontSize: 2,
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

  getAnimation = () => {
    const { fontSize, direction } = this.state;
    return this.getAnimationList(fontSize)[direction];
  };

  getAnimationList = (fontSize = this.getDefaultState().fontSize) => {
    const height = this.getPlayerHeight();
    const heightMiddle = (height - fontSize) / 2;

    return {
      up: [
        { transform: `translateY(${height}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.7 },
        { transform: `translateY(-${height}rem)` },
      ],
      down: [
        { transform: `translateY(-${height}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.7 },
        { transform: `translateY(${height}rem)` },
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

  download = (data) => {
    const file = new Blob(
      [JSON.stringify(data, null, 4)],
      { type: 'text/plain;charset=utf-8' },
    );
    saveAs(file, 'message.esign');
  };

  makeDownloadFormat = (state) => {
    const {
      fontSize, speed, colorState, textState, direction,
    } = state;

    return {
      mfp_type: 'esign',
      direction,
      fontSize,
      speed,
      colorState,
      textState,
    };
  }

  save = () => {
    const downData = this.makeDownloadFormat(this.state);
    const { fileName } = this.state;
    if (this.isElectron()) downData.fileName = fileName;
    this.download(downData);
  }

  saveAs = () => {
    this.download({ saveAs: true, ...this.makeDownloadFormat(this.state) });
  }

  setStateFromJSON = (data) => {
    this.setState(this.getNewState(data), this.updateAnimation);
  }

  fileReaderOnLoad = (reader, file) => {
    const data = JSON.parse(reader.result);
    // TODO: need parse fail error handling
    this.setStateFromJSON(data);
    if (this.isElectron()) this.setState({ fileName: file.name });
  }

  load = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => { this.fileReaderOnLoad(reader, file); };
      reader.readAsText(file);
    }
  }

  render() {
    const {
      currentAnimation,
      direction,
      textState,
      colorState,
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
        <div
          className="PlayerWrap"
          style={{ position: 'sticky', top: 0, zIndex: 10 }}
        >
          <Player
            className="player"
            player={this.isPlayerMode()}
            text={textState}
            backgroundColor="black"
            color={colorState}
            height={String(this.getPlayerHeight())}
            direction="left"
            animation={currentAnimation}
            {...playerProps}
          />
        </div>
        {this.isPlayerMode() ? (<></>) : (
          <div className="InputWrap" style={{ zIndex: 1 }}>
            <MainButton
              className="mainButton"
              load={this.load}
              download={this.save}
              cancel={this.cancel}
              saveAs={this.saveAs}
              isElectron={this.isElectron()}
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
