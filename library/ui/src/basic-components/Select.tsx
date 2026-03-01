//!#Imports: start
import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { getColorScheme, getBorderColor } from "../tools/colors";
import { getRadiusValue, type RadiusToken } from "../tools/radius";
import Icon from "./Icon";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
const Css = {
  wrapper: (removeDefaultStyle?: boolean): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    return {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      position: "relative",
    };
  },

  selectTrigger: (
    removeDefaultStyle?: boolean,
    darkMode = true,
    focused?: boolean,
    borderRadiusValue?: number,
  ): React.CSSProperties => {
    if (removeDefaultStyle) {
      const borderColor = getBorderColor(darkMode);
      return {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        border: `1px solid ${borderColor}40`,
        borderRadius: "4px",
        padding: "0.25rem 0.5rem",
      };
    }

    const scheme = getColorScheme("background", darkMode);
    const borderColor = getBorderColor(darkMode);
    const primaryScheme = getColorScheme("primary", darkMode);

    return {
      minWidth: "10rem",
      padding: "0.5rem 0.75rem",
      border: `1px solid ${focused ? primaryScheme.color : borderColor}`,
      borderRadius: borderRadiusValue,
      fontSize: "1rem",
      fontFamily: "inherit",
      lineHeight: 1.5,
      outline: "none",
      transition: "border-color 160ms ease, box-shadow 160ms ease",
      boxShadow: focused ? `0 0 0 2px ${primaryScheme.color}40` : "none",
      backgroundColor: scheme.color,
      color: scheme.textColor,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      userSelect: "none",
    };
  },

  dropdownList: (
    darkMode = true,
    borderRadiusValue?: number,
    position?: { top: number; left: number; width: number },
  ): React.CSSProperties => {
    const scheme = getColorScheme("background", darkMode);
    const borderColor = getBorderColor(darkMode);
    const shadowColor = getColorScheme("shadow", darkMode).color;

    // Fixed: If the trigger is pill-shaped (full), the dropdown should still have a reasonable radius
    const dropdownRadius = (borderRadiusValue && borderRadiusValue > 12) ? 8 : borderRadiusValue;

    return {
      position: "fixed",
      top: position?.top ?? 0,
      left: position?.left ?? 0,
      minWidth: position?.width ?? "auto",
      width: "max-content",
      marginTop: "0.25rem",
      backgroundColor: scheme.color,
      border: `1px solid ${borderColor}`,
      borderRadius: dropdownRadius,
      boxShadow: `0 4px 12px ${shadowColor}`,
      zIndex: 9999,
      maxHeight: "15rem",
      overflowY: "auto",
      padding: "0.25rem 0",
    };
  },

  dropdownItem: (
    darkMode = true,
    isSelected?: boolean,
    isHovered?: boolean,
  ): React.CSSProperties => {
    const scheme = getColorScheme("background", darkMode);
    const primaryScheme = getColorScheme("primary", darkMode);

    return {
      padding: "0.5rem 0.75rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      backgroundColor: isSelected
        ? `${primaryScheme.color}20`
        : isHovered
          ? darkMode ? "#2a2a2a" : "#f0f0f0"
          : "transparent",
      color: isSelected ? primaryScheme.color : scheme.textColor,
      transition: "background-color 120ms ease",
      userSelect: "none",
      whiteSpace: "nowrap",
    };
  },
};
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
export type SelectItem = {
  value: string | number;
  label: React.ReactNode;
  icon?: string | React.ReactNode;
};

export type SelectProps = {
  style?: React.CSSProperties;
  noPrint?: boolean;
  hidden?: boolean;
  removeDefaultStyle?: boolean;
  darkMode?: boolean;
  itemList: SelectItem[];
  value?: string | number;
  borderRadius?: RadiusToken;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
  className?: string;
  iconLeft?: string | React.ReactNode;
};

// Const array for runtime prop extraction in Documentation
export const SELECT_PROP_NAMES = [
  "style",
  "noPrint",
  "hidden",
  "removeDefaultStyle",
  "darkMode",
  "itemList",
  "value",
  "onChange",
  "onFocus",
  "onBlur",
  "name",
  "id",
  "className",
  "borderRadius",
  "iconLeft",
] as const;
//!#propTypes: end

const Select = ({
  style,
  noPrint = false,
  hidden = false,
  removeDefaultStyle = false,
  darkMode = true,
  itemList,
  value = "",
  onChange,
  onFocus,
  onBlur,
  name,
  id,
  className,
  borderRadius = "none",
  iconLeft,
}: SelectProps) => {
  //!#visualComponent: start
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (hidden) return null;

  const borderRadiusValue = getRadiusValue(borderRadius);

  // Behavior: If no value is provided, select the first item, similar to a native <select>
  const selectedItem = (itemList && itemList.length > 0)
    ? (itemList.find((item) => String(item.value) === String(value)) || itemList[0])
    : undefined;

  const updatePosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const handleScrollOrResize = () => updatePosition();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  const handleSelect = (itemValue: string | number) => {
    if (selectRef.current) {
      // Logic to trigger real onChange on the hidden select for backward compatibility
      selectRef.current.value = String(itemValue);
      const event = new Event("change", { bubbles: true });
      selectRef.current.dispatchEvent(event);

      // Manual call to onChange if it's provided directly
      if (onChange) {
        const changeEvent = {
          target: selectRef.current,
          currentTarget: selectRef.current,
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        onChange(changeEvent);
      }
    }
    setIsOpen(false);
  };

  const renderIcon = (icon: string | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return <Icon icon={icon} size="sm" darkMode={darkMode} />;
    }
    return icon;
  };

  const dropdownElement = isOpen && dropdownPosition && typeof document !== "undefined"
    ? createPortal(
      <div
        ref={dropdownRef}
        className={noPrint ? "no-print" : undefined}
        style={Css.dropdownList(darkMode, borderRadiusValue, dropdownPosition)}
      >
        {itemList.map((item, index) => (
          <div
            key={String(item.value)}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(item.value);
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={Css.dropdownItem(
              darkMode,
              String(item.value) === String(selectedItem?.value),
              hoveredIndex === index
            )}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {renderIcon(item.icon || iconLeft)}
              <span>{item.label}</span>
            </div>
            {String(item.value) === String(selectedItem?.value) && (
              <Icon icon="mdi-check" size="sm" darkMode={darkMode} colorScheme="primary" />
            )}
          </div>
        ))}
      </div>,
      document.body
    )
    : null;

  //!#render components: start
  return (
    <div
      ref={containerRef}
      className={noPrint ? "no-print" : undefined}
      style={{ ...Css.wrapper(removeDefaultStyle), ...style }}
    >
      <div
        id={id}
        className={className}
        tabIndex={0}
        onFocus={(e) => {
          onFocus?.(e as unknown as React.FocusEvent<HTMLSelectElement>);
        }}
        onBlur={(e) => {
          onBlur?.(e as unknown as React.FocusEvent<HTMLSelectElement>);
        }}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
        style={Css.selectTrigger(removeDefaultStyle, darkMode, isOpen, borderRadiusValue)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
          {selectedItem ? renderIcon(selectedItem.icon || iconLeft) : renderIcon(iconLeft)}
          <span style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {selectedItem ? selectedItem.label : " "}
          </span>
        </div>
        <Icon icon="mdi-chevron-down" size="sm" darkMode={darkMode} style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 200ms ease",
          opacity: 0.7
        }} />
      </div>

      {dropdownElement}

      {/* Hidden native select for form compatibility */}
      <select
        ref={selectRef}
        name={name}
        value={String(value)}
        onChange={onChange}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        {itemList.map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {typeof item.label === "string" ? item.label : String(item.label)}
          </option>
        ))}
      </select>
    </div>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { Select };
export default Select;
//!#export: end
