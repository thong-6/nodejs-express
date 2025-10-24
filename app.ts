// const express = require("express");
import express from "express";

const app = express();
const PORT = 8080;
app.get('/', (req, res) => {
    res.send("Hello world");
})
app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`)
})