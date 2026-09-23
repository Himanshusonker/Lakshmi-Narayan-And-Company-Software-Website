import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.lakshminarayanandco.com";

const DEFAULT_IMAGE ="https://www.lakshminarayanandco.com/og-image.jpg";

const SEOAI = ({
  title,
  description,
  keywords = "",
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  schema = null,
}) => {
  const canonicalUrl = `${SITE_URL}${path}`;

  const defaultTitle =
    "Lakshmi Narayan And Company | AI, Software, Website & Digital Solutions";

  const finalTitle = title
    ? `${title} | Lakshmi Narayan And Company`
    : defaultTitle;

  const finalDescription =
    description ||
    "Lakshmi Narayan And Company provides AI development, software development, website development, automation, mobile apps and digital solutions.";

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{finalTitle}</title>

      <meta
        name="description"
        content={finalDescription}
      />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <meta
        name="author"
        content="Lakshmi Narayan And Company"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      {/* Canonical */}
      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:title"
        content={finalTitle}
      />

      <meta
        property="og:description"
        content={finalDescription}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:image:alt"
        content={finalTitle}
      />

      <meta
        property="og:site_name"
        content="Lakshmi Narayan And Company"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      {/* Twitter Card */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={finalTitle}
      />

      <meta
        name="twitter:description"
        content={finalDescription}
      />

      <meta
        name="twitter:image"
        content={image}
      />

      {/* Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOAI;