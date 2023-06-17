import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";
import styles from "./tailwind.css";
import webStyles from "~/styles/index.css";

export const meta: MetaFunction = () => {
  return {
    title: "Gramatika - Asisten Bahasa Indonesia dengan ejaan baku",
    description: "Gramatika - Asisten Bahasa Indonesia dengan ejaan baku di web, aplikasi dan ekstensi peramban",
    "twitter:card": "summary_large_image",
    "og:description": "Gramatika - Asisten Bahasa Indonesia dengan ejaan baku di web, aplikasi dan ekstensi peramban",
    "og:image": "gramatikaweb.png",
  };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }, { rel: 'stylesheet', href: webStyles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <link rel="stylesheet" href="css/general-sans.css" />
        <Links />
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
