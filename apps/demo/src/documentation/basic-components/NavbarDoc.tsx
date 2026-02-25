//!#Imports: start
import { useState } from "react";
import {
  Documentation,
  NAVBAR_PROP_NAMES,
  Navbar as UiNavbar,
  Icon,
  Button,
} from "@react-ts-ui-lib/ui";
import { useTranslation } from "../../i18n/useTranslation";
import { getPropsWithTranslations } from "../../i18n/getPropsWithTranslations";
import { useTheme } from "../../app/context/ThemeContext";
import DocSeo from "../../app/DocSeo";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
//!#propTypes: end

const NAVBAR_EXAMPLE_CODE = `<Navbar
  logo="Logo"
  rightContent={<Button label="Akce" />}
  darkMode={darkMode}
/>`;

const NavbarDoc = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const propTypesList = getPropsWithTranslations(
    "navbar",
    NAVBAR_PROP_NAMES,
    t,
  );
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const commonRight = (
    <>
      <Icon icon="mdi-bell" />
      <Icon icon="mdi-account" />
    </>
  );

  const componentList = [
    {
      category: t("navbar.categories.layout"),
      itemList: [
        {
          label: t("navbar.examples.logoString"),
          components: (
            <UiNavbar
              logo="LOGO"
              rightContent={commonRight}
              darkMode={darkMode}
            />
          ),
        },
        {
          label: t("navbar.examples.customLogo"),
          components: (
            <UiNavbar
              logo={<span style={{ fontWeight: 700 }}>MyApp</span>}
              centerContent={<Button label={t("navbar.examples.center")} />}
              rightContent={commonRight}
              darkMode={darkMode}
            />
          ),
        },
      ],
    },
    {
      category: t("navbar.categories.colorScheme"),
      itemList: [
        {
          label: t("navbar.examples.background"),
          components: <UiNavbar colorScheme="background" darkMode={darkMode} />,
        },
        {
          label: t("navbar.examples.surface"),
          components: <UiNavbar colorScheme="surface" darkMode={darkMode} />,
        },
      ],
    },
    {
      category: t("navbar.categories.darkMode"),
      itemList: [
        { label: t("navbar.examples.dark"), components: <UiNavbar darkMode /> },
        {
          label: t("navbar.examples.light"),
          components: <UiNavbar darkMode={false} />,
        },
      ],
    },
    {
      category: t("navbar.categories.styling"),
      itemList: [
        {
          label: t("navbar.examples.raw"),
          components: <UiNavbar removeDefaultStyle darkMode={darkMode} />,
        },
      ],
    },
    {
      category: t("navbar.categories.sticky"),
      itemList: [
        {
          label: t("navbar.examples.sticky"),
          components: (
            <div
              style={{
                height: 200,
                overflow: "auto",
                border: "1px solid #ccc",
                padding: 16,
              }}
            >
              <UiNavbar logo="Sticky Navbar" sticky darkMode={darkMode} />
              <div style={{ height: 400, padding: 16 }}>
                <p>Scroll down to see the navbar stick to the top</p>
                <p>Content here...</p>
                <p>More content...</p>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      category: t("navbar.categories.mobile"),
      itemList: [
        {
          label: t("navbar.examples.hamburger"),
          components: (
            <UiNavbar
              logo="MyApp"
              rightContent={commonRight}
              darkMode={darkMode}
              onHamburgerClick={() => setHamburgerOpen(!hamburgerOpen)}
              hamburgerOpen={hamburgerOpen}
              showHamburger={true}
            />
          ),
        },
      ],
    },
  ];
  //!#visualComponent: end

  const pageTitle = t("navbar.title");
  const description = t("navbar.basicInfo.description");

  //!#render components: start
  return (
    <div>
      <DocSeo title={pageTitle} description={description} />
      <Documentation
        state="draft"
        title={pageTitle}
        basicInfo={{
          description: t("navbar.basicInfo.description"),
          exampleCode: NAVBAR_EXAMPLE_CODE,
          preview: (
            <UiNavbar
              logo="Logo"
              rightContent={<Button label={t("button.examples.primary")} />}
              darkMode={darkMode}
            />
          ),
        }}
        basicInfoDescriptionHeader={t("documentation.basicInfo.descriptionHeader")}
        basicInfoPreviewHeader={t("documentation.basicInfo.previewHeader")}
        basicInfoCodeHeader={t("documentation.basicInfo.codeHeader")}
        propTypesList={propTypesList}
        componentList={componentList}
        propTypesTitle={t("documentation.propTypes.title")}
        propTypesNameLabel={t("documentation.propTypes.name")}
        propTypesDescriptionLabel={t("documentation.propTypes.description")}
        propTypesTypeLabel={t("documentation.propTypes.type")}
        propTypesRequiredLabel={t("documentation.propTypes.required")}
        propTypesYes={t("documentation.propTypes.yes")}
        propTypesNo={t("documentation.propTypes.no")}
        tabBasicInfoLabel={t("documentation.tabs.basicInfo")}
        tabExamplesLabel={t("documentation.tabs.examples")}
        tabUsageLabel={t("documentation.tabs.usage")}
        tabPropTypesLabel={t("documentation.tabs.propTypes")}
        darkMode={darkMode}
      />
    </div>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { NavbarDoc as Navbar };
export default NavbarDoc;
//!#export: end
