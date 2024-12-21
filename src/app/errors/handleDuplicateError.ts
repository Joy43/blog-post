import { TErrorSources, TGenericErrorResponse } from '../interface/error';

interface DuplicateError extends Error {
  code?: number; 
  keyValue?: Record<string, string>;
}

const handleDuplicateError = (err: DuplicateError): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate key error',
    errorSources,
  };
};

export default handleDuplicateError;
