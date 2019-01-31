import React from 'react';
import Button from '@material-ui/core/Button';

function MainButton(prop) {
  const {
    load,
    download,
    cancel,
    saveAs,
    enableSaveAs,
  } = prop;

  return (
    <div>
      <label htmlFor="load">
        <input
          id="load"
          className="load"
          type="file"
          onChange={load}
          style={{ display: 'none' }}
        />
        <Button variant="contained" component="span">
          읽어오기
        </Button>
      </label>
      <Button variant="contained" className="save" onClick={download}>
        완료
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

export default MainButton;
