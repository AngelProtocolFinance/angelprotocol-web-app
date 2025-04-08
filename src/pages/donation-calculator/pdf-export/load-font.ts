import dmSansLatin400Italic from "@fontsource-variable/dm-sans/files/dm-sans-latin-400-italic.woff2";
import dmSansLatin400Normal from "@fontsource-variable/dm-sans/files/dm-sans-latin-400-normal.woff2";
import dmSansLatinExt400Italic from "@fontsource-variable/dm-sans/files/dm-sans-latin-ext-400-italic.woff2";
import dmSansLatinExt400Normal from "@fontsource-variable/dm-sans/files/dm-sans-latin-ext-400-normal.woff2";
import dmSansLatinExtOpszItalic from "@fontsource-variable/dm-sans/files/dm-sans-latin-ext-opsz-italic.woff2";
import dmSansLatinExtOpszNormal from "@fontsource-variable/dm-sans/files/dm-sans-latin-ext-opsz-normal.woff2";
import dmSansLatinExtWghtItalic from "@fontsource-variable/dm-sans/files/dm-sans-latin-ext-wght-italic.woff2";
import dmSansLatinExtWghtNormal from "@fontsource-variable/dm-sans/files/dm-sans-latin-ext-wght-normal.woff2";
import dmSansLatinWghtItalic from "@fontsource-variable/dm-sans/files/dm-sans-latin-wght-italic.woff2";
import dmSansLatinWghtNormal from "@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2";
import quicksandLatinExtWghtNormal from "@fontsource-variable/quicksand/files/quicksand-latin-ext-wght-normal.woff2";
import quicksandLatinWghtNormal from "@fontsource-variable/quicksand/files/quicksand-latin-wght-normal.woff2";
import quicksandVietnameseWghtNormal from "@fontsource-variable/quicksand/files/quicksand-vietnamese-wght-normal.woff2";
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "DM Sans",
  fonts: [
    {
      src: dmSansLatinExt400Normal,
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: dmSansLatinExt400Italic,
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: dmSansLatinExtOpszNormal,
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: dmSansLatinExtOpszItalic,
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: dmSansLatinExtWghtNormal,
      fontStyle: "normal",
      fontWeight: 700,
    },
    {
      src: dmSansLatinExtWghtItalic,
      fontStyle: "italic",
      fontWeight: 700,
    },
    {
      src: dmSansLatin400Normal,
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: dmSansLatin400Italic,
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: dmSansLatinWghtNormal,
      fontStyle: "normal",
      fontWeight: 700,
    },
    {
      src: dmSansLatinWghtItalic,
      fontStyle: "italic",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Quicksand",
  fonts: [
    {
      src: quicksandLatinExtWghtNormal,
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: quicksandLatinWghtNormal,
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: quicksandVietnameseWghtNormal,
      fontStyle: "normal",
      fontWeight: 400,
    },
  ],
});
