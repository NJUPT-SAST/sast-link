import localFont from "next/font/local";

const SFMono = localFont({
  src: [
    {
      path: "./SF-Mono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SF-Mono-Regular.otf",
      weight: "600",
      style: "normal",
    },
  ],
  preload: true,
  variable: "--SF-Mono",
});

export { SFMono };
