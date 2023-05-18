import { Link } from "react-router-dom";

function Register() {
  return (
    <form className="m-auto flex min-w-[20rem] flex-col gap-2">
      <h2 className="self-center font-bold uppercase tracking-widest">
        Crie sua conta
      </h2>
      <label
        htmlFor="email"
        className="w-fit font-bold uppercase tracking-widest"
      >
        E-mail
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Ex: meu@email.com"
        className="flex items-center rounded border border-neutral-300 bg-neutral-200 p-2"
      />
      <label
        htmlFor="password"
        className="w-fit font-bold uppercase tracking-widest"
      >
        Senha
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mínimo de 6 caractéres"
        className="flex items-center rounded border border-neutral-300 bg-neutral-200 p-2"
      />
      <label
        htmlFor="confirm-password"
        className="w-fit font-bold uppercase tracking-widest"
      >
        Confirmar senha
      </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirm-password"
        placeholder="Mínimo de 6 caractéres"
        className="flex items-center rounded border border-neutral-300 bg-neutral-200 p-2"
      />
      <button
        type="submit"
        className="flex items-center self-center rounded bg-blue-700 p-2 text-neutral-50 transition-colors duration-300 hover:bg-blue-500"
      >
        Confirmar
      </button>
      <span className="flex items-center gap-1 self-center text-neutral-500">
        Já possui uma conta?
        <Link to="/login" className="font-bold text-blue-700">
          Entrar
        </Link>
      </span>
    </form>
  );
}

export default Register;
