import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ebenertkd.com.br";

  // List of static pages
  const staticRoutes = ["/", "/sobre", "/planos", "/contato", "/galeria"];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }));

  // If you had dynamic routes, for example for a blog:
  // const posts = await fetch(`${baseUrl}/api/posts`).then(res => res.json());
  // const postUrls = posts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }));

  return [...staticUrls];
}
