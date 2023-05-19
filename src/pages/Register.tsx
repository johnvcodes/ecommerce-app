import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/firebaseConfig";

type RegisterState = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterAction = {
  type: keyof RegisterState | "clear";
  payload?: string;
};

const registerValue = {
  email: "",
  password: "",
  confirmPassword: "",
};

const registerReducer = (
  state: RegisterState,
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case "clear":
      return { ...state };
    case "email":
      if (!action.payload) return state;
      return { ...state, email: action.payload };
    case "password":
      if (!action.payload) return state;
      return { ...state, password: action.payload };
    case "confirmPassword":
      if (!action.payload) return state;
      return { ...state, confirmPassword: action.payload };

    default:
      return state;
  }
};

function Register() {
  const [{ email, password, confirmPassword }, registerDispatch] = useReducer(
    registerReducer,
    registerValue
  );

  const [registerError, setRegisterError] = useState<string>("");

  const handleRegisterInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    registerDispatch({
      type: name as keyof RegisterState,
      payload: value,
    });
  };

  const handleRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (email.length <= 0 || !email.includes("@")) {
      return setRegisterError("Por favor insira um e-mail válido");
    }
    if (password.length < 6)
      return setRegisterError("Senha deve conter mais que 6 caractéres");
    if (password !== confirmPassword)
      return setRegisterError("Senhas devem ser iguais");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError)
        return setRegisterError(error.message);
      return String(error);
    }
    return registerDispatch({ type: "clear" });
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
        value={email}
        type="email"
        name="email"
        id="email"
        placeholder="Ex: meu@email.com"
        className="mb-2 flex items-center rounded border border-neutral-300 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
      />
      <label htmlFor="password" className="w-fit font-bold">
        Senha
      </label>
      <input
        onChange={handleRegisterInput}
        value={password}
        type="password"
        name="password"
        id="password"
        placeholder="Mínimo de 6 caractéres"
        className="mb-2 flex items-center rounded border border-neutral-300 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
      />
      <label htmlFor="confirm-password" className="w-fit font-bold">
        Confirmar senha
      </label>
      <input
        onChange={handleRegisterInput}
        value={confirmPassword}
        type="password"
        name="confirmPassword"
        id="confirm-password"
        placeholder="Mínimo de 6 caractéres"
        className="mb-2 flex items-center rounded border border-neutral-300 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
      />
      <button
        type="submit"
        className="mb-2 flex items-center self-center rounded bg-blue-700 px-4 py-2 font-bold uppercase text-neutral-50 transition-colors duration-300 hover:bg-blue-500"
      >
        Confirmar
      </button>
      <span className="flex items-center gap-1 self-center text-neutral-500 dark:text-neutral-400">
        Já possui uma conta?
        <Link
          to="/login"
          className="font-bold text-blue-700 transition-colors duration-300 hover:text-blue-500"
        >
          Entrar
        </Link>
      </span>
    </form>
  );
}

export default Register;
