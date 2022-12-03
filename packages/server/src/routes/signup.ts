import express from "express";
import { z } from "zod";
import { createUser } from "../user-service";
import { createPage } from "../page-service";
import { sign } from "jsonwebtoken";
const router = express.Router();

/*
 * POST /user/signup body data
 * username: an alphanumeric string of 3 or more characters
 * password: a string of at least 6 characters
 * avatar: a string containing the local path of the avatar
 * color: a string containing the background color
 * categories: an array containing four background colors for the four default categories
 */
const signUpSchema = z
  .object({
    username: z.string().regex(/^[A-Za-z0-9]{3,}$/),
    password: z.string().min(6),
    avatar: z.string(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    categories: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).length(4),
  })
  .strict();

/*
 * POST /user/signUp
 * Takes in a username and a password and tries to sign up. Also takes in an
 * avatar string, a color string, and an array with four category colors
 * Returns a valid JWT or an error
 * 200: User created
 * 409: User already taken
 * 400: Bad params
 * 503: MongoDB error
 */
router.post("/", async (req, res) => {
  const body = signUpSchema.safeParse(req.body);
  if (body.success) {
    const { username, password, color, avatar, categories } = body.data;
    createUser(username, password)
      .then((added_user) => {
        createPage(username, avatar, color, categories)
          .then((pageCreated) => {
            if (added_user != undefined) {
              if (!pageCreated) {
                res.status(200).send({
                  error: false,
                  message: "User create, no page create",
                });
              } else {
                if (process.env.JWT_SECRET == undefined) {
                  res
                    .status(503)
                    .send({ error: true, message: "Internal server error" });
                } else {
                  const token = sign(
                    { name: username },
                    process.env.JWT_SECRET
                  );
                  res.cookie(`Authorization`, token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 90000000),
                    // TODO: Enable
                    // secure: true
                    secure: true,
                    sameSite: "none",
                  });
                  res
                    .status(200)
                    .send({ error: false, message: "User create!" });
                }
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
              message: "Bad DB Interaction: " + e.message,
            });
          });
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
