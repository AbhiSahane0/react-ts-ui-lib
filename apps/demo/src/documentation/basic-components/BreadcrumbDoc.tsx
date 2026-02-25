//!#Imports: start
import { Documentation, BREADCRUMB_PROP_NAMES, Breadcrumb } from "@react-ts-ui-lib/ui";
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

const BREADCRUMB_EXAMPLE_CODE = `<Breadcrumb fromUrl={true} basePath="/" />`;

const BreadcrumbDoc = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const propTypesList = getPropsWithTranslations(
    "breadcrumb",
    BREADCRUMB_PROP_NAMES,
    t,
  );

  const pageTitle = t("breadcrumb.title");
  const description = t("breadcrumb.basicInfo.description");

  const componentList = [
    {
      category: t("breadcrumb.categories.basic"),
      itemList: [
        {
          label: t("breadcrumb.examples.basic"),
          components: (
            <Breadcrumb fromUrl={true} basePath="/" />
          ),
        },
      ],
    },
  ];
  //!#render components: start
  return (
    <div>
      <DocSeo title={pageTitle} description={description} />
      <Documentation
        state="draft"
        title={pageTitle}
        basicInfo={{
          description,
          exampleCode: BREADCRUMB_EXAMPLE_CODE,
          preview: (
            <Breadcrumb fromUrl={true} basePath="/" />
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
export { BreadcrumbDoc };
export default BreadcrumbDoc;
//!#export: end

