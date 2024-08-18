/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Paper,
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { memo } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useQuery } from '@tanstack/react-query';
import personalInfoService from '../../common/services/user-profile-service';

const AccountInfo = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useQuery({
    queryKey: ['personal-info'],
    queryFn: () => personalInfoService.getMe(),
    staleTime: 1000 * 60 * 15,
  });

  console.log(data);

  if (!data) return <>Loading...</>;

  const date = new Date(data.dob);
  date.setMinutes(date.getTimezoneOffset());

  return (
    <div className="flex flex-col gap-8">
      <Paper>
        <List
          aria-labelledby="profile-header"
          disablePadding
          subheader={
            <ListSubheader component="div" id="profile-header">
              Profile Info
            </ListSubheader>
          }
        >
          <Divider />
          <ListItemButton className="!grid grid-cols-4 gap-2" divider>
            <div>Date of Birth</div>
            <div>{date.toLocaleDateString()}</div>
            <div className="flex justify-between col-span-2">
              <span>Your date of birth is used for account safety setting</span>
              <NavigateNextIcon />
            </div>
          </ListItemButton>
          <ListItemButton className="!grid grid-cols-4 gap-2" divider>
            <div>County or region</div>
            <div>United States</div>
            <div className="flex justify-between col-span-2">
              <div>Your country and region are used for privacy settings</div>
              <NavigateNextIcon />
            </div>
          </ListItemButton>
          <ListItemButton className="!grid grid-cols-4 gap-2" divider>
            <div>Language</div>
            <div>English (United States)</div>
            <div className="flex justify-end col-span-2">
              <NavigateNextIcon />
            </div>
          </ListItemButton>
          <ListItem>Related Billing & shipping address</ListItem>
        </List>
      </Paper>
      <Paper>
        <List
          aria-labelledby="account-header"
          disablePadding
          subheader={
            <ListSubheader component="div" id="account-header">
              Account Info
            </ListSubheader>
          }
        >
          <Divider />
          <ListItemButton className="!grid grid-cols-4 gap-2" divider>
            <div>Email address</div>
            <div>{data.email}</div>
            <div className="flex justify-between col-span-2">
              <span>Primary</span>
              <NavigateNextIcon />
            </div>
          </ListItemButton>
          <ListItemButton className="!grid grid-cols-4 gap-2" divider>
            <div>Phone number</div>
            <div>None</div>
            <div className="col-span-2">
              Your phone number is used to sign in to your Microsoft account
            </div>
          </ListItemButton>
          <ListItem className="gap-6">
            <div>Sign-in preferences</div>
            <div>Link your phone to your PC</div>
            <div>Close account</div>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export const Route = createFileRoute('/user/')({
  component: memo(AccountInfo),
});
