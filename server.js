require("dotenv").config();
const PORT = process.env.PORT || process.env.NODE_PORT || 8080;
const ITEMS_COLLECTION = "items";
// const MONGODB_URI = process.env.PROD_MONGODB || process.env.MONGODB_URI; //Removed for demo
const mockItems = require("./mockItems.js").mockItems;

//let sslRedirect = require('heroku-ssl-redirect'); //If using heroku, use this to make the server https only
let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require("body-parser");
// let mongo = require("mongodb"); //Removed for demo
// const ObjectId = mongo.ObjectId; //Removed for demo
function ObjectId(){return 12345} //Remove this code to use project
// let MongoClient = mongo.MongoClient;
let database = null;

//app.use(sslRedirect()); //If using heroku, use this to make the server https only


/*
//This code is for the website which remains live to demo the project - no user changes can be made
//There is no need to connect to the DB
//Remove this code if you wish to use this project

MongoClient.connect(MONGODB_URI, { reconnectTries: 120, reconnectInterval: 2000 })
.then(function(_database) { // <- db as first argument
  console.log("Database connection ready");
  database = _database;
  let server = require("http").createServer(app);
  server.listen(PORT, function() {
    console.log("HTTP Server up and listening on " + PORT);
  });
})
.catch(function(err) {
  console.error(err);
  process.exit(1);
});
*/
let server = require("http").createServer(app);
server.listen(PORT, function() {
  console.log("HTTP Server up and listening on " + PORT);
});





function setNoCache(res){
  try {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
  }catch(e){
    console.error("Could not set headers for response", e)
  }
}

function handleError(res, reason, messageForUser, code) {
  console.error("ERROR: " + (reason || message));
  res.status(code || 500).send({ "success": false, "message": messageForUser || "An unknown error occurred." });
}

app.use(bodyParser.json());

// build directory the root
// build/picture.jpg -> /picture.jpg
app.use("", express.static(path.join(__dirname, "build")));

// Default url serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.get("/api/items", (req, res) => {

  //This code is for the website which remains live to demo the project - no user changes can be made
  //This code makes it appear as if it was a successful request
  //Remove this code if you wish to use this project
  res.status(200).send(mockItems);
  return;



  console.log("----GET items---- at " + Date.now());
  setNoCache(res);

  database.db().collection(ITEMS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to retrieve items.");
      return;
    } else {
      if (Array.isArray(docs)) {
        let availableItems = [];
        let unavailableItems = [];
        for (let item of docs) {
          //Do not give the whole collection, because it contains sensitive data
          //Filter out what is required
          //DB Projection could have been used to solve this problem at an earlier stage
          let cleanItem = {
            available: item.available,
            title: item.title,
            imageUrl: item.imageUrl,
            _id: item._id
          };
          if (item.available) {
            availableItems.push(cleanItem);
          } else {
            unavailableItems.push(cleanItem);
          }
        }
        let returnedData = {
          success: true,
          items: [...availableItems, ...unavailableItems],
          message: "Registry items successfully retrieved."
        };
        res.status(200).send(returnedData);
      } else {
        handleError(res, "Items was not an array", "Failed to get items. Returned but was not an array.");
        return;
      }
    }
  });
});

app.post("/api/reserve/:id", (req, res) => {

  //This code is for the website which remains live to demo the project - no user changes can be made
  //This code makes it appear as if it was a successful request
  //Remove this code if you wish to use this project
  res.status(200).send({
    success: true,
    message: "You have reserved this gift. You can undo this by clicking the 'Cancel Reservation' button beneath the item."
  });
  return;



  console.log("----POST to reserve---- at " + Date.now());
  setNoCache(res);
  let data = req.body;
  if (!data) {
    handleError(res, "Data missing in request for reservation", "Data missing in request.", 400);
    return;
  }

  if (!data.email || typeof data.email !== "string") {
    handleError(res, "User did not supply email for reservation", "You must supply your email to reserve a gift.", 400);
    return;
  }

  if (!data.name || typeof data.name !== "string") {
    handleError(res, "User did not supply name for reservation", "You must supply your name(s) to reserve a gift.", 400);
    return;
  }

  if (!req.params.id) {
    handleError(res, "ID missing in reservation", "ID was missing in request.", 400);
    return;
  }
  console.log(data.name + ", " + data.email + " is attempting to reserve: " + req.params.id);

  //Get status of document
  database.db().collection(ITEMS_COLLECTION).findOne({
    _id: new ObjectId(req.params.id)
  }, function(err, doc) {
    //Check if document can be reserved
    if (err) {
      handleError(res, err.message, "Failed to reserve item.");
      return;
    } else {
      if (!doc) {
        handleError(res, "Document could not be found for reservation", "This item cannot be reserved.", 400);
        return;
      }
      if (!doc.available) {
        handleError(res, "Document was not available for reservation", "This item is already reserved.", 400);
        return;
      }
    }

    //If document is available, update it
    database.db().collection(ITEMS_COLLECTION).updateOne(
      { _id: new ObjectId(req.params.id )}, //Find
      { $set: { available: false, email: data.email, name: data.name } }, //Set
      { upsert: false }, //Options
      function(err, result) { //Callback
        if (err) {
          handleError(res, err.message, "Failed to reserve item.");
          return;
        } else {
          if(result.modifiedCount > 0){
            res.status(200).send({
              success: true,
              message: "You have reserved this gift. You can undo this by clicking the 'Cancel Reservation' button beneath the item."
            });
          }else{
            handleError(res, "No items modified in reservation request.", "No changes could be made.");
            return;
          }
        }
      });
  });
});

app.post("/api/cancel-reservation/:id", (req, res) => {

  //This code is for the website which remains live to demo the project - no user changes can be made
  //This code makes it appear as if it was a successful request
  //Remove this code if you wish to use this project
  res.status(200).send({
    success: true,
    message: "You have reserved this gift. You can undo this by clicking the 'Cancel Reservation' button beneath the item."
  });
  return;



  console.log("----POST to cancel-reservation---- at " + Date.now());
  setNoCache(res);
  let data = req.body;
  if (!data) {
    handleError(res, "Data missing in request for cancellation", "Data missing in request.", 400);
    return;
  }

  if (!data.email || typeof data.email !== "string") {
    handleError(res, "User did not supply email for cancellation", "You must supply your email to cancel a reservation.", 400);
    return;
  }

  console.log(data.email + " is attempting to cancel reservation: " + req.params.id);

  //Check email matches and available === false
  database.db().collection(ITEMS_COLLECTION).findOne({
    _id: new ObjectId(req.params.id)
  }, function(err, doc) {
    //Check if document can be reserved
    if (err) {
      handleError(res, err.message, "Failed to cancel reservation for item.");
      return;
    } else {
      if (!doc) {
        handleError(res, "Document could not be found to cancel the reservation", "This item could not be found for to cancel the reservation.", 400);
        return;
      }
      if (doc.available === true) {
        handleError(res, "Document was available during reservation cancellation", "This item is already available for reservation.", 400);
        return;
      }
      if (doc.email !== data.email) {
        //Attempt to use master password (not the highest level of security)
        if(data.email === "masterpepee@queen.com"){
          console.log("Master email address has been used to cancel reservation for: " + doc._id + " " + doc.email + " " + doc.name)
          //Do not return`
        }else {
          handleError(res, "User email did not match item email: doc: " + doc.email + " data: " + data.email,
            "This email does not match the one used to make the reservation for this item.", 400);
          return;
        }
      }

      //Cancel reservation
      database.db().collection(ITEMS_COLLECTION).updateOne(
        { _id: new ObjectId(req.params.id )}, //Find
        { $set: { available: true, email: undefined, name: undefined } }, //Set
        { upsert: false }, //Options
        function(err, result) { //Callback
          if (err) {
            handleError(res, err.message, "Failed to cancel reservation for item.");
            return;
          } else {
            if(result.modifiedCount > 0){
              res.status(200).send({
                success: true,
                message: "You have successfully cancelled your reservation to give this gift."
              });
            }else{
              handleError(res, "No items modified in cancel reservation request.", "No changes could be made.");
              return;
            }
          }
        });
    }
  });
});