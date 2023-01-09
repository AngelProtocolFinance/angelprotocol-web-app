import { useState } from "react";

export default function WidgetUrlGenerator() {
  const [hideText, setHideText] = useState(false);
  const [hideEndowmentGauges, setHideEndowmentGauges] = useState(false);
  const [hideAdvancedOptions, setHideAdvancedOptions] = useState(false);
  const [unfoldAdvancedOptions, setUnfoldAdvancedOptions] = useState(false);
  const [liquidPercentage, setLiquidPercentage] = useState(0);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);

  return <div>WidgetUrlConfigForm</div>;
}
