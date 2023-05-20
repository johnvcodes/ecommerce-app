import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";

type RegisterState = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterAction =
  | {
      type: keyof RegisterState;
      payload: string;
    }
  | { type: "clear" };

const registerInitialValue = {
  email: "",
  password: "",
  confirmPassword: "",
};

const registerReducer = (
  state: RegisterState,
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
    case "clear":
      return registerInitialValue;
    default:
      return state;
  }
};

function Register() {
  const navigate = useNavigate();
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    registerInitialValue
  );

  const [registerError, setRegisterError] = useState<string>("");

  const handleRegisterInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    return registerDispatch({
      type: name as keyof RegisterState,
      payload: value,
    });
  };

  const handleRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (registerState.email.length <= 0 || !registerState.email.includes("@")) {
      return setRegisterError("Por favor insira um e-mail válido");
    }
    if (registerState.password.length < 6)
      return setRegisterError("Senha deve conter mais que 6 caractéres");
    if (registerState.password !== registerState.confirmPassword)
      return setRegisterError("Senhas devem ser iguais");

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerState.email,
        registerState.password
      );
    } catch (error) {
      return setRegisterError(getErrorMessage(error));
    }
    registerDispatch({ type: "clear" });
    return navigate("/");
  };

  return (
    <form
      onSubmit={handleRegisterSubmit}
      className="m-auto flex min-w-[20rem] flex-col gap-2"
    >
      <h2 className="self-center font-bold uppercase tracking-widest">
        Crie sua conta
      </h2>
      {registerError && (
        <span className="w-fit rounded border border-red-500 bg-red-300 p-1">
          {registerError}
        </span>
      )}
      <label htmlFor="email" className="w-fit font-bold">
        E-mail
      </label>
      <input
        onChange={handleRegisterInput}
        value={registerState.email}
        type="email"
        name="email"
        id="email"
        placeholder="Ex: meu@email.com"
        className="mb-2 flex items-center rounded border border-neutral-300 bg-neutral-50 p-4 shadow outline-none transition-colors duration-300 placeholder:text-neutral-500 hover:border-neutral-500 focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-500 dark:focus:border-neutral-500"
      />
      <label htmlFor="password" className="w-fit font-bold">
        Senha
      </label>
      <input
        onChange={handleRegisterInput}
        value={registerState.password}
        type="password"
        name="password"
        id="password"
        placeholder="Mínimo de 6 caractéres"
        className="mb-2 flex items-center rounded border border-neutral-300 bg-neutral-50 p-4 shadow outline-none transition-colors duration-300 placeholder:text-neutral-500 hover:border-neutral-500 focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-500 dark:focus:border-neutral-500"
      />
      <label htmlFor="confirm-password" className="w-fit font-bold">
        Confirmar senha
      </label>
      <input
        onChange={handleRegisterInput}
        value={registerState.confirmPassword}
        type="password"
        name="confirmPassword"
        id="confirm-password"
        placeholder="Mínimo de 6 caractéres"
        className="mb-2 flex items-center rounded border border-neutral-300 bg-neutral-50 p-4 shadow outline-none transition-colors duration-300 placeholder:text-neutral-500 hover:border-neutral-500 focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-500 dark:focus:border-neutral-500"
      />
      <button
        type="submit"
        className="mb-2 flex items-center self-center rounded bg-blue-700 px-4 py-2 font-bold uppercase text-neutral-50 shadow transition-colors duration-300 hover:bg-blue-500"
      >
        Confirmar
      </button>
      <span className="flex items-center gap-1 self-center text-neutral-500 dark:text-neutral-400">
        Já possui uma conta?
        <Link
          to="/login"
          className="font-bold text-blue-700 transition-colors duration-300 after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:text-blue-500 hover:after:scale-x-100"
        >
          Entrar
        </Link>
      </span>
    </form>
  );
}

export default Register;
