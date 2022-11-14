import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("Authorization");
  res.status(200).send({ error: false, message: "Logged out" });
});
module.exports = router;
