import localFont from "next/font/local";

const SFMono = localFont({
  src: [
    {
      path: "./SFMono/SF-Mono-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./SFMono/SF-Mono-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./SFMono/SF-Mono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SFMono/SF-Mono-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./SFMono/SF-Mono-Medium.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./SFMono/SF-Mono-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./SFMono/SF-Mono-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./SFMono/SF-Mono-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },

    {
      path: "./SFMono/SF-Mono-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./SFMono/SF-Mono-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./SFMono/SF-Mono-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./SFMono/SF-Mono-HeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  preload: true,
  variable: "--SF-Mono",
});

export { SFMono };
