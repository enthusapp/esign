import React from 'react';
import Button from '@material-ui/core/Button';

function MainButton(prop) {
  const {
    loadJSON,
    downloadJSON,
    cancel,
  } = prop;

  return (
    <div>
      <label htmlFor="load">
        <input
          id="load"
          className="load"
          type="file"
          onChange={loadJSON}
          style={{ display: 'none' }}
        />
        <Button variant="contained" component="span">
          읽어오기
        </Button>
      </label>
      <Button variant="contained" className="save" onClick={downloadJSON}>
        완료
      </Button>
      <Button variant="contained" className="cancel" onClick={cancel}>
        취소
      </Button>
    </div>
  );
}

export default MainButton;
