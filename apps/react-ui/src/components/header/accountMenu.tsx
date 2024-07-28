import {
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
  memo,
} from 'react';
import { UserContext } from '../../common/providers/user-provider';
import authService from '../../common/services/auth-service';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from '@tanstack/react-router';

const AccountMenu = () => {
  const { idToken, setIdToken } = useContext(UserContext) ?? {};
  const logout = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      setIdToken && setIdToken(undefined);
    },
  });
  const handleLogOutClick = useCallback(() => logout.mutate(), [logout]);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = useCallback((event: Event | React.SyntheticEvent) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  }, []);

  // function handleListKeyDown(event: React.KeyboardEvent) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   } else if (event.key === 'Escape') {
  //     setOpen(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        id="composition-button"
        onClick={handleToggle}
        ref={anchorRef}
      >
        <AccountCircleIcon />
      </IconButton>
      <Popper
        anchorEl={anchorRef.current}
        disablePortal
        open={open}
        placement="bottom-end"
        role={undefined}
        // transition
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              aria-labelledby="composition-button"
              autoFocusItem={open}
              id="composition-menu"
            >
              <MenuItem>Hello {idToken?.firstName ?? 'unknown'}</MenuItem>
              <Divider />
              <MenuItem
                component={Link}
                // onClick={handleClose}
                to="/user/profile"
              >
                <ListItemIcon>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </MenuItem>
              <MenuItem component={Link} to="/user">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogOutClick}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

export default memo(AccountMenu);
