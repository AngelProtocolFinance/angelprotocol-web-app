import { AlertCircle } from "lucide-react";
const imgSrc = "https://placehold.co/400x200";
export default function Component() {
  return (
    <div className="xl:container xl:mx-auto px-5">
      <div className="p-4 sm:p-6 border-b border-gray-l3">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-d1">
          Using the Better Giving - Zapier Integration
        </h1>
      </div>
      <div className="p-4 sm:p-6">
        <ol className="space-y-6 sm:space-y-8 list-none">
          {steps.map((step, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-l2 flex items-center justify-center text-blue-d1 font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-blue-d2">
                  {step.title}
                </h3>
                <div className="mt-2 text-gray-d1 font-body space-y-4">
                  {step.content}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 p-4 bg-blue-l5 border-l-4 border-blue rounded-r-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-d1">
                Questions? Need assistance?
              </h3>
              <p className="mt-1 text-sm text-blue-d2">
                If you need any additional support, please reach out to{" "}
                <a
                  href="mailto:support@better.giving"
                  className="text-blue hover:underline"
                >
                  support@better.giving
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    title: "Login to your Zapier Account",
    content: (
      <p>
        Don&apos;t have Zapier yet?{" "}
        <a
          href="https://zapier.com/sign-up/"
          className="text-blue hover:underline"
        >
          Create a new account
        </a>
        .
      </p>
    ),
  },
  {
    title: "Get your API key from Better Giving",
    content: (
      <>
        <p>
          <a href="https://better.giving" className="text-blue hover:underline">
            Go to your Better Giving NPO dashboard
          </a>{" "}
          and navigate to the API section to find your API key.
        </p>
        <div className="p-4 bg-amber-l5 border-l-4 border-amber rounded-r-lg">
          <h4 className="text-sm font-medium text-amber-d1">Important</h4>
          <p className="mt-1 text-sm text-amber">
            Keep your API key secure. Do not share it with anyone who
            shouldn&apos;t have access to your Better Giving account.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Create new Zap",
    content: (
      <>
        <p>From your Zapier dashboard, click on the Create Zap button:</p>
        <img
          src={imgSrc}
          alt="Create Zap button"
          width={400}
          height={200}
          className="mt-2 rounded-md w-full h-auto"
        />
      </>
    ),
  },
  {
    title: "Select the Trigger",
    content: (
      <>
        <p>Search for the Better Giving app and click on it.</p>
        <img
          src={imgSrc}
          alt="Select Trigger"
          width={400}
          height={200}
          className="mt-2 rounded-md w-full h-auto"
        />
        <p>We support the following trigger:</p>
        <ul className="list-disc list-inside ml-4">
          <li>New donation is made</li>
        </ul>
        <p>Select the trigger and press continue.</p>
        <p>To connect to Better Giving, click Sign in with API Key:</p>
        <img
          src={imgSrc}
          alt="Sign in with API Key"
          width={400}
          height={200}
          className="mt-2 rounded-md w-full h-auto"
        />
        <p>
          Enter the API key you obtained from your Better Giving NPO dashboard
          and click Yes, Continue.
        </p>
        <button className="mt-2 px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-d1 transition-colors w-full sm:w-auto">
          Continue
        </button>
        <p>Click Test trigger button.</p>
        <img
          src={imgSrc}
          alt="Test trigger button"
          width={400}
          height={200}
          className="mt-2 rounded-md w-full h-auto"
        />
        <p>When the trigger is tested successfully, press Continue.</p>
      </>
    ),
  },
];
