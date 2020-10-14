import { getAllPostsWithSlug } from "../lib/sanity";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <main>
      {posts.map((post, index) => (
        <div key={index}>
          <Link href={`/${post.slug}`}>
            <a>{post.slug}</a>
          </Link>
        </div>
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const posts = await getAllPostsWithSlug();
  return {
    props: { posts },
  };
}
