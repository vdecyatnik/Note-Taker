var express = require("express");

const path = require("path");
//require file system to read/create files
const fs = require("fs");

const app = express();
// id
const { nanoid } = require("nanoid");

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", function (req, res) {
  //use fs module to read the file
  const readNotes = JSON.parse(
    fs.readFileSync("db/db.json", { encoding: "utf8" })
  );
  //send the parsed data back to the client with res.json()
  res.json(readNotes);
  

app.post("/api/notes", function (req, res) {
  // Access the POSTed data in req.body
  //use the fs module to read the file
  console.log("req.body", req.body);
  //THEN parse the file contents with JSON.parse() to get the real data
  const readNotes = JSON.parse(
    fs.readFileSync("db/db.json", { encoding: "utf8" })
  );
  var newNote = {
    title: req.body.title,
    text: req.body.text,
    id: nanoid(),
  };
  
  //Push the req.body to the array list.
  readNotes.push(newNote);

  //Json.stringify() the array list back into a json string
  //THEN save the contents back to the db.json file with the fs module
  fs.writeFileSync("db/db.json", JSON.stringify(readNotes));
  res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
  // access the id from req.params.id
  //use the fs module to read the file
  const readNotes = JSON.parse(
    fs.readFileSync("db/db.json", { encoding: "utf8" })
  );

  const updatedArray = readNotes.filter((item) => item.id !== req.params.id);
  //THEN parse the file contents with JSON.parse() to get the real data
  fs.writeFileSync("db/db.json", JSON.stringify(updatedArray));


  res.json({ status: "success" });
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
