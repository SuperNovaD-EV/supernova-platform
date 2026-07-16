import { ChartPreview } from "./chart-preview";
import { t } from "@supernova/localization";
import { ShellFrame } from "@supernova/ui-web";

export default function Page() {
  return (
    <ShellFrame
      locale="en"
      eyebrow="Development-only chart sample"
      title={t("en", "adminShell")}
    >
      <ChartPreview />
    </ShellFrame>
  );
}
