export default function Head({
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
}: {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content="https://ebener.com.br/favicon.png"/>
      <meta name="keywords" content={keywords.join(', ')} />
    </>
  );
}
