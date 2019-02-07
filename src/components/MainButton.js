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

    const saveText = isLoaded ? '수정완료' : '새로 만들기';

    return (
      <div>
        {isLoaded ? (<></>
        ) : (
          <label htmlFor="load">
            <input
              id="load"
              className="load"
              type="file"
              onChange={this.load}
              style={{ display: 'none' }}
            />
            <Button variant="contained" component="span" className="loadText">
              읽어오기
            </Button>
          </label>)
        }
        <Button variant="contained" className="save" onClick={download}>
          {isElectron ? saveText : '완료' }
        </Button>
        {isLoaded ? (
          <Button variant="contained" className="saveAs" onClick={saveAs}>
            새로 만들기
          </Button>
        ) : (<></>)
        }
        <Button variant="contained" className="cancel" onClick={cancel}>
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
