import { useState } from "react";
import { getAllPostsWithSlug, getPostBySlug } from "../lib/sanity";

export default function Post({ post }) {
  // increment the likes
  const [likes, setLikes] = useState(post.likes || 0);

  async function addLike() {
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({ _id: post._id }),
    });
    const data = await res.json();

    setLikes(data.likes);
  }

  return (
    <div>
      <button onClick={addLike}>Like</button>
      hi there: {post.slug} {likes}
    </div>
  );
}

// for each individual page, go get the data needed to render that 1 page
export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: { post },
  };
}

// tell next all the pages that it needs to generate
// so if we have 3 pages, we are going to give next the 3 slugs
export async function getStaticPaths() {
  // make a call to get all pages
  const posts = await getAllPostsWithSlug();

  // format: give next the array of pages with slug
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}
