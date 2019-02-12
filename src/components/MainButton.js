import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class MainButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  load = (target) => {
    const {
      load,
      isElectron,
    } = this.props;

    if (isElectron) {
      this.setState({ isLoaded: true });
    }
    load(target);
  }

  render() {
    const {
      download,
      cancel,
      saveAs,
      isElectron,
    } = this.props;

    const {
      isLoaded,
    } = this.state;

    const electronSaveText = isLoaded ? '수정완료' : '새로 만들기';
    const electronSaveAction = isLoaded ? download : saveAs;
    const marginStyle = { margin: '0.5rem', width: '6.5rem' };

    return (
      <div style={{ backgroundColor: '#eeeeee', width: '100%' }}>
        {isLoaded ? (<></>
        ) : (
          <label htmlFor="load">
            <input
              id="load"
              className="load"
              type="file"
              onChange={this.load}
              accept=".esign"
              style={{ display: 'none' }}
            />
            <Button
              variant="outlined"
              color="primary"
              component="span"
              className="loadText"
              style={marginStyle}
            >
              읽어오기
            </Button>
          </label>)
        }
        <Button
          variant="outlined"
          color="primary"
          className="save"
          onClick={isElectron ? electronSaveAction : download}
          style={marginStyle}
        >
          {isElectron ? electronSaveText : '완료' }
        </Button>
        {isLoaded ? (
          <Button
            variant="outlined"
            color="primary"
            className="saveAs"
            onClick={saveAs}
            style={marginStyle}
          >
            새로 만들기
          </Button>
        ) : (<></>)
        }
        <Button
          variant="outlined"
          color="primary"
          className="cancel"
          onClick={cancel}
          style={marginStyle}
        >
          {isElectron ? '취소' : '초기화' }
        </Button>
      </div>
    );
  }
}

MainButton.propTypes = {
  load: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  saveAs: PropTypes.func.isRequired,
  isElectron: PropTypes.bool.isRequired,
};

export default MainButton;
