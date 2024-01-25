import express from "express";
import { createConnection } from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "Nika12lai",
  database: "stbase",
  waitForConnections: true,
});

app.listen(8800, () => {
  console.log("welcome to server");
});

app.get("/table", (req, res) => {
  const tableName = req.query.tableName;
  const searchValue = JSON.parse(req.query.searchValue || "{}");

  let q = `SELECT * FROM ${tableName} WHERE 1`;

  // Initialize an array to store the values for filtering
  const filterValues = [];

  // Iterate through the searchValue fields and add conditions to the query
  Object.keys(searchValue).forEach((key) => {
    const value = searchValue[key];
    if (value !== "") {
      q += ` AND ${key} LIKE ?`;
      filterValues.push(`%${value}%`);
    }
  });

  // Add the final condition to exclude rows with null id
  q += " AND id IS NOT NULL";
  db.query(q, filterValues, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/table", (req, res) => {
  const tableName = req.query.tableName;
  const q = `INSERT INTO ${tableName} (name, lastname,groupNumber, personalid, mail, birthdate ) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    req.body.name,
    req.body.lastname,
    req.body.groupNumber,
    req.body.personalid,
    req.body.mail,
    req.body.birthdate,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Added successfully", data });
  });
});

app.delete("/table/:id", (req, res) => {
  const tableName =
    req.query.tableName === "groups" ? "groupstable" : req.query.tableName;
  const Id = req.params.id;
  const q = `DELETE FROM ${tableName} WHERE Id = ?`;
  db.query(q, [Id], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Deleted successfully" });
  });
});

app.put("/table/:id", (req, res) => {
  const tableName = req.query.tableName;
  const Id = req.params.id;
  const q = `UPDATE ${tableName} SET name = ?, lastname = ?, groupNumber = ?, personalid = ?, mail= ?, birthdate = ? WHERE Id = ? `;

  const values = [
    req.body.name,
    req.body.lastname,
    req.body.groupNumber,
    req.body.personalid,
    req.body.mail,
    req.body.birthdate,
  ];

  db.query(q, [...values, Id], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Updated successfully" });
  });
});

// group endPoints

app.get("/grouptable", (req, res) => {
  const tableName = req.query.tableName;
  const groupNumber = req.query.groupNumber;

  let q = `SELECT * FROM ${tableName} WHERE groupNumber = ?`;
  db.query(q, groupNumber, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/grouptable", (req, res) => {
  const tableName = "groupstable";
  const q = `INSERT INTO ${tableName} (groupName, groupNumber) VALUES (?, ?)`;
  const values = [req.body.groupName, req.body.groupNumber];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Added successfully", data });
  });
});

app.put("/grouptable/:id", (req, res) => {
  const tableName = "groupstable";
  const Id = req.params.id;
  const q = `UPDATE ${tableName} SET groupName = ?, groupNumber = ? WHERE Id = ? `;

  const values = [req.body.groupName, req.body.groupNumber];

  db.query(q, [...values, Id], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Updated successfully" });
  });
});

app.put("/remove/:id", (req, res) => {
  const tableName = req.query.tableName;
  const Id = req.params.id;
  const q = `UPDATE ${tableName} SET groupNumber = ? WHERE Id = ? `;

  const values = req.body.groupNumber;

  db.query(q, [values, Id], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Updated successfully" });
  });
});
