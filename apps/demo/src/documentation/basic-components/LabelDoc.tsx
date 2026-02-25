//!#Imports: start
import { Documentation, LABEL_PROP_NAMES, Label } from "@react-ts-ui-lib/ui";
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

const LABEL_EXAMPLE_CODE = `<Label darkMode={darkMode}>
  Nadpis sekce
</Label>`;

const LabelDoc = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const propTypesList = getPropsWithTranslations("label", LABEL_PROP_NAMES, t);

  const pageTitle = t("label.title");
  const description = t("label.basicInfo.description");

  const componentList = [
    {
      category: t("label.categories.basic"),
      itemList: [
        {
          label: t("label.examples.basic"),
          components: (
            <Label darkMode={darkMode}>{t("label.examples.sampleText")}</Label>
          ),
        },
        {
          label: t("label.examples.withTooltip"),
          components: (
            <Label darkMode={darkMode} tooltip={t("label.examples.tooltipContent")}>
              {t("label.examples.sampleText")}
            </Label>
          ),
        },
      ],
    },
    {
      category: t("label.categories.sizes"),
      itemList: [
        { label: "xxs", components: <Label size="xxs" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "xs", components: <Label size="xs" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "s", components: <Label size="s" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "m", components: <Label size="m" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "l", components: <Label size="l" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "xl", components: <Label size="xl" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "xxl", components: <Label size="xxl" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
      ],
    },
    {
      category: t("label.categories.colorScheme"),
      itemList: [
        { label: "background", components: <Label colorScheme="background" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "primary", components: <Label colorScheme="primary" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "success", components: <Label colorScheme="success" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "danger", components: <Label colorScheme="danger" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
        { label: "muted", components: <Label colorScheme="muted" darkMode={darkMode}>{t("label.examples.sampleText")}</Label> },
      ],
    },
    {
      category: t("label.categories.styling"),
      itemList: [
        {
          label: t("label.examples.noDefault"),
          components: (
            <Label removeDefaultStyle darkMode={darkMode}>
              {t("label.examples.sampleText")}
            </Label>
          ),
        },
        {
          label: t("label.examples.block"),
          components: (
            <Label block darkMode={darkMode}>
              {t("label.examples.sampleText")}
            </Label>
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
        state="inProgress"
        title={pageTitle}
        basicInfo={{
          description,
          exampleCode: LABEL_EXAMPLE_CODE,
          preview: <Label darkMode={darkMode}>Nadpis sekce</Label>,
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
export { LabelDoc };
export default LabelDoc;
//!#export: end
