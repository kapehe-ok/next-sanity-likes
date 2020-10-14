import client from "../sanityClient";

const postFields = `
  _id,
  name,
  title,
  excerpt,
  'slug': slug.current,
  "likes": coalesce(likes, 0),
  body
`;

export async function getAllPostsWithSlug() {
  return await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
}

export async function getPostBySlug(slug) {
  const posts = await client.fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
        ${postFields}
      }`,
    { slug }
  );

  // get the first post since this call returns an array
  return posts[0];
}
