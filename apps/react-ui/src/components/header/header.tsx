import { Link } from '@tanstack/react-router';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <header className="container mx-auto flex flex-row justify-between items-center">
      <h1>Brand</h1>
      <div className="container flex mx-auto">
        {/* // TODO: https://codepen.io/billzhao/pen/wzxMbW */}
        {/* <TextField
          size="small"
          role="search"
          aria-label="Sitewide"
          name="search"
          placeholder="Search Products"
          type="search"
          id="search"
          fullWidth
          margin="none"
        /> */}

        <FormControl fullWidth sx={{ m: 1 }}>
          {/* <Select
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value={10}>All Categories</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <VisibilityOff />
                </IconButton>
              </InputAdornment>
            }
            fullWidth
            id="outlined-adornment-amount"
            placeholder="Amount"
            size="small"
          />
        </FormControl>
      </div>
      <div className="p-2 flex gap-2">
        <Link className="[&.active]:font-bold" to="/">
          Home
        </Link>
        <Link className="[&.active]:font-bold" to="/login">
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;
