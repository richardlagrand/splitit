import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const myDB = client.db("chat_server");
const user = myDB.collection("user");

export async function getUsers() {
  try {
    await client.connect();
    const result = await user.find().toArray();
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

export async function addUser(user) {
  try {
    await client.connect();
    const doc = { ...user }; // give me everything inside user
    const result = await user.InsertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

export default { getUsers, addUser };

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect()

//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 })
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     )
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }
// run().catch(console.dir)
