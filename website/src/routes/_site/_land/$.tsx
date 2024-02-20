import { mergeMeta } from "@resolid/remix-utils";
import { ErrorComponent } from "~/components/ErrorComponent";

export const loader = async () => {
  throw new Response("Not Found", { status: 404 });
};

export const meta = mergeMeta(() => {
  return [
    {
      title: "页面未找到",
    },
  ];
});

export default function Catchall() {
  return null;
}

// noinspection JSUnusedGlobalSymbols
export const ErrorBoundary = () => {
  return <ErrorComponent />;
};
