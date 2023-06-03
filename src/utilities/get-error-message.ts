import { FirebaseError } from "firebase/app";

const getErrorMessage = (error: unknown) => {
  let message: string;
  if (error instanceof FirebaseError) message = error.message;
  message = String(error);
  console.log(message);
  return message;
};

export default getErrorMessage;
