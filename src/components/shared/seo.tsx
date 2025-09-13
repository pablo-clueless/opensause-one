import { useRouter } from "next/router";
import Head from "next/head";

const APP_URL = "https://www.okunolasamson.dev";
const DEFAULT_OG_IMAGE = "/meta/screenshot.jpg";

interface SeoProps {
  readonly title?: string;
  readonly description?: string;
  readonly siteName?: string;
  readonly canonical?: string;
  readonly ogImage?: string;
  readonly ogType?: string;
  readonly twitterHandle?: string;
  readonly noIndex?: boolean;
  readonly includeSiteName?: boolean;
}

export function Seo({
  title = "",
  description = "",
  siteName = "Samson Okunola",
  canonical = APP_URL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterHandle = "pablo_clueless",
  noIndex = false,
  includeSiteName = true,
}: SeoProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <Head>
      <>
        <title>{`${title ? title : ""} ${includeSiteName ? `| ${siteName}` : ""}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="" />
        <meta name="author" content="Samson Okunola" />
        <link rel="canonical" href="https://www.okunolasamson.dev" />

        <meta key="og_type" property="og:type" content={ogType} />
        <meta key="og_title" property="og:title" content={title} />
        <meta key="og_description" property="og:description" content={description} />
        <meta key="og_locale" property="og:locale" content="en_IE" />
        <meta key="og_site_name" property="og:site_name" content={siteName} />
        <meta key="og_url" property="og:url" content={canonical ?? APP_URL} />
        <meta key="og_site_name" property="og:site_name" content={siteName} />
        <meta key="og_image" property="og:image" content={ogImage ?? DEFAULT_OG_IMAGE} />
        <meta key="og_image:alt" property="og:image:alt" content={`${title} | ${siteName}`} />
        <meta key="og_image:width" property="og:image:width" content="1200" />
        <meta key="og_image:height" property="og:image:height" content="630" />

        <meta name="robots" content="index,follow" />
        <meta name="apple-mobile-web-app-title" content="Samson Okunola" />
        <meta name="keywords" content="Samson Okunola" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="" name="theme-color" />
        <meta content="" name="msapplication-TileColor" />

        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content={twitterHandle} />
        <meta key="twitter:creator" name="twitter:creator" content={twitterHandle} />
        <meta key="twitter:title" property="twitter:title" content={title} />
        <meta key="twitter:description" property="twitter:description" content={description} />
        <meta key="twitter:domain" name="twitter:domain" content={APP_URL} />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          type="image/png"
          href="/meta/apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />

        {noIndex && <meta name="robots" content="noindex,follow" />}
        {isHome && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                ${JSON.stringify({
                  "@context": "http://schema.org",
                  "@type": "WebApplication",
                  name: "Samson Okunola",
                  url: "https://www.okunolasamson.dev",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Any",
                  description,
                  features: "",
                  keywords: "",
                  screenshot: "https://www.www.okunolasamson.dev/meta/screenshot.jpg",
                  creator: {
                    "@type": "Organization",
                    name: "Samson Okunola",
                    url: "https://www.okunolasamson.dev",
                  },
                })}
                `,
            }}
          />
        )}
      </>

      <link rel="canonical" href={canonical ?? APP_URL} />
    </Head>
  );
}
