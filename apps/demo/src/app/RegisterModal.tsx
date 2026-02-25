//!#Imports: start
import { useState } from "react";
import { Modal, Button } from "@react-ts-ui-lib/ui";
import { useTranslation } from "../i18n/useTranslation";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
const Css = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 24,
    minWidth: 320,
  },
  errorText: {
    color: "#f85149",
    fontSize: 14,
    textAlign: "center" as const,
  },
  successText: {
    color: "#238636",
    fontSize: 14,
    textAlign: "center" as const,
  },
};
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
//!#propTypes: end

const RegisterModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const { signInWithGoogle, user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("auth.errorGeneric"));
      }
    } finally {
      setLoading(false);
    }
  };
  //!#render components: start
  return (
    <Modal 
      open={open} 
      onClose={onClose}
      header={t("auth.modalTitle")}
      size="sm"
      darkMode={darkMode}
    >
      <div style={Css.container}>
        {user ? (
          <div style={Css.successText}>
            {t("auth.welcome").replace(
              "{name}",
              user.displayName || user.email || t("auth.googleUser"),
            )}
          </div>
        ) : (
          <>
            <Button
              onClick={handleGoogleSignIn}
              icon="mdi-google"
              label={t("auth.googleButton")}
              colorScheme="primary"
              size="md"
              darkMode={darkMode}
              isPending={loading}
              disabled={loading}
            />

            {error && <div style={Css.errorText}>{error}</div>}

          </>
        )}
      </div>
    </Modal>
  );
  //!#render components: end

  //!#visualComponent: end

};

//!#export: start
export { RegisterModal };
export default RegisterModal;
//!#export: end
