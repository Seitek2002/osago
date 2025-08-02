type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

export function setMetaTags({
  title,
  metaTags,
}: {
  title: string;
  metaTags: MetaTag[];
}) {
  // Установить title
  if (document.title !== title) {
    document.title = title;
  }

  // Удалить старые динамические мета-теги (по специальному data-атрибуту)
  const oldTags = document.head.querySelectorAll('meta[data-dynamic-meta="true"]');
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));

  // Добавить новые мета-теги
  metaTags.forEach((tag) => {
    const meta = document.createElement('meta');
    if (tag.name) meta.setAttribute('name', tag.name);
    if (tag.property) meta.setAttribute('property', tag.property);
    meta.setAttribute('content', tag.content);
    meta.setAttribute('data-dynamic-meta', 'true');
    document.head.appendChild(meta);
  });
}
