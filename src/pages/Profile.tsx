import { useStore } from "../contexts/StoreContext";

function Profile() {
  const { currentUser } = useStore();

  return (
    <div className="flex grow items-center justify-center">
      <div className="grid gap-2 border border-slate-300 bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-medium uppercase">Perfil de Usuário</h2>
        <div className="border border-slate-300 p-2 dark:border-slate-700">
          <h2 className="font-medium uppercase">Nome de Usuário</h2>
          <span>{currentUser?.displayName}</span>
        </div>
        <div className="border border-slate-300 p-2 dark:border-slate-700">
          <h2 className="font-medium uppercase">E-mail</h2>
          <span>{currentUser?.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
