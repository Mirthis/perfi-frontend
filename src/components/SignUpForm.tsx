/* eslint-disable react/jsx-props-no-spreading */
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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignUpData } from '../types/types';
import usersService from '../services/users';

const SignUpForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain at least one uppercase leetter, one Lowercase letter, one number and one Special character',
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  // TODO: handle error and success notifications, including duplicate email check
  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    console.log(data);
    const res = await usersService.signup(data);
    console.log(res);
  };

  return (
    <Container component="div" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          width="100%"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <TextField
            required
            fullWidth
            margin="normal"
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register('email')}
            error={errors.email !== undefined}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password')}
            error={errors.password !== undefined}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword !== undefined}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.confirmPassword?.message}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="acceptTerms"
                defaultValue="false"
                color="primary"
                {...register('acceptTerms')}
              />
            }
            label={
              <Typography>
                I agree to the
                <a href="/terms">terms and conditions</a>
              </Typography>
            }
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.acceptTerms?.message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signup" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
