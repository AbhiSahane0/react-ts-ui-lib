//!#Imports: start
import { UnderConstruction } from "@react-ts-ui-lib/ui";
import { useTheme } from "./context/ThemeContext";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
//!#propTypes: end

const Table = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  //!#render components: start
  return <UnderConstruction darkMode={darkMode} />;
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { Table };
export default Table;
//!#export: end

