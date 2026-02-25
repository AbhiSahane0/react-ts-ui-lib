//!#Imports: start
import { useState, useRef } from "react";
import { Block, Button, InfoGroup, ProfileCard, Popover, Badge, Number } from "@react-ts-ui-lib/ui";
import type { InfoGroupItem } from "@react-ts-ui-lib/ui";
import { useTranslation } from "../i18n/useTranslation";
import { useTheme } from "./context/ThemeContext";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
const getStyles = (): Record<string, React.CSSProperties> => ({
  container: { display: "flex", flexDirection: "column", gap: 24, margin: 12 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 },
  blockContent: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24 },
});
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
//!#propTypes: end

const ContentComponents = () => {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  const infoItems: InfoGroupItem[] = [
    { title: "Status", subtitle: <Badge label="Active" colorScheme="success" /> },
    { title: "Count", subtitle: <Number value={42} /> },
  ];
  //!#render components: start
  return (
    <div style={styles.container}>
      <Block header={t("contentComponentsPage.title")} card="full" darkMode={darkMode}>
        <p style={{ marginBottom: 24 }}>{t("contentComponentsPage.description")}</p>
        <p style={{ marginBottom: 24 }}>{t("contentComponentsPage.instructions")}</p>
      </Block>
      
      <div style={styles.grid}>
        <Block card="full" darkMode={darkMode} header={t("contentComponentsPage.components.infoGroup")}>
          <InfoGroup itemList={infoItems} direction="horizontal" darkMode={darkMode} />
        </Block>

        <Block card="full" darkMode={darkMode} header={t("contentComponentsPage.components.profileCard")}>
          <ProfileCard
            name="Jane Doe"
            role="Developer"
            darkMode={darkMode}
          />
        </Block>

        <Block card="full" darkMode={darkMode} header={t("contentComponentsPage.components.popover")}>
          <div ref={popoverTriggerRef} style={{ display: "inline-block" }}>
            <Button darkMode={darkMode} onClick={() => setPopoverOpen(true)}>
              {t("popover.examples.trigger")}
            </Button>
          </div>
          <Popover
            triggerRef={popoverTriggerRef}
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
            content={t("popover.examples.contentText")}
            darkMode={darkMode}
          />
        </Block>
      </div>
    </div>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export { ContentComponents };
export default ContentComponents;
//!#export: end
