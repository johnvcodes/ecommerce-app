import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { TUser } from "../@types/user";
import { auth } from "@libs/firebase/config";
import { getUser } from "@libs/firebase/firestore/users";

type TAuthContext = {
  currentUser: User | null;
  userData: TUser | null;
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
  const [currentUser, setCurrentUser] =
    useState<TAuthContext["currentUser"]>(null);
  const [userData, setUserData] = useState<TAuthContext["userData"]>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      currentUser,
      userData,
    }),
    [currentUser, userData],
  );

  async function getUserData(userUID: string) {
    try {
      const data = await getUser(userUID);
      setUserData(data);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid).catch((error) => {
        throw new Error(String(error));
      });
    } else {
      setUserData(null);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
