import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TUserCredentials } from "@/@types/user";
import createUser from "@libs/firebase/authentication/create-user";
import getAuthError from "@libs/firebase/authentication/errors";
import Button from "@components/common/Button";
import Spinner from "@components/Spinner";
import TextInput from "@components/common/TextInput";
import Container from "@components/common/Container";

type TAccountCreate = TUserCredentials & { confirmPassword: string };

function AccountCreate() {
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TAccountCreate>({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TAccountCreate> = async (data) => {
    setAuthLoading(true);
    try {
      await createUser(data);
      navigate("/");
    } catch (error) {
      setAuthError(getAuthError(error));
    }
    reset();
    setAuthLoading(false);
  };

  return (
    <Container className="flex min-h-[calc(100vh_-_3.5rem)] items-center justify-center gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-w-[20rem] flex-col gap-4"
      >
        <h2 className="text-center font-heading font-black uppercase text-primary">
          Crie sua conta
        </h2>
        {authError && (
          <span className="text-center text-sm text-rose-500">{authError}</span>
        )}
        <TextInput
          {...register("displayName", {
            required: {
              value: true,
              message: "Nome de usuário obrigatório",
            },
          })}
          type="text"
          id="displayName"
          name="displayName"
          label="Nome de usuário"
          placeholder="Ex: Usuário"
          error={!!errors.displayName}
          helperText={errors.displayName && errors.displayName.message}
        />
        <TextInput
          {...register("email", {
            required: { value: true, message: "E-mail obrigatório" },
          })}
          label="E-mail"
          type="email"
          name="email"
          id="email"
          placeholder="Ex: meu@email.com"
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
        />
        <TextInput
          {...register("password", {
            required: { value: true, message: "Senha obrigatória" },
            minLength: {
              value: 6,
              message: "Mínimo de 6 caractéres",
            },
            validate: {
              mustBeEqual: (field, formValues) => {
                return (
                  field === formValues.confirmPassword ||
                  "Senhas devem ser iguais"
                );
              },
            },
          })}
          type="password"
          label="Senha"
          name="password"
          id="password"
          placeholder="Mínimo de 6 caractéres"
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
        />
        <TextInput
          {...register("confirmPassword", {
            required: { value: true, message: "Senha obrigatória" },
            minLength: {
              value: 6,
              message: "Mínimo de 6 caractéres",
            },
            validate: {
              mustBeEqual: (field, formValues) => {
                return (
                  field === formValues.password || "Senhas devem ser iguais"
                );
              },
            },
          })}
          type="password"
          label="Confirmar Senha"
          name="confirmPassword"
          id="confirm-password"
          placeholder="Mínimo de 6 caractéres"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
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
          Já possui uma conta?
          <Link
            to="/entrar"
            className="relative flex items-center text-primary outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 after:absolute after:bottom-0 after:h-[0.0625rem] after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 focus:after:scale-x-100"
          >
            Entrar
          </Link>
        </span>
      </form>
    </Container>
  );
}

export default AccountCreate;
