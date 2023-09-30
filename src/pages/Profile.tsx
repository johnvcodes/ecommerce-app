import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { userData } = useAuth();

  return (
    <div className="container mx-auto min-h-[calc(100vh_-_3.5rem)]">
      <div className="grid gap-4 p-4 md:px-0">
        <h2 className="text-xl font-extrabold uppercase leading-normal text-primary">
          Meu Perfil
        </h2>
        <hr className="" />
        <div>
          <div className="bg-neutral-50 p-2 dark:border-slate-700">
            <h2 className="uppercase">Nome de Usuário</h2>
            <span>{userData?.displayName}</span>
          </div>
          <div className="bg-neutral-50 p-2 dark:border-slate-700">
            <h2 className="uppercase">E-mail</h2>
            <span>{userData?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
