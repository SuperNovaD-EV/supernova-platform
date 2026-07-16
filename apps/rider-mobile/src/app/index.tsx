import { MobileShell } from "@supernova/ui-mobile";
import { t } from "@supernova/localization";

export default function Page() {
  return (
    <MobileShell
      locale="en"
      title={t("en", "riderShell")}
      subtitle={t("en", "foundation")}
    />
  );
}
