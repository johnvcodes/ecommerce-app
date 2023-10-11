import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { IconUser } from "@tabler/icons-react";
import { auth } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import getErrorMessage from "../utilities/get-error-message";
import Button from "./Button";
import IconButton from "./IconButton";
import Menu from "./Menu";

function ActionUser() {
  const navigate = useNavigate();

  const { userData } = useAuth();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      getErrorMessage(error);
    }

    navigate("/");
  };

  return (
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
          <IconUser aria-hidden strokeWidth={1.5} />
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
  );
}

export default ActionUser;
