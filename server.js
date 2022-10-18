const app = require("./app");
const dotenv = require('dotenv');

const port = process.env.PORT;
dotenv.config();

app.listen(port, () => {
  console.log(`Server has started on Port ${port}`);
});