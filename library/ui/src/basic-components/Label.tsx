//!#Imports: start
import React from "react";
import { getColorScheme, getBorderColor, type ColorScheme } from "../tools/colors";
import { getLabelSize, type LabelSizeToken } from "../tools/labelSize";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
const Css = {
  label: (
    removeDefaultStyle?: boolean,
    darkMode = true,
    sizeToken?: LabelSizeToken,
    colorScheme?: ColorScheme,
  ): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    const scheme = getColorScheme(colorScheme ?? "background", darkMode);
    const size = getLabelSize(sizeToken ?? "m");
    const isNeutral = colorScheme === "background" || colorScheme === "surface";
    const textColor = isNeutral ? scheme.textColor : scheme.color;

    return {
      fontFamily: "inherit",
      fontWeight: 600,
      color: textColor,
      fontSize: size.fontSize,
      lineHeight: size.lineHeight,
      margin: 0,
    };
  },
  blockWrapper: (darkMode = true): React.CSSProperties => {
    const borderColor = getBorderColor(darkMode);
    return {
      display: "block",
      width: "100%",
      border: `1px solid ${borderColor}`,
      padding: 8,
      boxSizing: "border-box",
    };
  },
};
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
export type LabelProps = {
  style?: React.CSSProperties;
  noPrint?: boolean;
  hidden?: boolean;
  removeDefaultStyle?: boolean;
  darkMode?: boolean;
  children?: React.ReactNode;
  size?: LabelSizeToken;
  colorScheme?: ColorScheme;
  tooltip?: string;
  block?: boolean;
};

// Const array for runtime prop extraction in Documentation
export const LABEL_PROP_NAMES = [
  "style",
  "noPrint",
  "hidden",
  "removeDefaultStyle",
  "darkMode",
  "children",
  "size",
  "colorScheme",
  "tooltip",
  "block",
] as const;
//!#propTypes: end

const Label = ({
  style,
  noPrint = false,
  hidden = false,
  removeDefaultStyle = false,
  darkMode = true,
  children,
  size = "m",
  colorScheme = "background",
  tooltip,
  block = false,
}: LabelProps) => {
  //!#visualComponent: start
  if (hidden) return null;

  const labelStyle = Css.label(removeDefaultStyle, darkMode, size, colorScheme);
  const span = (
    <span style={labelStyle}>
      {children}
    </span>
  );

  //!#render components: start
  if (block) {
    return (
      <div
        className={noPrint ? "no-print" : undefined}
        style={{ ...Css.blockWrapper(darkMode), ...style }}
        title={tooltip}
      >
        {span}
      </div>
    );
  }
  return (
    <span
      className={noPrint ? "no-print" : undefined}
      style={{ ...labelStyle, ...style }}
      title={tooltip}
    >
      {children}
    </span>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { Label };
export default Label;
//!#export: end
