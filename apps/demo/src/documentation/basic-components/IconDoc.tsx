//!#Imports: start
import {
  Documentation,
  ICON_PROP_NAMES,
  Icon as UiIcon,
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

const ICON_EXAMPLE_CODE = `<Icon
  icon="mdi-check"
  size="md"
  darkMode={darkMode}
/>`;

const IconDoc = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const propTypesList = getPropsWithTranslations("icon", ICON_PROP_NAMES, t);

  const pageTitle = t("icon.title");
  const description = t("icon.basicInfo.description");

  const componentList = [
    {
      category: t("icon.categories.size"),
      itemList: [
        {
          label: t("icon.examples.xs"),
          components: <UiIcon icon="mdi-check" size="xs" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.sm"),
          components: <UiIcon icon="mdi-check" size="sm" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.md"),
          components: <UiIcon icon="mdi-check" size="md" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.lg"),
          components: <UiIcon icon="mdi-check" size="lg" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.xl"),
          components: <UiIcon icon="mdi-check" size="xl" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.custom"),
          components: <UiIcon icon="mdi-check" size={2} darkMode={darkMode} />,
        },
      ],
    },
    {
      category: t("icon.categories.sizeWithLabels"),
      itemList: [
        {
          label: t("icon.examples.sizeWithLabels"),
          components: (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <UiIcon
                icon="mdi-check"
                size="xs"
                label={`${t("icon.examples.labelForValue")} ${t("icon.examples.xs")}`}
                darkMode={darkMode}
              />
              <UiIcon
                icon="mdi-check"
                size="sm"
                label={`${t("icon.examples.labelForValue")} ${t("icon.examples.sm")}`}
                darkMode={darkMode}
              />
              <UiIcon
                icon="mdi-check"
                size="md"
                label={`${t("icon.examples.labelForValue")} ${t("icon.examples.md")}`}
                darkMode={darkMode}
              />
              <UiIcon
                icon="mdi-check"
                size="lg"
                label={`${t("icon.examples.labelForValue")} ${t("icon.examples.lg")}`}
                darkMode={darkMode}
              />
              <UiIcon
                icon="mdi-check"
                size="xl"
                label={`${t("icon.examples.labelForValue")} ${t("icon.examples.xl")}`}
                darkMode={darkMode}
              />
            </div>
          ),
        },
      ],
    },
    {
      category: t("icon.categories.basic"),
      itemList: [
        {
          label: t("icon.examples.default"),
          components: <UiIcon icon="mdi-check" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.label"),
          components: (
            <UiIcon
              icon="mdi-information"
              label={t("icon.examples.info")}
              darkMode={darkMode}
            />
          ),
        },
        {
          label: t("icon.examples.tooltip"),
          components: (
            <UiIcon
              icon="mdi-help-circle"
              tooltip={t("icon.examples.help")}
              darkMode={darkMode}
            />
          ),
        },
      ],
    },
    {
      category: t("icon.categories.colors"),
      itemList: [
        {
          label: t("icon.examples.primary"),
          components: (
            <UiIcon icon="mdi-information" colorScheme="primary" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.success"),
          components: (
            <UiIcon icon="mdi-check-circle" colorScheme="success" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.warning"),
          components: (
            <UiIcon icon="mdi-alert" colorScheme="warning" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.danger"),
          components: (
            <UiIcon icon="mdi-alert-circle" colorScheme="danger" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.infoColor"),
          components: (
            <UiIcon icon="mdi-information" colorScheme="info" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.purple"),
          components: (
            <UiIcon icon="mdi-star" colorScheme="purple" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.teal"),
          components: (
            <UiIcon icon="mdi-check-circle" colorScheme="teal" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.pink"),
          components: (
            <UiIcon icon="mdi-heart" colorScheme="pink" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.indigo"),
          components: (
            <UiIcon icon="mdi-star" colorScheme="indigo" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.orange"),
          components: (
            <UiIcon icon="mdi-alert" colorScheme="orange" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.cyan"),
          components: (
            <UiIcon icon="mdi-information" colorScheme="cyan" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.gold"),
          components: (
            <UiIcon icon="mdi-star" colorScheme="gold" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.silver"),
          components: (
            <UiIcon icon="mdi-star" colorScheme="silver" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.bronze"),
          components: (
            <UiIcon icon="mdi-star" colorScheme="bronze" darkMode={darkMode} />
          ),
        },
        {
          label: t("icon.examples.customColor"),
          components: (
            <UiIcon icon="mdi-heart" color="#ec4899" darkMode={darkMode} />
          ),
        },
      ],
    },
    {
      category: t("icon.categories.labels"),
      itemList: [
        {
          label: t("icon.examples.primaryLabel"),
          components: (
            <UiIcon
              icon="mdi-information"
              colorScheme="primary"
              label={t("icon.examples.primary")}
              darkMode={darkMode}
            />
          ),
        },
        {
          label: t("icon.examples.successLabel"),
          components: (
            <UiIcon
              icon="mdi-check-circle"
              colorScheme="success"
              label={t("icon.examples.success")}
              darkMode={darkMode}
            />
          ),
        },
      ],
    },
    {
      category: t("icon.categories.icons"),
      itemList: [
        {
          label: t("icon.examples.check"),
          components: <UiIcon icon="mdi-check" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.heart"),
          components: <UiIcon icon="mdi-heart" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.star"),
          components: <UiIcon icon="mdi-star" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.alert"),
          components: <UiIcon icon="mdi-alert" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.information"),
          components: <UiIcon icon="mdi-information" darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.close"),
          components: <UiIcon icon="mdi-close" darkMode={darkMode} />,
        },
      ],
    },
    {
      category: t("icon.categories.states"),
      itemList: [
        {
          label: t("icon.examples.onClick"),
          components: (
            <UiIcon
              icon="mdi-check"
              onClick={() => alert("Icon clicked!")}
              darkMode={darkMode}
            />
          ),
        },
        {
          label: t("icon.examples.hidden"),
          components: <UiIcon icon="mdi-check" hidden darkMode={darkMode} />,
        },
        {
          label: t("icon.examples.removeDefaultStyle"),
          components: (
            <UiIcon icon="mdi-check" removeDefaultStyle darkMode={darkMode} />
          ),
        },
      ],
    },
    {
      category: t("icon.categories.darkMode"),
      itemList: [
        {
          label: t("icon.examples.dark"),
          components: <UiIcon icon="mdi-check" darkMode />,
        },
        {
          label: t("icon.examples.light"),
          components: <UiIcon icon="mdi-check" darkMode={false} />,
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
          exampleCode: ICON_EXAMPLE_CODE,
          preview: (
            <UiIcon icon="mdi-check" size="md" darkMode={darkMode} />
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
export { IconDoc as Icon };
export default IconDoc;
//!#export: end
