import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, firestore } from "../firebase/config";
import { TUserCredentials } from "../@types/user";
import createUser from "../firebase/authentication/create-user";
import getAuthError from "../firebase/authentication/errors";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import TextInput from "../components/TextInput";

type RegisterValues = TUserCredentials & {
  confirmPassword: string;
};

function Register() {
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,

    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterValues>({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    setAuthLoading(true);
    try {
      await createUser(auth, firestore, data);
      navigate("/");
    } catch (error) {
      setAuthError(getAuthError(error));
    }
    reset();
    setAuthLoading(false);
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh_-_3.5rem)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="m-auto flex min-w-[20rem] flex-col gap-6 bg-neutral-50 p-4 shadow-sm"
      >
        <h2 className="text-center font-extrabold uppercase text-primary">
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
          disabled={authLoading}
          aria-disabled={authLoading}
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
    </div>
  );
}

export default Register;
