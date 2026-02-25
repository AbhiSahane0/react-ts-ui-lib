//!#Imports: start
import { Suspense } from "react";
import { Pending, NotFoundRoute, type SideBarItem } from "@react-ts-ui-lib/ui";
import componentMap from "./tools/ComponentMap";

//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
type ContentProps = {
  selectedItem: SideBarItem | null;
};
//!#propTypes: end

const Content = ({ selectedItem }: ContentProps) => {
  //!#visualComponent: start
  if (!selectedItem) {
    return <div>Select a component from the menu.</div>;
  }

  const mapKey = selectedItem.key || selectedItem.title;
  const Component = componentMap[mapKey];
  //!#render components: start
  return (
    <div>
      <Suspense fallback={<Pending />}>
        {Component ? (
          <Component />
        ) : (
          <NotFoundRoute />
        )}
      </Suspense>
    </div>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { Content };
export default Content;
//!#export: end
