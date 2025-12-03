import { useEffect } from "react";

const SEO = ({
  title = "Mthunzi Trust - The Umbrella of Hope",
  description = "Mthunzi Trust is a youth-led organization dedicated to empowering communities in Malawi through education, entrepreneurship, environmental sustainability, and sexual and reproductive health rights (SRHR).",
  keywords = "Mthunzi Trust, youth empowerment, Malawi NGO, education, entrepreneurship, environmental sustainability, SRHR, community development, hope",
  author = "Mthunzi Trust",
  image = "/og-image.jpg",
  url = "https://www.mthunzitrust.org",
  type = "website",
  twitterCard = "summary_large_image",
}) => {
  useEffect(() => {
    const fullTitle = title.includes("Mthunzi Trust")
      ? title
      : `${title} | Mthunzi Trust`;

    document.title = fullTitle;

    const setMeta = (name, content, isProperty = false) => {
      let tag = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );

      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) tag.setAttribute("property", name);
        else tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    // Primary Meta Tags
    setMeta("title", fullTitle);
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", author);
    setMeta("robots", "index, follow");
    setMeta("language", "English");
    setMeta("revisit-after", "7 days");

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Open Graph Tags
    setMeta("og:type", type, true);
    setMeta("og:url", url, true);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:site_name", "Mthunzi Trust", true);
    setMeta("og:locale", "en_US", true);

    // Twitter Tags
    setMeta("twitter:card", twitterCard);
    setMeta("twitter:url", url);
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    // Theme Colors
    setMeta("theme-color", "#0d9488");
    setMeta("msapplication-TileColor", "#0d9488");
  }, [title, description, keywords, author, image, url, type, twitterCard]);

  return null;
};

export default SEO;
