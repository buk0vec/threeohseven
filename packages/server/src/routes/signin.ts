import express from "express";
import { z } from "zod";
import { loginUser } from "../user-service";
import { sign } from "jsonwebtoken";
const router = express.Router();

const signInSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

// Attempts to login a user, setting Authentication cookie w/ JWT
// 200: Authentication good and cookie set
// 400: Badly formatted credentials
// 401: Incorrect credentials
// 503: MongoDB error
router.post("/", async (req, res) => {
  const body = signInSchema.safeParse(req.body);
  if (body.success) {
    const { username, password } = body.data;
    loginUser(username, password)
      .then((valid) => {
        if (valid) {
          if (process.env.JWT_SECRET == undefined) {
            res
              .status(503)
              .send({ error: true, message: "Internal server error" });
          } else {
            const token = sign({ name: username }, process.env.JWT_SECRET);
            res.cookie(`Authorization`, token, {
              httpOnly: true,
              expires: new Date(Date.now() + 90000000),
              // TODO: Enable
              secure: true,
              sameSite: "none",
            });
            res.status(200).send({ error: false, message: "Logged in" });
          }
        } else {
          res.status(401).send({ error: true, message: "Bad credentials" });
        }
      })
      .catch((e) => {
        res.status(503).send({
          error: true,
          message: "Bad interaction with DB: " + e.message,
        });
      });
  } else {
    res.status(400).send({
      error: true,
      message: body.error.issues[0].path + " - " + body.error.issues[0].message,
    });
  }
});

module.exports = router;
