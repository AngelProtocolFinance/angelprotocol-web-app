import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { idParamToNum } from "helpers";
import createWidgerUrl from "./createWidgerUrl";
import { FormValues } from "./schema";
import useLoadDefaultEndowmentName from "./useLoadDefaultEndowmentName";

const NO_ID_MESSAGE = "Please select an organization";

export default function useWidgetConfigurer() {
  const { endowId: id } = useParams<{ endowId: string }>();
  const endowId = idParamToNum(id);

  const [updateTriggered, setUpdateTriggered] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      availableCurrencies: [],
      endowIdName: { id: endowId, name: "" },
      hideText: false,
      hideAdvancedOptions: false,
      unfoldAdvancedOptions: false,
      liquidPercentage: 0,
    },
  });

  const [widgetSnippet, setWidgetSnippet] = useState(
    getWidgetSnippet(methods.getValues())
  );

  useLoadDefaultEndowmentName(endowId, (name) =>
    methods.setValue("endowIdName.name", name)
  );

  const handleUpdateSnippet = useCallback((updatedValues: FormValues) => {
    setWidgetSnippet(getWidgetSnippet(updatedValues));
    setUpdateTriggered((prev) => !prev);
  }, []);

  return {
    updateTriggered,
    methods,
    widgetSnippet,
    handleUpdateSnippet,
  };
}

function getWidgetSnippet(formValues: FormValues) {
  if (!formValues.endowIdName.id) {
    return NO_ID_MESSAGE;
  } else {
    const widgetUrl = createWidgerUrl(formValues);
    return `<iframe src="${widgetUrl}" width="700" height="900" style="border: 0px;"></iframe>`;
  }
}
