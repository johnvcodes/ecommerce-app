import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

type TAuthContext = {
  currentUser: User | null;
  userRole: "user" | "admin";
};

const AuthContext = createContext<TAuthContext | null>(null);

const useAuth = () => {
  const authContextCheck = useContext(AuthContext);

  if (!authContextCheck) {
    throw new Error("Something went wrong");
  }

  return authContextCheck;
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      currentUser,
      userRole,
    }),
    [currentUser, userRole]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
