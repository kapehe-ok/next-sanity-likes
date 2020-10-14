import client from "../../sanityClient";

client.config({ token: process.env.SANITY_WRITE_TOKEN });

export default async function handleLike(req, res) {
  const { _id } = JSON.parse(req.body);
  const data = await client
    .patch(_id) // pick the document were gonna update (patch means update)
    .inc({ likes: 1 }) // increment by 1
    .commit(); // save. persist the data to database

  res.statusCode = 200;
  res.json({ likes: data.likes });

  return res;
}
