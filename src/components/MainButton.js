import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class MainButton extends Component {
  constructor(props) {
    super(props);
    this.state = { enableSaveAs: false };
  }

  load = () => {
    const {
      load,
      isElectron,
    } = this.props;

    if (isElectron) {
      this.setState({ enableSaveAs: true });
    }
    load();
  }

  render() {
    const {
      download,
      cancel,
      saveAs,
    } = this.props;

    const {
      enableSaveAs,
    } = this.state;

    return (
      <div>
        <label htmlFor="load">
          <input
            id="load"
            className="load"
            type="file"
            onChange={this.load}
            style={{ display: 'none' }}
          />
          <Button variant="contained" component="span">
            이전 MESSAGE 읽어오기
          </Button>
        </label>
        <Button variant="contained" className="save" onClick={download}>
          저장
        </Button>
        {enableSaveAs ? (
          <Button variant="contained" className="saveAs" onClick={saveAs}>
            다른이름으로 저장
          </Button>
        ) : (<></>)
        }
        <Button variant="contained" className="cancel" onClick={cancel}>
          취소
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
