const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app = express();
// middleware
app.use(cors());
app.use(express.json())



const port = process.env.PORT || 5000;

// mongodb code
const uri = "mongodb+srv://yeasinmiah1272001:NWV1j9PTHyyzV2MI@cluster0.dybx7mi.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


// post operation
     const userCollection = client.db('userDB').collection('users')
     app.post('/users', async(req, res) =>{
        const user = req.body;
        console.log(user)
      //   console.log(user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      res.send(result);

     })
//      post operation end


// read operation
app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      console.log(result)
      res.send(result);
    });
//     read operation end


// delete operation
app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });



//     updated single
app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.findOne(query);
      console.log(result);
      res.send(result);
    });
//     updated end



//     update successfully 
app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log("id", id, data);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUSer = {
        $set: {
          name: data.name,
          password: data.password,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updatedUSer,
        options
      );
      res.send(result);
    });

//     end





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
//     await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("Crud is running...");
});


app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});







