import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/config";
import getErrorMessage from "../utilities/get-error-message";

function UserMenu() {
  const navigate = useNavigate();

  const { currentUser, userData } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);

  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const handleShowUserMenu = () => setShowUserMenu(!showUserMenu);

  const handleClickOut = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowUserMenu(false);
    }
  };

  const handleSignOut = async () => {
    if (!currentUser) return;
    try {
      await signOut(auth);
    } catch (error) {
      getErrorMessage(error);
    }

    navigate("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  return (
    <div ref={menuRef} className="relative flex items-center">
      <button
        onClick={handleShowUserMenu}
        type="button"
        className="flex items-center rounded p-1 outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      >
        <UserIcon className="h-6 w-6" />
      </button>
      {showUserMenu && (
        <div className="absolute right-0 top-[calc(100%_+_0.25rem)] z-10 flex min-w-[7.5rem] flex-col justify-center divide-y divide-neutral-300 overflow-hidden rounded border border-neutral-300 bg-neutral-50 py-1 shadow dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-900">
          {!currentUser ? (
            <>
              <Link
                onClick={handleShowUserMenu}
                to="/login"
                className="p-1 text-center transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                Entrar
              </Link>
              <Link
                onClick={handleShowUserMenu}
                to="/register"
                className="p-1 text-center transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                Criar Conta
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="p-1 text-center transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                Perfil
              </Link>
              {userData?.role === "admin" && (
                <Link
                  to="/admin"
                  className="p-1 text-center transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                type="button"
                className="p-1 text-center transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMenu;
