import { Field } from "formik";
import { useRef } from "react";

export default function KYCForm() {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className="grid grid-cols-5">
      <label className="col-span-5 lg:col-span-1 flex justify-left items-center lg:ml-3">
        Full Name
      </label>
      <Field
        innerRef={inputRef}
        className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2 col-span-5 lg:col-span-4"
        type="text"
        name="fullName"
        placeholder="Full name"
      />
      <label className="col-span-5 lg:col-span-1 flex justify-left items-center lg:ml-3">
        Email
      </label>
      <Field
        innerRef={inputRef}
        className="my-2 border-transparent outline-none text-black w-full rounded-md px-2 py-2 col-span-5 lg:col-span-4"
        type="email"
        name="email"
        placeholder="Email address"
      />
      <label className="col-span-5 lg:col-span-1 flex justify-left items-center lg:ml-3">
        Address
      </label>
      <Field
        innerRef={inputRef}
        className="lg:mr-4 my-2 border-transparent outline-none text-black w-auto rounded-md px-2 py-2 col-span-5 lg:col-span-2"
        type="text"
        name="streetAddress"
        placeholder="Street & number"
      />
      <Field
        innerRef={inputRef}
        className="lg:ml-4 my-2 border-transparent outline-none text-black w-auto rounded-md px-2 py-2 col-span-5 lg:col-span-2"
        type="text"
        name="addressComplement"
        placeholder="Apt., suite, etc. (optional)"
      />
      <Field
        innerRef={inputRef}
        className="lg:col-start-2 lg:mr-4 my-2 border-transparent outline-none text-black w-auto rounded-md px-2 py-2 col-span-5 lg:col-span-2"
        type="text"
        name="zipCode"
        placeholder="Zip code"
      />
      <Field
        innerRef={inputRef}
        className="lg:col-start-4 lg:ml-4 my-2 border-transparent outline-none text-black w-auto rounded-md px-2 py-2 col-span-5 lg:col-span-2"
        type="text"
        name="city"
        placeholder="City"
      />
      <Field
        innerRef={inputRef}
        className="lg:col-start-2 lg:mr-4 my-2 border-transparent outline-none text-black w-auto rounded-md px-2 py-2 col-span-5 lg:col-span-2"
        type="text"
        name="stateAddress"
        placeholder="State"
      />
      <Field
        innerRef={inputRef}
        className="lg:col-start-4 lg:ml-4 my-2 border-transparent outline-none text-black w-auto rounded-md px-2 py-2 col-span-5 lg:col-span-2"
        type="text"
        name="country"
        placeholder="Country"
      />
    </div>
  );
}
