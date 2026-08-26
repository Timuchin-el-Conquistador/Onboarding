export const PROVIDE_EMAIL = 'Please provide your email address.';
export const INCORRECT_CREDENTIALS = "Email or password is incorrect"


export const SERVER_ERROR_MESSAGES = {
  400: 'The information you entered is invalid.',
  401: 'Your email or password is incorrect.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource could not be found.',
  409: 'This information is already in use.',
  422: 'Please check the information you entered.',
  429: 'Too many requests. Please try again later.',
  500: 'Something went wrong on our side. Please try again.',
  503: 'The service is temporarily unavailable. Please try again later.',
} as const;