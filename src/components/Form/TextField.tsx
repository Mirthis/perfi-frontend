/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { TextFieldProps, TextField, Typography } from '@mui/material';

type TextProps = TextFieldProps & {
  errorMessage?: string | undefined;
};

const MyTextField = (props: TextProps) => {
  const { errorMessage } = props;
  const cleanProps = { ...props };
  delete cleanProps.errorMessage;

  return (
    <>
      <TextField
        {...cleanProps}
        // required
        fullWidth
        margin="normal"
        // type="password"
        // {...register('confirmPassword')}
        error={errorMessage !== undefined}
      />
      {errorMessage && (
        <Typography variant="inherit" color="textSecondary">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default MyTextField;
