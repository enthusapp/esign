import React, { Component } from 'react';
import { SwatchesPicker } from 'react-color';
import { saveAs } from 'file-saver';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Player from './components/Player';
import IncButton from './components/IncButton';
import DirectionButton from './components/DirectionButton';

const DEFAULT_PLAYER_HEIGHT = 10;
const DEFAULT_FONT_SIZE = 5;

function paramIsTruthy(param) {
  return [1, '1', 'true', 'True'].indexOf(param) > -1;
}

function download(data, filename) {
  const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  saveAs(file, filename);
}

class App extends Component {
  constructor(props) {
    super(props);
    const url = new URL(window.location.href);
    const player = paramIsTruthy(url.searchParams.get('player'));

    App.prototype.isPlayerMode = () => player;

    const makeState = {
      currentAnimation: this.getAnimationList().up,
      direction: 'up',
      textState: 'Text',
      colorState: '#FFFFFF',
    };

    this.getIncButtunList().forEach((bt) => {
      const {
        name,
        defaultVal,
        lowLimit,
        highLimit,
        reverse,
      } = bt;

      makeState[name] = defaultVal;

      const increase = () => {
        const { [name]: prev, direction } = this.state;
        const newValue = prev < highLimit - 1 ? prev + 1 : highLimit;
        this.setState({
          [name]: newValue,
        });
        if (name === 'fontSize') {
          this.setState({
            currentAnimation: this.getAnimationList(newValue)[direction],
          });
        }
      };

      const decrease = () => {
        const { [name]: prev, direction } = this.state;
        const newValue = prev > lowLimit + 1 ? prev - 1 : lowLimit;
        this.setState({
          [name]: newValue,
        });
        if (name === 'fontSize') {
          this.setState({
            currentAnimation: this.getAnimationList(newValue)[direction],
          });
        }
      };

      if (reverse) {
        App.prototype[`${name}Inc`] = decrease;
        App.prototype[`${name}Dec`] = increase;
      } else {
        App.prototype[`${name}Inc`] = increase;
        App.prototype[`${name}Dec`] = decrease;
      }
    });

    this.state = makeState;
  }

  getDefaultPlayerHeight = () => DEFAULT_PLAYER_HEIGHT;

  getIncButtunList = () => [
    {
      id: 0,
      name: 'fontSize',
      defaultVal: DEFAULT_FONT_SIZE,
      lowLimit: 1,
      highLimit: 100,
      reverse: false,
    },
    {
      id: 1,
      name: 'speed',
      defaultVal: 10,
      lowLimit: 1,
      highLimit: 100,
      reverse: true,
    },
  ];

  getAnimationList = (fontSize = DEFAULT_FONT_SIZE) => {
    const heightMiddle = (DEFAULT_PLAYER_HEIGHT - fontSize) / 2;

    return {
      up: [
        { transform: `translateY(${DEFAULT_PLAYER_HEIGHT}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translateY(-${DEFAULT_PLAYER_HEIGHT}rem)` },
      ],
      down: [
        { transform: `translateY(-${DEFAULT_PLAYER_HEIGHT}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translateY(${DEFAULT_PLAYER_HEIGHT}rem)` },
      ],
      right: [
        { transform: `translate(-100%, ${heightMiddle}rem)` },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translate(100%, ${heightMiddle}rem)` },
      ],
      left: [
        { transform: `translate(100%, ${heightMiddle}rem)` },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translate(-100%, ${heightMiddle}rem)` },
      ],
    };
  }

  directionChange = (event) => {
    const { fontSize } = this.state;

    this.setState({ direction: event.target.value });
    this.setState({
      currentAnimation: this.getAnimationList(fontSize)[event.target.value],
    });
  };

  textChange = (event) => {
    this.setState({ textState: event.target.value });
  };

  colorChange = (color) => {
    this.setState({ colorState: color.hex });
  };

  downloadJSON = () => {
    const data = JSON.stringify({ ...this.state }, null, 4);
    download(data, 'newText.json');
  }

  loadJSON = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        const newValue = {};
        Object.keys(data).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(this.state, key)) {
            newValue[key] = data[key];
          }
        });
        this.setState(newValue);
      };
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
      key={bt.id}
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
          text={textState}
          backgroundColor="black"
          color={colorState}
          height={String(DEFAULT_PLAYER_HEIGHT)}
          direction="left"
          animation={currentAnimation}
          {...playerProps}
        />
        {this.isPlayerMode() ? (<div />) : (
          <div>
            <input type="file" onChange={this.loadJSON} />
            <Button variant="contained" className="load" onClick={this.loadJSON}>
              읽어오기
            </Button>
            <Button variant="contained" className="download" onClick={this.downloadJSON}>
              완료
            </Button>
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
