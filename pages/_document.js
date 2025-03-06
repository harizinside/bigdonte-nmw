import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <Script
          id="tracking-api-key"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.trackingApiKey = 'kx77nWao9fl0Wjc4CYsSONXYj3GBFtnpPOKGlB2n';
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://prahwa.net/tracking.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('Tracking script loaded successfully.');
          }}
          onError={(e) => {
            console.error('Error loading tracking script:', e);
          }}
        />
      </body>
    </Html>
  );
}
