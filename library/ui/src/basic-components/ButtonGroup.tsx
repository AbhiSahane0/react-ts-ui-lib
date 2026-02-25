//!#Imports: start
import React from "react";
import { getBorderColor } from "../tools/colors";
import { getRadiusValue, type RadiusToken } from "../tools/radius";
import Button from "./Button";
import type { ButtonProps } from "./Button";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
const Css = {
  wrapper: (
    removeDefaultStyle?: boolean,
    direction: "row" | "column" = "row",
    gap?: string,
  ): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    return {
      display: "flex",
      flexDirection: direction,
      gap: gap ?? "0.5rem",
      flexWrap: "wrap",
      alignItems: "center",
    };
  },

  itemWrapper: (removeDefaultStyle?: boolean): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }
    return {
      display: "inline-flex",
    };
  },

  segmentedWrapper: (
    removeDefaultStyle?: boolean,
    darkMode = true,
    borderRadius?: number,
  ): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    const borderColor = getBorderColor(darkMode);

    return {
      display: "inline-flex",
      border: `1px solid ${borderColor}`,
      borderRadius: borderRadius ?? 8,
      overflow: "hidden",
      gap: 0,
    };
  },

  segmentedItem: (removeDefaultStyle?: boolean): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }
    return {
      borderRadius: 0,
    };
  },
};
//!#Styles: end

//!#helpers: start
function isButtonItem(
  item: ButtonGroupItem,
): item is ButtonGroupItemButton {
  return !("component" in item) || item.component == null;
}
//!#helpers: end

//!#propTypes: start
/** Item as Button props – same API as Button component */
export type ButtonGroupItemButton = ButtonProps & { key?: React.Key };

/** Item as custom component – user provides their own element */
export type ButtonGroupItemCustom = {
  component: React.ReactNode;
  key?: React.Key;
};

/** Single item: either Button props or custom component */
export type ButtonGroupItem = ButtonGroupItemButton | ButtonGroupItemCustom;

export type ButtonGroupProps = {
  itemList: ButtonGroupItem[];
  direction?: "row" | "column";
  gap?: string;
  variant?: "default" | "segmented";
  borderRadius?: RadiusToken;
  style?: React.CSSProperties;
  noPrint?: boolean;
  hidden?: boolean;
  removeDefaultStyle?: boolean;
  darkMode?: boolean;
};

// Const array for runtime prop extraction in Documentation
export const BUTTON_GROUP_PROP_NAMES = [
  "itemList",
  "direction",
  "gap",
  "variant",
  "borderRadius",
  "style",
  "noPrint",
  "hidden",
  "removeDefaultStyle",
  "darkMode",
] as const;
//!#propTypes: end

const ButtonGroup = ({
  itemList,
  direction = "row",
  gap,
  variant = "default",
  borderRadius = "md",
  style,
  noPrint = false,
  hidden = false,
  removeDefaultStyle = false,
  darkMode = true,
}: ButtonGroupProps) => {
  //!#visualComponent: start
  if (hidden) return null;

  const borderRadiusValue = getRadiusValue(borderRadius);
  const isSegmented = variant === "segmented";

  const containerStyle = isSegmented
    ? Css.segmentedWrapper(removeDefaultStyle, darkMode, borderRadiusValue)
    : Css.wrapper(removeDefaultStyle, direction, gap ?? (isSegmented ? "0" : "0.5rem"));

  const itemStyle = isSegmented ? Css.segmentedItem(removeDefaultStyle) : Css.itemWrapper(removeDefaultStyle);
  //!#render components: start
  return (
    <div
      className={noPrint ? "no-print" : undefined}
      style={{ ...containerStyle, ...style }}
      role="group"
    >
      {itemList.map((item, index) => {
        const key = "key" in item && item.key != null ? item.key : index;

        if (!isButtonItem(item)) {
          return (
            <div key={key} style={itemStyle}>
              {item.component}
            </div>
          );
        }

        // Omit key so it isn't spread onto Button (key is only for the list item wrapper)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- key intentionally excluded from buttonProps
        const { key: _key, ...buttonProps } = item;
        return (
          <div key={key} style={itemStyle}>
            <Button
              {...buttonProps}
              darkMode={darkMode}
              removeDefaultStyle={isSegmented ? false : buttonProps.removeDefaultStyle}
              borderRadius={
                isSegmented ? "xs" : (buttonProps.borderRadius ?? borderRadius)
              }
            />
          </div>
        );
      })}
    </div>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { ButtonGroup };
export default ButtonGroup;
//!#export: end
