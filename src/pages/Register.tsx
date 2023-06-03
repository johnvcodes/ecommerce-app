import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";

type RegisterState = {
  username: string;
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

const registerInitialValue: RegisterState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const registerReducer = (
  state: RegisterState,
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
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
    if (registerState.password.length < 6)
      return setRegisterError("Senha deve ser maior que 6 caractéres");
    if (registerState.password !== registerState.confirmPassword)
      return setRegisterError("Senhas devem ser iguais");
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registerState.email,
        registerState.password
      );

      const updateUserProfile = await updateProfile(user, {
        displayName: registerState.username,
      });
      const addUserToDatabase = setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        userRole: user,
      });
      await Promise.all([updateUserProfile, addUserToDatabase]);
    } catch (error) {
      setRegisterError(getErrorMessage(error));
    }

    registerDispatch({ type: "clear" });
    return navigate("/");
  };

  return (
    <div className="flex grow items-center justify-center">
      <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-2">
        <h2 className="self-center font-bold uppercase tracking-widest">
          Crie sua conta
        </h2>
        {registerError && (
          <span className="w-fit border border-red-500 bg-red-300 p-1">
            {registerError}
          </span>
        )}

        <label htmlFor="username" className="w-fit font-bold">
          Nome de Usuário
        </label>
        <input
          onChange={handleRegisterInput}
          value={registerState.username}
          type="text"
          name="username"
          id="username"
          placeholder="Ex: Usuário"
          required
          className="mb-2 flex w-full items-center border border-slate-300 bg-slate-50 p-4 shadow-sm outline-none transition-colors duration-300 placeholder:text-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus:border-slate-500"
        />
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
          required
          className="mb-2 flex items-center border border-slate-300 bg-slate-50 p-4 shadow-sm outline-none transition-colors duration-300 placeholder:text-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus:border-slate-500"
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
          required
          className="mb-2 flex items-center border border-slate-300 bg-slate-50 p-4 shadow-sm outline-none transition-colors duration-300 placeholder:text-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus:border-slate-500"
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
          required
          className="mb-2 flex items-center border border-slate-300 bg-slate-50 p-4 shadow-sm outline-none transition-colors duration-300 placeholder:text-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus:border-slate-500"
        />
        <button
          type="submit"
          className="mb-2 flex items-center self-center bg-orange-200 px-4 py-2 font-bold uppercase text-slate-950 shadow-sm transition-colors duration-300 hover:bg-orange-300"
        >
          Confirmar
        </button>
        <span className="flex items-center gap-1 self-center pb-2 text-slate-500 dark:text-slate-400">
          Já possui uma conta?
          <Link
            to="/login"
            className="font-bold text-orange-200 transition-colors duration-300 after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-orange-300 after:transition-transform after:duration-300 hover:text-orange-300 hover:after:scale-x-100"
          >
            Entrar
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
