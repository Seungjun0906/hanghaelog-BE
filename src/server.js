const { sequelize, User, Comment, Post } = require("./models/models/index");
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  // await sequelize.sync({ force: true });
  await sequelize.sync();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
