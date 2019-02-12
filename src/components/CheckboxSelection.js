import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

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
          color="default"
          value={el}
        />
        )
      }
      label={el}
    />
  ));

  const error = checkedKeys.length < 1;

  return (
    <FormControl
      required
      error={error}
      component="fieldset"
    >
      <FormGroup row>
        {Checks}
      </FormGroup>
      <FormHelperText>반드시 한개 이상 선택해야 합니다.</FormHelperText>
    </FormControl>
  );
}

export default CheckboxSelection;
