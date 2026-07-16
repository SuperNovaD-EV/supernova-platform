import { t } from "@supernova/localization";
import { ShellFrame } from "@supernova/ui-web";

export default function Page() {
  return (
    <ShellFrame
      locale="ar"
      eyebrow={t("ar", "direction")}
      title={t("ar", "marketingShell")}
    />
  );
}
