import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/config";
import getErrorMessage from "../utilities/get-error-message";
import IconButton from "./IconButton";
import Menu from "./Menu";

function ActionUser() {
  const navigate = useNavigate();

  const { userData } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClickOut = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  const handleSignOut = async () => {
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
    <div ref={menuRef} className="relative">
      <Menu
        isOpen={showMenu}
        setIsOpen={setShowMenu}
        aria-hidden={!showMenu}
        id="user-menu"
        handler={
          <IconButton
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Menu de usuário"
            aria-haspopup="true"
            aria-controls="user-menu"
            aria-expanded={showMenu}
            title="Menu de usuário"
            type="button"
          >
            <User aria-hidden />
          </IconButton>
        }
      >
        {!userData ? (
          <>
            <Link
              to=""
              className="p-2 transition-colors duration-300 hover:bg-neutral-200"
            >
              Entrar
            </Link>
            <Link
              to=""
              className="p-2 transition-colors duration-300 hover:bg-neutral-200"
            >
              Criar Conta
            </Link>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            type="button"
            className="p-2 transition-colors duration-300 hover:bg-neutral-200"
          >
            Sair
          </button>
        )}
      </Menu>
    </div>
  );
}

export default ActionUser;
