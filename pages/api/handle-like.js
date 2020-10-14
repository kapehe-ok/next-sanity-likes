import client from "../../sanityClient";

client.config({ token: process.env.SANITY_WRITE });

export default async function handleLike(req, res) {
  console.log(JSON.parse(req.body));
  const { _id } = JSON.parse(req.body);
  console.log(_id);
  const doc = { _id: _id, _type: "page" };

  const result = await client.createIfNotExists(doc).then((res) => {
    return client
      .patch(res._id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();
  });

  res.statusCode = 200;
  res.json({ likes: result.likes });
  return res;
}
