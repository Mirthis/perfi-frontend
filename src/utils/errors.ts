import { AuthError, ErrorType, ValidationError } from '../types/types';

export const isAuthErrror = (error: unknown): error is AuthError =>
  (error as AuthError)?.data?.type === ErrorType.AUTH_ERROR;

export const isValidationErrror = (error: unknown): error is ValidationError =>
  (error as ValidationError)?.data?.type === ErrorType.VALIDATION_ERROR;

export const isValidationError = () => {
  //
};
