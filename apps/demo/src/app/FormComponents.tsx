//!#Imports: start
import { useState } from "react";
import { Block, Input, Checkbox, Date, Select, Radios } from "@react-ts-ui-lib/ui";
import type { SelectItem, RadiosItem } from "@react-ts-ui-lib/ui";
import { useTranslation } from "../i18n/useTranslation";
import { useTheme } from "./context/ThemeContext";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
const getStyles = (): Record<string, React.CSSProperties> => ({
  container: { display: "flex", flexDirection: "column", gap: 24, margin: 12 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 },
  blockContent: { display: "flex", flexDirection: "column", gap: 12, flexWrap: "wrap" },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24 },
});
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
//!#propTypes: end

const FormComponents = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles();
  const [selectValue, setSelectValue] = useState<string | number>("");
  const [radioValue, setRadioValue] = useState<string | number>("");
  const [dateValue, setDateValue] = useState("");

  const fruitOptions: SelectItem[] = [
    { value: "apple", label: t("select.examples.apple") },
    { value: "banana", label: t("select.examples.banana") },
    { value: "orange", label: t("select.examples.orange") },
  ];
  const radioOptions: RadiosItem[] = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
  ];
  //!#render components: start
  return (
    <div style={styles.container}>
      <Block header={t("formComponentsPage.title")} card="full" darkMode={darkMode}>
        <p style={{ marginBottom: 24 }}>{t("formComponentsPage.description")}</p>
        <p style={{ marginBottom: 24 }}>{t("formComponentsPage.instructions")}</p>
      </Block>

      <div style={styles.grid}>
        <Block card="full" darkMode={darkMode} header={t("formComponentsPage.components.input")}>
          <div style={styles.blockContent}>
            <Input placeholder={t("formComponentsPage.examples.placeholder")} />
            <Input placeholder={t("formComponentsPage.examples.primaryInput")} />
          </div>
        </Block>

        <Block card="full" darkMode={darkMode} header={t("formComponentsPage.components.checkbox")}>
          <div style={styles.blockContent}>
            <Checkbox label={t("formComponentsPage.examples.checkboxLabel")} darkMode={darkMode} />
            <Checkbox label={t("formComponentsPage.examples.checked")} value={true} darkMode={darkMode} />
          </div>
        </Block>

        <Block card="full" darkMode={darkMode} header={t("formComponentsPage.components.date")}>
          <div style={styles.blockContent}>
            <Date value={dateValue} onChange={(e) => setDateValue(e.target.value)} darkMode={darkMode} />
          </div>
        </Block>

        <Block card="full" darkMode={darkMode} header={t("formComponentsPage.components.select")}>
          <div style={styles.blockContent}>
            <Select
              itemList={fruitOptions}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              darkMode={darkMode}
            />
          </div>
        </Block>

        <Block card="full" darkMode={darkMode} header={t("formComponentsPage.components.radios")}>
          <div style={styles.blockContent}>
            <Radios
              name="form-overview-radios"
              itemList={radioOptions}
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
              direction="row"
              darkMode={darkMode}
            />
          </div>
        </Block>
      </div>
    </div>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { FormComponents };
export default FormComponents;
//!#export: end
