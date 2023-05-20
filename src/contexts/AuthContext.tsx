import { User, onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase/firebaseConfig";

type AuthContextType = {
  currentUser: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const authContextCheck = useContext(AuthContext);

  if (!authContextCheck) {
    throw new Error("Something went wrong");
  }

  return authContextCheck;
};
type ContextProps = {
  children: ReactNode;
};

function AuthProvider({ children }: ContextProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ currentUser }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
