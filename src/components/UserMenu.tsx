import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";

function UserMenu() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);

  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const handleShowUserMenu = () => setShowUserMenu(!showUserMenu);

  const handleClickOut = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return getErrorMessage(error);
    }
    return navigate("/");
  };

  return (
    <div ref={menuRef} className="relative flex items-center">
      <button
        onClick={handleShowUserMenu}
        type="button"
        className="rounded-full"
      >
        <UserCircleIcon className="h-8 w-8" />
      </button>
      {showUserMenu && (
        <div className="absolute right-0 top-[calc(100%_+_0.5rem)] flex min-w-[7.5rem] flex-col rounded-b border-x border-b border-neutral-300 bg-neutral-100 py-1 dark:border-neutral-700 dark:bg-neutral-950">
          {!currentUser ? (
            <>
              <Link
                onClick={handleShowUserMenu}
                to="/login"
                className="px-2 py-1 transition-colors duration-300 hover:bg-blue-700"
              >
                Entrar
              </Link>
              <Link
                onClick={handleShowUserMenu}
                to="/register"
                className="px-2 py-1 transition-colors duration-300 hover:bg-blue-700"
              >
                Criar Conta
              </Link>
            </>
          ) : (
            <button onClick={handleSignOut} type="button">
              Sair
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMenu;
