import express from "express";
import { z } from "zod";
import { createUser } from "../user-service";
import { sign } from "jsonwebtoken";
const router = express.Router();

const signUpSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

/*
 * POST /user/signUp
 * Takes in a username and a password and tries to sign up
 * Returns a valid JWT or an error
 * 200: User created
 * 409: User already taken
 * 400: Bad params
 * 503: MongoDB error
 */
router.post("/", async (req, res) => {
  const body = signUpSchema.safeParse(req.body);
  if (body.success) {
    const { username, password } = body.data;
    createUser(username, password)
      .then((added_user) => {
        if (added_user != undefined) {
          if (process.env.JWT_SECRET == undefined) {
            res
              .status(503)
              .send({ error: true, message: "Internal server error" });
          } else {
            const token = sign({ name: username }, process.env.JWT_SECRET);
            res.cookie(`Authorization`, token, {
              httpOnly: true,
              expires: new Date(Date.now() + 900000),
              // TODO: Enable
              // secure: true
            });
            res.status(200).send({ error: false, message: "User create!" });
          }
        } else {
          res
            .status(409)
            .send({ error: true, message: "Username already taken" });
        }
      })
      .catch((e: any) => {
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
