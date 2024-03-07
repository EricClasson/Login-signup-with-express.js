const express = require("express");
const app = express();
const port = 3000;

const users = [
  {
    username: "ericclasson",
    email: "eric960100@gmail.com",
    password: "klarthej",
    id: 1,
    date: "2024-03-06T12:00:00Z", // exempel data
  },
];
app.use(express.static("public"));
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body; // Skriver in de data som ska hämtas in
  const existinguser = users.find(
    (user) => user.username === username && user.email === email
  );
  if (existinguser) {
    res
      .status(409)
      .json({ message: "Username already exists", success: false });
  } else {
    const id = generateUniqueId();
    const date = new Date().toISOString();
    const newUser = { username, email, password, id, date };
    users.push(newUser);
    res.status(201).json({ newUser, success: true });
  }
});

function generateUniqueId() {
  return Math.floor(Math.random() * 1000) + 1;
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).json({ message: " Login is succefully", success: true });
  } else {
    res
      .status(401)
      .json({ message: "Username does not exist", success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
