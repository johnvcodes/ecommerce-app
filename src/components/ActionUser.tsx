import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "@libs/firebase/config";
import getErrorMessage from "@utils/get-error-message";
import Button from "@components/common/Button";
import IconButton from "@components/common/IconButton";
import Menu from "@components/common/Menu";

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
      position="bottom-right"
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
          <User aria-hidden strokeWidth={1.5} />
        </IconButton>
      }
    >
      <div className="grid w-40 p-2">
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
