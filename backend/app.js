require("dotenv/config");
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const axios = require("axios");
const https = require("https");
const http = require("http");
const mongoose = require("mongoose");
const socketIo = require("socket.io");

let Chat = require("./models/Chat");

const router = require("./routes/router");

const {
  PORT = 5000,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  FRONTEND_URL,
  BOT_TOKEN,
  MONGO_URI,
} = process.env;

const memory = {};

const app = express();
// parse POST params sent in body in json format
app.use(cors());
app.use(express.json());
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB started!"))
  .catch((err) => console.log(err));

app.use("/api", router);

app.post("/getToken", async (req, res) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: BOT_TOKEN,
    },
  };

  axios
    .post(
      "https://discord.com/api/oauth2/token",
      {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code: req.body.code,
        grant_type: "authorization_code",
        redirect_uri: FRONTEND_URL,
      },
      config
    )
    .then((response) => {
      const oauthData = response.data;
      return res.json(oauthData);
      // Use accessToken to make authenticated requests to the Discord API
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

app.get("/p/getMe", async (req, res) => {
  const authString = req.headers.authorization;
  const me = await fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: authString,
    },
  });
  if (!me.ok) {
    return false;
  }
  const response = await me.json();
  res.json(response);
});

app.get("/p/getMe/guilds", async (req, res) => {
  const authString = req.headers.authorization;
  console.log(authString);
  const me = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      authorization: authString,
    },
  });
  if (!me.ok) {
    return false;
  }
  const response = await me.json();
  res.json(response);
});

app.post("/p/getMe/guilds/members", async (req, res) => {
  const authorization = req.headers.authorization;
  const server_id = req.body.server_id;

  axios
    .get(`https://discord.com/api/guilds/${server_id}/members`, {
      params: {
        limit: 100,
      },
      headers: {
        authorization: `Bot ${BOT_TOKEN}`,
      },
    })
    .then((result) => res.json(result.data))
    .catch((err) => res.json(err));

  // if (!members.ok) return res.status(404).json(members.json());
  // const response = await members.json();
  // res.json();
});

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let clients = new Map();

io.on("connection", (socket) => {
  console.log(socket.handshake.query.userId, "==", socket.id);
  clients.set(socket.handshake.query.userId, socket.id);
  // Handle socket events
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/api/chat/add", (req, res) => {
  let { sender, receiver, content } = req.body;
  if (clients.has(receiver))
    io.sockets.sockets.get(clients.get(receiver)).emit("chat message", {
      sender: sender,
      content: content,
    });
  let newChat = new Chat({
    sender: sender,
    receiver: receiver,
    content: content,
  });

  newChat
    .save()
    .then((chat) => res.json(chat))
    .catch((err) => res.status(500).json(err));
});

server.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`);
});
