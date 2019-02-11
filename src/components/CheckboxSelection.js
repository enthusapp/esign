import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function CheckboxSelection(prop) {
  const {
    keys,
    checkedKeys,
    handleChange,
  } = prop;

  const Checks = keys.map(el => (
    <FormControlLabel
      key={el}
      control={(
        <Checkbox
          className={`${el}checkBox`}
          checked={checkedKeys.indexOf(el) > -1}
          onChange={handleChange}
          value={el}
        />
        )
      }
      label={el}
    />
  ));

  return (
    <FormGroup row>
      {Checks}
    </FormGroup>
  );
}

export default CheckboxSelection;
