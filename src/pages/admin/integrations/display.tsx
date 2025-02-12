import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
  apiKey: string;
  classes?: string;
}
export function Display({ apiKey, classes = "" }: Props) {
  const [keyShown, showKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={classes}>
      <div className="flex space-x-2">
        <input
          type={keyShown ? "text" : "password"}
          value={apiKey}
          readOnly
          className="field-input font-mono"
        />
        <button
          type="button"
          onClick={() => showKey(!keyShown)}
          className="p-2 btn-outline"
          aria-label={keyShown ? "Hide API Key" : "Show API Key"}
        >
          {keyShown ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="p-2 rounded btn-outline"
          aria-label="Copy API Key"
        >
          {copied ? (
            <Check size={16} className="text-green" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
    </div>
  );
}
