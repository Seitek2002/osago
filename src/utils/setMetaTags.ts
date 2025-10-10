type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

type MetaLink = {
  rel: string;
  href: string;
  hreflang?: string;
};

type MetaScript = {
  type: string;
  textContent: string;
};

export function setMetaTags({
  title,
  metaTags,
  links,
  scripts,
  htmlLang,
}: {
  title: string;
  metaTags: MetaTag[];
  links?: MetaLink[];
  scripts?: MetaScript[];
  htmlLang?: string;
}) {
  if (typeof document === "undefined") return;

  // Set html lang for better i18n/SEO
  if (htmlLang) {
    const current = document.documentElement.getAttribute("lang");
    if (current !== htmlLang) {
      document.documentElement.setAttribute("lang", htmlLang);
    }
  }

  // Set title
  if (document.title !== title) {
    document.title = title;
  }

  // Remove old dynamic tags
  const oldMeta = document.head.querySelectorAll('meta[data-dynamic-meta="true"]');
  oldMeta.forEach((tag) => tag.parentNode?.removeChild(tag));

  const oldLinks = document.head.querySelectorAll('link[data-dynamic-meta="true"]');
  oldLinks.forEach((tag) => tag.parentNode?.removeChild(tag));

  const oldScripts = document.head.querySelectorAll('script[data-dynamic-meta="true"]');
  oldScripts.forEach((tag) => tag.parentNode?.removeChild(tag));

  // Add new meta tags
  metaTags.forEach((tag) => {
    const meta = document.createElement("meta");
    if (tag.name) meta.setAttribute("name", tag.name);
    if (tag.property) meta.setAttribute("property", tag.property);
    meta.setAttribute("content", tag.content);
    meta.setAttribute("data-dynamic-meta", "true");
    document.head.appendChild(meta);
  });

  // Add link tags (e.g., canonical, hreflang)
  links?.forEach((link) => {
    const el = document.createElement("link");
    el.setAttribute("rel", link.rel);
    el.setAttribute("href", link.href);
    if (link.hreflang) el.setAttribute("hreflang", link.hreflang);
    el.setAttribute("data-dynamic-meta", "true");
    document.head.appendChild(el);
  });

  // Add scripts (e.g., JSON-LD)
  scripts?.forEach((script) => {
    const el = document.createElement("script");
    el.type = script.type;
    el.textContent = script.textContent;
    el.setAttribute("data-dynamic-meta", "true");
    document.head.appendChild(el);
  });
}
