import type { CollectionEntry } from 'astro:content';

export function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  limit = 3
): CollectionEntry<'blog'>[] {
  const currentTags = currentPost.data.tags || [];

  // Score each post by shared tags
  const scored = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const postTags = post.data.tags || [];
      const sharedTags = currentTags.filter(tag => postTags.includes(tag));
      return {
        post,
        score: sharedTags.length
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(item => item.post);
}
