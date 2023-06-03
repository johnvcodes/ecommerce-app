import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";

type LoginState = {
  email: string;
  password: string;
};

type LoginAction =
  | {
      type: keyof LoginState;
      payload: string;
    }
  | { type: "clear" };

const loginInitialValue: LoginState = {
  email: "",
  password: "",
};

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "clear":
      return loginInitialValue;
    default:
      return state;
  }
};

function Login() {
  const navigate = useNavigate();
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    loginInitialValue
  );

  const handleLoginInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    return loginDispatch({ type: name as keyof LoginState, payload: value });
  };

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginState.email,
        loginState.password
      );
    } catch (error) {
      return getErrorMessage(error);
    }
    loginDispatch({ type: "clear" });
    return navigate("/");
  };

  return (
    <div className="flex grow items-center justify-center">
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2">
        <h2 className="self-center font-bold uppercase tracking-widest">
          Entrar
        </h2>
        <label htmlFor="email" className="w-fit font-bold">
          E-mail
        </label>
        <input
          onChange={handleLoginInput}
          value={loginState.email}
          type="email"
          name="email"
          id="email"
          placeholder="Ex: meu@email.com"
          required
          className="mb-2 flex items-center border border-slate-300 bg-slate-50 p-4 shadow outline-none transition-colors duration-300 placeholder:text-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus:border-slate-500"
        />
        <label htmlFor="password" className="w-fit font-bold">
          Senha
        </label>
        <input
          onChange={handleLoginInput}
          value={loginState.password}
          type="password"
          name="password"
          id="password"
          placeholder="Mínimo de 6 caractéres"
          required
          className="mb-2 flex items-center border border-slate-300 bg-slate-50 p-4 shadow outline-none transition-colors duration-300 placeholder:text-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus:border-slate-500"
        />
        <button
          type="submit"
          className="mb-2 flex items-center self-center bg-orange-200 px-4 py-2 font-bold uppercase text-slate-950 shadow transition-colors duration-300 hover:bg-orange-300"
        >
          Confirmar
        </button>
        <span className="flex items-center gap-1 self-center text-slate-500 dark:text-slate-400">
          Não possui uma conta?
          <Link
            to="/register"
            className="font-bold text-orange-200 transition-colors duration-300 after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-orange-300 after:transition-transform after:duration-300 hover:text-orange-300 hover:after:scale-x-100"
          >
            Criar
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
