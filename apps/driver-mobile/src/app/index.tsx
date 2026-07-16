import { MobileShell } from "@supernova/ui-mobile";
import { t } from "@supernova/localization";

export default function Page() {
  return (
    <MobileShell
      locale="ar"
      title={t("ar", "driverShell")}
      subtitle={t("ar", "foundation")}
    />
  );
}
