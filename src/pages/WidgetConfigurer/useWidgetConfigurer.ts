import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useLazyProfileQuery } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";
import { idParamToNum } from "helpers";
import { FormValues } from "./WidgetUrlGenerator/schema";
import createWidgerUrl from "./createWidgerUrl";

const NO_ID_MESSAGE = "Please select an organization";

export default function useWidgetConfigurer() {
  const { id } = useParams<{ id: string }>();
  const endowId = idParamToNum(id);

  const [formValues, setFormValues] = useState<FormValues>({
    availableCurrencies: [],
    endowIdName: { id: endowId, name: "" },
    hideText: false,
    hideAdvancedOptions: false,
    unfoldAdvancedOptions: false,
    liquidPercentage: 0,
  });

  const methods = useForm<FormValues>({ defaultValues: formValues });

  const [widgetSnippet, setWidgetSnippet] = useState(
    getWidgetSnippet(formValues)
  );

  const { handleError } = useErrorContext();

  const [queryProfile] = useLazyProfileQuery();

  /**
   * some consumers can only store countryName:string
   * in this case, get flag for them when this component loads
   */
  useEffect(() => {
    (async () => {
      if (endowId === 0) {
        return;
      }

      try {
        const { data, isError, error } = await queryProfile(endowId);

        if (isError) {
          return handleError(error);
        }

        if (data) {
          methods.setValue("endowIdName.name", data.name);
          setFormValues((prev) => ({
            ...prev,
            endowIdName: { id: prev.endowIdName.id, name: data.name },
          }));
        }
      } catch (e) {
        handleError(e);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleUrlChange = useCallback(
    (updatedValues: FormValues) => {
      setFormValues(updatedValues);
      setWidgetSnippet(getWidgetSnippet(updatedValues));
    },
    [setFormValues]
  );

  return {
    formValues,
    methods,
    widgetSnippet,
    handleUrlChange,
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
