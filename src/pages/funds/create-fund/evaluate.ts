import { gemini_api_key } from ".server/env";

interface IFundraiser {
  title: string;
  description: string;
}

interface IEvaluation {
  is_spam: boolean;
  confidence: number; // 0-100
  risk_factors: string[]; // specific issues found
  category?:
    | "drugs"
    | "advertisement"
    | "terrorism"
    | "fraud"
    | "adult"
    | "hate"
    | "other";
  explanation: string; // brief reason for decision
}

export const evaluate = async (
  fundraiser: IFundraiser
): Promise<IEvaluation> => {
  const prompt = `Evaluate this fundraiser for spam/inappropriate content:

FUNDRAISER:
Title: "${fundraiser.title}"
Description: "${fundraiser.description}"

Analyze for these spam indicators:
1. Drug sales/promotion
2. Product advertisements 
3. Terrorism/violence promotion
4. Scams/fraud
5. Adult content
6. Hate speech
7. Suspicious language patterns

interface SpamEvaluation {
  is_spam: boolean;
  confidence: number; // 0-100
  risk_factors: string[]; // specific issues found
  category?: 'drugs' | 'advertisement' | 'terrorism' | 'fraud' | 'adult' | 'hate' | 'other';
  explanation: string; // brief reason for decision
}

IMPORTANT: Your response must be ONLY a valid JSON object. Do not include any markdown formatting, code blocks, or backticks. Do not wrap the JSON in \`\`\`json or any other formatting. Return raw JSON only.

Example format:
{"is_spam": false, "confidence": 85, "risk_factors": [], "explanation": "Legitimate fundraiser request"}

Your response:`;

  const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent?key=${gemini_api_key}`;

  const request_data = {
    system_instruction: {
      parts: [
        {
          text: `
Your attributes:
profession: content moderation specialist
specialization: fundraising platforms, nonprofit sector
skills: spam detection, risk assessment, TypeScript, JSON

Guidelines:
- Be conservative: flag suspicious content for human review
- Consider context: legitimate fundraisers may mention sensitive topics appropriately
- Identify clear violations vs borderline cases

CRITICAL: You must respond with ONLY raw JSON. No markdown, no code blocks, no backticks, no explanation text. Just pure JSON matching the SpamEvaluation interface.`,
        },
      ],
    },
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1, // Lower temperature for consistent moderation decisions
    },
  };

  const response = await fetch(api_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request_data),
  });

  const data = await response.json();
  let response_text = data.candidates[0].content.parts[0].text;

  // Clean up response if it's wrapped in markdown code blocks
  response_text = response_text
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "");
  response_text = response_text.replace(/^```\s*/, "").replace(/\s*```$/, "");
  response_text = response_text.trim();

  return JSON.parse(response_text);
};
