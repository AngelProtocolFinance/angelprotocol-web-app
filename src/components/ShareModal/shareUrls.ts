const encodedUrl = "https%3A%2F%2Fwww.angelprotocol.io";

export const encodedText = `I%20just%20donated%20on%20%40AngelProtocol%21%20Every%20gift%20is%20invested%20to%20provide%20sustainable%20funding%20for%20non-profits%3A%20Give%20once%2C%20give%20forever.%20Please%20join%20me%20in%20providing%20charities%20with%20financial%20freedom%3A%0A${encodedUrl}`;

export const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?text=${encodedText}`;
export const LINKEDIN_SHARE_URL = `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
export const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
