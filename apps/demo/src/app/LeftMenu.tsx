//!#Imports: start
import React, { useMemo } from "react";
import { SideBar } from "@react-ts-ui-lib/ui";
import type { SideBarItem } from "@react-ts-ui-lib/ui";
import { getRouteList } from "../app/tools/RouteList";
import { useTranslation } from "../i18n/useTranslation";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
type LeftMenuPropTypes = {
  setSelectedItem: React.Dispatch<React.SetStateAction<SideBarItem | null>>;
  selectedItem: SideBarItem | null;
  darkMode?: boolean;
  mobileMode?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  navbarHeight?: number;
};
//!#propTypes: end

const LeftMenu = ({
  setSelectedItem,
  selectedItem,
  darkMode,
  mobileMode,
  isOpen,
  onClose,
  navbarHeight,
}: LeftMenuPropTypes) => {
  //!#visualComponent: start
  const { t } = useTranslation();
  const routeList = useMemo(() => getRouteList(t), [t]);

  const handleItemClick = (item: SideBarItem) => {
    const cleanItem: SideBarItem = {
      title: item.title,
      icon: item.icon,
      key: item.key,
      onClick: item.onClick,
      hidden: item.hidden,
      defaultExpandedItem: item.defaultExpandedItem,
    };
    setSelectedItem(cleanItem);
  };
  //!#render components: start
  return (
    <SideBar
      itemList={routeList}
      onItemClick={handleItemClick}
      darkMode={darkMode}
      selectedItem={selectedItem}
      mobileMode={mobileMode}
      isOpen={isOpen}
      onClose={onClose}
      navbarHeight={navbarHeight}
      sortNestedItems={true}
    />
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { LeftMenu };
export default LeftMenu;
//!#export: end
