import { useState } from "react";
import client from "../sanityClient";

export default function Post(props) {
  console.log(props);

  const [likes, setLikes] = useState(props.likes);

  const handleLike = async () => {
    const data = {
      _id: "test",
    };
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify(data),
    }).catch((err) => console.error(err));

    const d = await res.json();

    console.log(d);

    setLikes(d.likes);
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <button onClick={handleLike}>Like!</button>
      <p>Likes: {likes}</p>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const likes = async () => {
    const res = await client.fetch(
      `*[_type == "page" && _id == "${slug}"][0] { likes }`,
      {
        slug: slug,
      }
    );
    console.log("res", res);
  };

  return {
    props: {
      likes: 1,
    },
  };
}
