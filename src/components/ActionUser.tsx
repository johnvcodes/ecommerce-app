import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { User } from "lucide-react";
import { auth } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import getErrorMessage from "../utilities/get-error-message";
import Button from "./Button";
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
        <div className="grid">
          {!userData ? (
            <>
              <Button
                component={Link}
                to="/entrar"
                variant="secondary"
                size="small"
              >
                Entrar
              </Button>
              <Button
                component={Link}
                to="/criar-conta"
                variant="secondary"
                size="small"
              >
                Criar Conta
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/perfil"
                variant="secondary"
                size="small"
              >
                Perfil
              </Button>
              <Button
                onClick={handleSignOut}
                type="button"
                variant="secondary"
                size="small"
              >
                Sair
              </Button>
            </>
          )}
        </div>
      </Menu>
    </div>
  );
}

export default ActionUser;
