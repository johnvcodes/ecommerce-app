import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { UserIcon } from "@heroicons/react/24/solid";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebaseConfig";

import getErrorMessage from "../utilities/get-error-message";
import { useStore } from "../contexts/StoreContext";

function UserMenu() {
  const navigate = useNavigate();

  const { currentUser, isAdmin, cart } = useStore();

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
      await setDoc(doc(firestore, "carts", currentUser.uid), {
        cart,
      });
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
        className="p-1 transition-colors duration-300 hover:bg-slate-700"
      >
        <UserIcon className="h-6 w-6" />
      </button>
      {showUserMenu && (
        <div className="absolute right-0 top-[calc(100%_+_0.5rem)] z-10 flex min-w-[7.5rem] flex-col justify-center border-x border-b border-slate-700 bg-slate-900 shadow-sm">
          {!currentUser ? (
            <>
              <Link
                onClick={handleShowUserMenu}
                to="/login"
                className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
              >
                Entrar
              </Link>
              <Link
                onClick={handleShowUserMenu}
                to="/register"
                className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
              >
                Criar Conta
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
              >
                Perfil
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                type="button"
                className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
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
