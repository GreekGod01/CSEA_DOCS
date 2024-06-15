
const { MongoClient } = require('mongodb')
const { connectToDb, getDb } = require('./db')
let db
const defaultValue = ""
connectToDb((err) => {
  if (!err) {
    console.log("db connected")  
    db = getDb();
  }
  else{
    console.log("db error",err)  
  }

})



const io = require("socket.io")(3001, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  })

  

  io.on("connection" , socket =>{


    
    socket.on("get-document", async documentId => {
      const data = await createOrFind(documentId)
      socket.join(documentId)
      socket.emit("load-document" , data) ; 

      socket.on("send-changes", delta => {
        // console.log(delta)  
        socket.broadcast.to(documentId).emit("receive-changes",delta)
      })

      socket.on("save-document" , async data =>{
        await db.collection('document_col1').updateOne(
            { documentId: documentId },
            {$set:{data:data}}
        )

        console.log("tera ", data)
      } )

    })
  
  })

  async function createOrFind(id){
    if(id==null) return 

    let document = await db.collection('document_col1').findOne({ documentId: id })
    console.log(document)
    if(document) return document.data
    await db.collection('document_col1').insertOne({documentId : id , data : defaultValue})
    return defaultValue ;
  }

//   db.collection('pending_approvals')
// .findOne({ user_id: b })
// .then((data) => {
//     if (!data) res.status(200).json("");
//     else res.status(200).json(data.hospital_list);
//     console.log(data)
// })
// .catch((e) => {
//     res.status(500).json("error:", e);
// })