import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TUserCredentials } from "@/@types/user";
import Button from "@components/common/Button";
import Spinner from "@components/Spinner";
import TextInput from "@components/common/TextInput";
import Container from "@components/common/Container";
import loginUser from "@libs/firebase/authentication/login-user";
import getAuthError from "@libs/firebase/authentication/errors";

type TAccountLogin = Omit<TUserCredentials, "displayName">;

function AccountLogin() {
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TAccountLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TAccountLogin> = async (data) => {
    const { email, password } = data;
    setAuthLoading(true);
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      setAuthError(getAuthError(error));
    }
    reset();
    setAuthLoading(false);
  };

  return (
    <Container className="container mx-auto flex h-[calc(100vh_-_3.5rem)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="m-auto flex min-w-[20rem] flex-col gap-4"
      >
        <h2 className="text-center font-extrabold uppercase text-primary">
          Entrar
        </h2>
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
          aria-disabled={authLoading}
          disabled={authLoading}
          size="small"
          variant="tertiary"
          className="w-fit self-center"
        >
          {authLoading ? <Spinner /> : "Confirmar"}
        </Button>
        <span className="flex items-center gap-1 self-center text-neutral-500">
          Não possui uma conta?
          <Link
            to="/criar-conta"
            className="relative flex items-center text-primary outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 after:absolute after:bottom-0 after:h-[0.0625rem] after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 focus:after:scale-x-100"
          >
            Criar
          </Link>
        </span>
      </form>
    </Container>
  );
}

export default AccountLogin;
