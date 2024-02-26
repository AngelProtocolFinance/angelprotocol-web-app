import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FormValues } from "./types";
import Form from "./Form";
import { schema } from "./schema";

export default function Mailer({ classes = "" }) {
	const { state } = useLocation();
	const _state = state as { secret: string } | null;

	const methods = useForm<FormValues>({
		defaultValues: {
			recipient: { name: "", email: "" },
			message: { value: "" },
			secret: _state?.secret,
		},
		resolver: yupResolver(schema),
	});

	// if (!_state) {
	//   return <Navigate to={`../${routes.index}`} />;
	// }
	return (
		<FormProvider {...methods}>
			<Form classes={classes} />
		</FormProvider>
	);
}
