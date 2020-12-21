var express = require("express");
// requre the fs file module to import it.
//to read the data base
const path = require("path");
const fs = require("fs");
const app = express();

// generate a unique id package
const generateUniqueId = require("generate-unique-id");

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const id = generateUniqueId({
  length: 3,
  useLetters: false,
});

app.get("/api/notes", function (req, res) {
  //use fs module to read the file
  const readNotes = JSON.parse(
    fs.readFileSync("db/db.json", { encoding: "utf8" })
  );
  console.log(readNotes);

  //THEN parse the file contents with JSON.parse() to get the real data
  //send the parased data back to the client with res.json()
  res.json(readNotes);
  //time stamp as a unique id
});

app.post("/api/notes", function (req, res) {
  // Access the POSTed data in req.body
  //use the fs module to read the file
  const readNotes = JSON.parse(
    fs.readFileSync("db/db.json", { encoding: "utf8" })
  );
  //THEN parse the file contents with JSON.parse() to get the real data
  //Push the req.body to the array list.

  //Json.stringify() the array list back into a json string
  //THEN save the contents back to the db.json file with the fs module
});

//New Note Array
let savedNotes = [];

app.delete("/api/notes/:id", function (req, res) {
  // access the id from req.params.id
  //use the fs module to read the file
  //THEN parse the file contents with JSON.parse() to get the real data
  //Option A
  //Find the matching index using findIndex();
  //Remove the target element using .splice();
  //Option B
  //User the Array.filter() method to filter out the matching element
  //myArray = myArray.filter({id})=> element.id!==req.params.id);
  //Return any type of success message.
});
app.get("/notes", function (req, res) {
  //return the contents of the notes.html
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
  //return the contents of the index.html
  //res.sendFile(//path to the index.html file);
  res.sendFile(path.join(__dirname, "public/index.html"));
  //use * selector and always come last
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
