const express = require('express');
const app = express();
app.listen(3000);

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

app.use("/", userRouter);
app.use("/posts", postRouter);