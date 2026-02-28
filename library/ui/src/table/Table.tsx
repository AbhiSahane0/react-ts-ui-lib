//!#Imports: start
import React from "react";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
const Css = {
  table: (): React.CSSProperties => ({
    width: "100%",
    borderCollapse: "collapse",
  }),
  th: (): React.CSSProperties => ({
    textAlign: "left",
    padding: "8px 12px",
    borderBottom: "1px solid #e5e7eb",
  }),
  td: (): React.CSSProperties => ({
    padding: "8px 12px",
    borderBottom: "1px solid #e5e7eb",
  }),
};
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
export type TableProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
//!#propTypes: end

const Table = ({ children, style }: TableProps) => {
  //!#visualComponent: start
  //!#render components: start
  return (
    <table style={{ ...Css.table(), ...style }}>
      {children ?? (
        <>
          <thead>
            <tr>
              <th style={Css.th()}>Column A</th>
              <th style={Css.th()}>Column B</th>
              <th style={Css.th()}>Column C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={Css.td()}>Cell 1</td>
              <td style={Css.td()}>Cell 2</td>
              <td style={Css.td()}>Cell 3</td>
            </tr>
            <tr>
              <td style={Css.td()}>Cell 4</td>
              <td style={Css.td()}>Cell 5</td>
              <td style={Css.td()}>Cell 6</td>
            </tr>
          </tbody>
        </>
      )}
    </table>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { Table };
export default Table;
//!#export: end
