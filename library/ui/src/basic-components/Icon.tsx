//!#Imports: start
import { Icon as MdiIcon } from "@mdi/react";
import * as mdiIcons from "@mdi/js";
import { getIconSize, type SizeToken } from "../tools/size";
import { getColorScheme, type ColorScheme } from "../tools/colors";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
export type IconProps = {
  icon?: string;
  size?: SizeToken | number;
  color?: string;
  colorScheme?: ColorScheme;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  removeDefaultStyle?: boolean;
  hidden?: boolean;
  label?: string;
  tooltip?: string;
  darkMode?: boolean;
};

// Const array for runtime prop extraction in Documentation
export const ICON_PROP_NAMES = [
  "icon",
  "size",
  "color",
  "colorScheme",
  "style",
  "onClick",
  "removeDefaultStyle",
  "hidden",
  "label",
  "tooltip",
  "darkMode",
] as const;
//!#propTypes: end

function Icon({
  icon = "mdi-close",
  size = "md",
  color,
  colorScheme,
  style,
  onClick,
  removeDefaultStyle = false,
  hidden = false,
  label = "",
  darkMode = true,
  tooltip,
}: IconProps) {
  //!#visualComponent: start
  if (hidden) return null;
  if (!icon) return null;

  const camelCaseName = icon.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const path = (mdiIcons as Record<string, string>)[camelCaseName];

  if (!path) {
    console.warn(`Icon "${icon}" not found!`);
    return null;
  }

  const iconSize =
    typeof size === "number" ? size : getIconSize(size as SizeToken).size;


  const schemeFromProp = colorScheme
    ? getColorScheme(colorScheme, darkMode)
    : null;
  const textScheme = getColorScheme("text", darkMode);
  const resolvedColor = color ?? schemeFromProp?.color ?? textScheme.color;
  //!#render components: start
  const baseStyle: React.CSSProperties = {
    cursor: onClick === undefined? "inherit" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  };

  return (
    <span
      onClick={onClick}
      title={tooltip}
      style={{ ...baseStyle, ...style }}
    >
      <MdiIcon
        path={path}
        size={iconSize}
        color={resolvedColor}
        style={removeDefaultStyle ? {} : { display: "flex" }}
      />
      {label && <span>{label}</span>}
    </span>
  );
  //!#render components: end
  //!#visualComponent: end
}

//!#export: start
export { Icon };
export default Icon;
//!#export: end
