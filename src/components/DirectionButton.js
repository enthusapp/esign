import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function DirectionButton(prop) {
  const {
    keys,
    direction,
    handleChange,
  } = prop;

  const Radios = keys.map(el => (
    <FormControlLabel
      key={el}
      value={el}
      control={<Radio color="default" />}
      label={el}
    />));

  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          value={direction}
          onChange={handleChange}
        >
          {Radios}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default DirectionButton;
