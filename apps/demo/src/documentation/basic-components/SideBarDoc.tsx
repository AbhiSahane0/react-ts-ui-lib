//!#Imports: start
import {
  Documentation,
  SIDEBAR_PROP_NAMES,
  SideBar as UiSideBar,
} from "@react-ts-ui-lib/ui";
import type { SideBarItem } from "@react-ts-ui-lib/ui";
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

const SIDEBAR_EXAMPLE_CODE = `<SideBar
  itemList={itemList}
  collapsed={collapsed}
  onItemClick={handleClick}
  darkMode={darkMode}
/>`;

const SideBarDoc = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const propTypesList = getPropsWithTranslations(
    "sidebar",
    SIDEBAR_PROP_NAMES,
    t,
  );

  const items: SideBarItem[] = [
    { title: t("sidebar.examples.dashboard"), icon: "mdi-view-dashboard" },
    {
      title: t("sidebar.examples.settings"),
      icon: "mdi-cog",
      itemList: [
        { title: t("sidebar.examples.profile"), icon: "mdi-account" },
        { title: t("sidebar.examples.security"), icon: "mdi-shield-lock" },
      ],
    },
  ];

  const componentList = [
    {
      category: t("sidebar.categories.basic"),
      itemList: [
        {
          label: t("sidebar.examples.default"),
          components: <UiSideBar itemList={items} />,
        },
        {
          label: t("sidebar.examples.light"),
          components: <UiSideBar itemList={items} darkMode={false} />,
        },
      ],
    },
    {
      category: t("sidebar.categories.styling"),
      itemList: [
        {
          label: t("sidebar.examples.raw"),
          components: <UiSideBar itemList={items} removeDefaultStyle />,
        },
      ],
    },
  ];
  //!#visualComponent: end

  const pageTitle = t("sidebar.title");
  const description = t("sidebar.basicInfo.description");

  //!#render components: start
  return (
    <div>
      <DocSeo title={pageTitle} description={description} />
      <Documentation
        state="draft"
        title={pageTitle}
        basicInfo={{
          description: t("sidebar.basicInfo.description"),
          exampleCode: SIDEBAR_EXAMPLE_CODE,
          preview: (
            <UiSideBar
              itemList={[
                { title: t("sidebar.examples.dashboard"), icon: "mdi-view-dashboard" },
                { title: t("sidebar.examples.settings"), icon: "mdi-cog" },
              ]}
              collapsed={false}
              darkMode={darkMode}
              onItemClick={() => {}}
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
export { SideBarDoc as SideBar };
export default SideBarDoc;
//!#export: end
