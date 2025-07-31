import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR" className="h-full w-full">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <main className="w-full">
          <Main />
          <NextScript />
        </main>
      </body>
    </Html>
  );
}
