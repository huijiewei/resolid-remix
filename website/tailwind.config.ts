import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

// noinspection JSUnusedGlobalSymbols
export default <Partial<Config>>{
  content: ["./src/**/*.{js,ts,tsx,mdx}"],
  theme: {},
  plugins: [typography],
};
