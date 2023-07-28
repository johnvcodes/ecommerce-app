import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TUserCredentials } from "../@types/user";
import TextInput from "../components/TextInput";
import getAuthError from "../firebase/users/auth-errors";
import Divider from "../components/Divider";
import { auth } from "../firebase/config";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

type LoginState = Omit<TUserCredentials, "displayName">;

function Login() {
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginState>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginState> = async (data) => {
    const { email, password } = data;
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setAuthError(getAuthError(error));
    }
    reset();
    setAuthLoading(false);
  };

  return (
    <div className="container mx-auto flex grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <h2 className="text-center uppercase text-blue-500">Entrar</h2>
        <Divider />
        {authError && (
          <span className="text-center text-sm text-rose-500">{authError}</span>
        )}
        <TextInput
          {...register("email", {
            required: { value: true, message: "E-mail obrigatório" },
          })}
          type="email"
          id="email"
          name="email"
          label="E-mail"
          placeholder="Ex: meu@email.com"
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
        />

        <TextInput
          {...register("password", {
            required: { value: true, message: "Senha obrigatória" },
          })}
          type="password"
          id="password"
          name="password"
          label="Senha"
          placeholder="Mínimo de 6 caractéres"
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
        />
        <Button
          type="submit"
          disabled={authLoading}
          aria-disabled={authLoading}
        >
          {authLoading ? <Spinner /> : "Confirmar"}
        </Button>
        <span className="flex items-center gap-1 self-center text-neutral-500">
          Não possui uma conta?
          <Link
            to="/register"
            className="relative flex items-center text-blue-500 outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 after:absolute after:bottom-0 after:h-[0.0625rem] after:w-full after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:after:scale-x-100 focus:after:scale-x-100"
          >
            Criar
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
