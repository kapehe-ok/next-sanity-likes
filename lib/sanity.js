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
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
  return data;
}

export async function getPostBySlug(slug) {
  const data = await client.fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
        ${postFields}
      }`,
    { slug }
  );
  return data[0];
}
