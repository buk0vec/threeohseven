import express from "express";
import { getPage } from "../page-service";
import { verify } from "jsonwebtoken";
const router = express.Router();

// GET /page/:user
// Returns the page data of a user
// 200: Success, return data back
// 404: User not found
// 503: ISA
router.get("/:user", async (req, res) => {
  const { user } = req.params;
  if (!user) {
    res.status(404).send({ error: true, message: "User not specified" });
  } else {
    try {
      const data = await getPage(user);
      if (data) {
        res.status(200).send({ error: false, message: "Success", data: data });
      } else {
        res.status(400).send({
          error: true,
          message: "User with username " + user + " not found",
        });
      }
    } catch {
      res.status(503).send({ error: true, message: "Internal server error" });
    }
  }
});

// Page POST Authentication Guard
router.post("*", async (req, res, next) => {
  const token = req.cookies["Authorization"];
  if (token) {
    if (process.env.JWT_SECRET) {
      try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const username = typeof decoded == "string" ? decoded : decoded.name;
        if (res.locals != undefined) {
          res.locals.username = username;
          next();
        } else {
          res
            .status(503)
            .send({ error: true, message: "Internal server error" });
        }
      } catch {
        res.clearCookie("Authorization");
        res.status(401).send({ error: true, message: "Bad token" });
      }
    } else {
      res.status(503).send({ error: true, message: "Internal server error" });
    }
  } else {
    res.status(401).send({ error: true, message: "No token" });
  }
});

module.exports = router;
