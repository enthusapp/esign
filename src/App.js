import React, { Component } from 'react';
import { SwatchesPicker } from 'react-color';
import { saveAs } from 'file-saver';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Player from './components/Player';
import IncButton from './components/IncButton';
import CheckboxSelection from './components/CheckboxSelection';
import MainButton from './components/MainButton';
import Tool from './tool';

function paramIsTruthy(param) {
  return [1, '1', 'true', 'True'].indexOf(param) > -1;
}

function checkElectron() {
  return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
}

const pixToRem = pix => pix / parseFloat(
  getComputedStyle(document.querySelector('body'))['font-size'],
);

class App extends Component {
  constructor(props) {
    super(props);
    const url = new URL(window.location.href);
    const player = paramIsTruthy(url.searchParams.get('player'));
    const electron = checkElectron();
    let height;

    if (player) {
      height = pixToRem(window.innerHeight);
    } else {
      height = 5;
      document.getElementsByTagName('body')[0].style.backgroundColor = '#eeeeee';
    }

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
    const { speed, direction } = this.state;
    this.state.currentSpeed = direction.length * speed;

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
      label: '글자 크기',
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
        return Tool.round10(r, -1);
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
        return Tool.round10(r, -1);
      },
    },
    {
      label: '속도',
      name: 'speed',
      increase: speed => (speed > 2 ? speed - 1 : 1),
      decrease: speed => (speed < 100 - 1 ? speed + 1 : 100),
    },
  ];

  getDefaultState = () => ({
    direction: ['up'],
    textState: 'ENTHUS 미디어 파사드',
    colorState: '#FFFFFF',
    fontSize: 2,
    speed: 5,
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
      if (key === 'direction') {
        newValue[key] = url.searchParams.getAll(`${key}[]`);
        if (newValue[key].length === 0) {
          newValue[key] = this.getDefaultState()[key];
        } // TODO: make new validation function
        return;
      }
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
    let animation = [];

    direction.forEach((direct) => {
      animation = [...animation, ...this.getAnimationList(fontSize)[direct]];
    });

    const offset = Tool.ceil10(1 / (animation.length - 1), -4);
    let sum = 0;

    return animation.map((ani) => {
      const rsum = sum;
      sum = Tool.ceil10(sum + offset, -4);
      if (sum > 1) sum = 1;

      return { transform: ani, offset: rsum };
    });
  };

  getAnimationList = (fontSize = this.getDefaultState().fontSize) => {
    const height = this.getPlayerHeight();
    const heightMiddle = (height - fontSize) / 2;

    return {
      up: [
        `translateY(${height}rem)`,
        `translateY(${heightMiddle}rem)`,
        `translateY(${heightMiddle}rem)`,
        `translateY(-${height}rem)`,
      ],
      down: [
        `translateY(-${height}rem)`,
        `translateY(${heightMiddle}rem)`,
        `translateY(${heightMiddle}rem)`,
        `translateY(${height}rem)`,
      ],
      right: [
        `translate(-100%, ${heightMiddle}rem)`,
        `translate(0%, ${heightMiddle}rem)`,
        `translate(0%, ${heightMiddle}rem)`,
        `translate(100%, ${heightMiddle}rem)`,
      ],
      left: [
        `translate(100%, ${heightMiddle}rem)`,
        `translate(0%, ${heightMiddle}rem)`,
        `translate(0%, ${heightMiddle}rem)`,
        `translate(-100%, ${heightMiddle}rem)`,
      ],
    };
  }

  updateAnimation = () => {
    const { speed, direction } = this.state;
    this.setState({ currentAnimation: this.getAnimation() });
    this.setState({ currentSpeed: speed * direction.length });
  };

  directionChange = (event) => {
    const { direction } = this.state;
    const index = direction.indexOf(event.target.value);

    if (event.target.checked) {
      if (index === -1) direction.push(event.target.value);
    } else if (index > -1 && direction.length > 1) {
      direction.splice(index, 1);
    }

    this.setState({ direction }, this.updateAnimation);
  }

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

  makeDownloadFormat = ({
    fontSize, speed, colorState, textState, direction,
  }) => ({
    fontSize, speed, colorState, textState, direction, mfp_type: 'esign',
  });

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
      currentSpeed,
      fontSize,
    } = this.state;
    const playerProps = { };

    const IncButtonComponents = this.getIncButtunList().map(bt => (
      <Grid item xs key={bt.name}>
        <Paper elevation={1} style={{ padding: '1rem' }}>
          <Typography component="p">
            {bt.label}
          </Typography>
          <IncButton
            className={bt.name}
            increase={App.prototype[`${bt.name}Inc`]}
            decrease={App.prototype[`${bt.name}Dec`]}
          />
        </Paper>
      </Grid>
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
            speed={currentSpeed}
            fontSize={fontSize}
            animation={currentAnimation}
            {...playerProps}
          />
          {this.isPlayerMode() ? (<></>) : (
            <MainButton
              className="mainButton"
              load={this.load}
              download={this.save}
              cancel={this.cancel}
              saveAs={this.saveAs}
              isElectron={this.isElectron()}
            />
          )}
        </div>
        {this.isPlayerMode() ? (<></>) : (
          <div
            className="InputWrap"
            style={{ zIndex: 1, padding: '0.5rem' }}
          >
            <Grid container spacing={24} justify="center">
              <Grid item xs={12}>
                <Paper elevation={1} style={{ padding: '1rem' }}>
                  <Typography component="p">
                    메시지 입력
                  </Typography>
                  <TextField
                    className="textInput"
                    value={textState}
                    onChange={this.textChange}
                    margin="normal"
                    fullWidth
                  />
                </Paper>
              </Grid>
              {IncButtonComponents}
              <Grid item xs>
                <Paper elevation={1} style={{ padding: '1rem' }}>
                  <Typography component="p">
                    방향 설정
                  </Typography>
                  <CheckboxSelection
                    checkedKeys={direction}
                    keys={Object.keys(this.getAnimationList())}
                    handleChange={this.directionChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={1} style={{ padding: '1rem' }}>
                  <Typography component="p">
                    색 설정
                  </Typography>
                  <div style={{ paddingTop: '0.5rem' }}>
                    <SwatchesPicker
                      className="colorInput"
                      onChangeComplete={this.colorChange}
                      width={window.innerWidth - 50}
                      height={170}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>)}
      </div>
    );
  }
}

export default App;
