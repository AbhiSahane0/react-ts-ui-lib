/* eslint-disable react-refresh/only-export-components -- context file exports Provider and useAuth hook */
//!#Imports: start
import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, UserCredential } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "../../firebase/config";
//!#Imports: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
};
//!#propTypes: end

//!#Constants: start
const AuthContext = createContext<AuthContextType | undefined>(undefined);
//!#Constants: end

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase není nakonfigurován (.env.local chybí).");
    }

    setLoading(true);
    try {
      const { auth, googleProvider, signInWithPopup } = await getFirebaseAuth();
      const credential = await signInWithPopup(auth, googleProvider);
      setUser(credential.user);
      return credential;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured) return;
    setLoading(true);
    try {
      const { auth, signOut: firebaseSignOut } = await getFirebaseAuth();
      await firebaseSignOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  //!#render components: start
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  //!#render components: end
};

//!#export: start
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
//!#export: end
