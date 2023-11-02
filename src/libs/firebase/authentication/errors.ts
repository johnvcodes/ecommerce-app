import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

function getAuthError(error: unknown) {
  let message = "";
  if (!(error instanceof FirebaseError)) {
    message = String(error);
  }
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case AuthErrorCodes.USER_DELETED:
        message = "Usuário não existe";
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        message = "Senha incorreta";
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        message = "E-mail já em uso";
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        message = "E-mail inválido";
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        message = "Senha muito fraca";
        break;
      default:
        message = "Algo deu errado";
        break;
    }
  }
  return message;
}

export default getAuthError;
