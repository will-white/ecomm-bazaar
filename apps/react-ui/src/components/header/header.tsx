import { Link } from '@tanstack/react-router';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { memo, useContext } from 'react';
import { UserContext } from '../../common/providers/user-provider';
import AccountMenu from './accountMenu';

// export interface HeaderProps {}

const Header = () => {
  const { idToken } = useContext(UserContext) ?? {};

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
      <div className="p-2 flex gap-2 items-center">
        <Link className="[&.active]:font-bold" to="/">
          Home
        </Link>
        {idToken == null ? (
          <Link className="[&.active]:font-bold" to="/login">
            Login
          </Link>
        ) : (
          <AccountMenu />
        )}
      </div>
    </header>
  );
};

export default memo(Header);
