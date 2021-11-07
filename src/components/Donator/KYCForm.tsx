import { ErrorMessage, Field } from "formik";
import { useRef } from "react";

export default function KYCForm() {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className="grid grid-cols-5">
      <label className="col-span-5 lg:col-span-1 flex justify-left items-center lg:ml-3">
        Full Name
      </label>
      <div className="col-span-5 lg:col-span-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="text"
          name="fullName"
          placeholder="Full name"
        />
        <ErrorMessage
          name="fullName"
          component="div"
          className="lg:col-start-2 mb-2 text-sm text-white"
        />
      </div>

      <label className="col-span-5 lg:col-span-1 flex justify-left items-center lg:ml-3">
        Email
      </label>
      <div className="col-span-5 lg:col-span-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="email"
          name="email"
          placeholder="Email address"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="lg:col-start-2 mb-2 text-sm text-white"
        />
      </div>

      <label className="col-span-5 lg:col-span-1 flex justify-left items-center lg:ml-3">
        Address
      </label>
      <div className="col-span-5 lg:col-span-2 lg:mr-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="text"
          name="streetAddress"
          placeholder="Street & number"
        />
        <ErrorMessage
          name="streetAddress"
          component="div"
          className="lg:col-start-2 mb-2 text-sm text-white"
        />
      </div>
      <div className="col-span-5 lg:col-start-4 lg:col-span-2 lg:ml-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="text"
          name="addressComplement"
          placeholder="Apt., suite, etc. (optional)"
        />
      </div>

      <div className="col-span-5 lg:col-start-2 lg:col-span-2 lg:mr-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="text"
          name="city"
          placeholder="City or municipality"
        />
        <ErrorMessage
          name="city"
          component="div"
          className="lg:col-start-2 mb-2 text-sm text-white"
        />
      </div>
      <div className="col-span-5 lg:col-start-4 lg:col-span-2 lg:ml-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="text"
          name="zipCode"
          placeholder="ZIP code"
        />
        <ErrorMessage
          name="zipCode"
          component="div"
          className="lg:col-start-4 mb-2 text-sm text-white"
        />
      </div>

      <div className="col-span-5 lg:col-start-2 lg:col-span-2 lg:mr-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="text"
          name="stateAddress"
          placeholder="State, region or province"
        />
        <ErrorMessage
          name="stateAddress"
          component="div"
          className="lg:col-start-2 mb-2 text-sm text-white"
        />
      </div>
      <div className="col-span-5 lg:col-start-4 lg:col-span-2 lg:ml-4">
        <Field
          innerRef={inputRef}
          className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2"
          type="text"
          name="country"
          placeholder="Country"
        />
        <ErrorMessage
          name="country"
          component="div"
          className="lg:col-start-4 mb-2 text-sm text-white"
        />
      </div>
    </div>
  );
}
