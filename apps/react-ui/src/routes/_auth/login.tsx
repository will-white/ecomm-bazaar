import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from '@tanstack/react-query';
import authService from '../../common/services/auth-service';
import { useCallback, useContext } from 'react';
import { UserContext } from '../../common/providers/user-provider';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const { setIdToken } = useContext(UserContext) ?? {};
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
      remember,
    }: {
      email: string;
      password: string;
      remember: boolean;
    }) => await authService.login(email, password, remember),
    onSuccess: (data) => {
      setIdToken && setIdToken(jwtDecode(data));
      void navigate({ to: '/' });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email')?.toString();
      const password = data.get('password')?.toString();
      const remember = data.get('remember') === 'remember';

      if (typeof email === 'string' && typeof password === 'string')
        mutate({ email, password, remember });
    },
    [mutate],
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            fullWidth
            id="email"
            inputProps={{ minLength: 1 }}
            label="Email Address"
            margin="normal"
            name="email"
            required
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            inputProps={{ minLength: 1 }}
            label="Password"
            margin="normal"
            name="password"
            required
            type="password"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                id="remember"
                name="remember"
                value="remember"
              />
            }
            label="Remember me"
          />
          <Button
            disabled={isPending}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      {/* // TODO: Make this a shared component */}
      <Typography
        align="center"
        color="text.secondary"
        sx={{ mt: 8, mb: 4 }}
        variant="body2"
        // {...props}
      >
        {'Copyright © '}
        <Link color="inherit" href="#">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
};

export const Route = createFileRoute('/_auth/login')({
  component: Login,
});

export default Login;
