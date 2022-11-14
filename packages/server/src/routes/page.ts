import express from "express";
import {
  addCategory,
  getPage,
  updatePage,
  editCategory,
  deleteCategory,
  addLink,
  editLink,
  deleteLink,
} from "../page-service";
import { verify } from "jsonwebtoken";
import z from "zod";

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

router.delete("*", async (req, res, next) => {
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
//eslint-disable-next-line
type PageUpdater = (username: string, data: any) => any;

// Field updater for a page, takes in req res and a schema and updates an immediate field
// @eslint/no-unused-vars
const basePageUpdate = (schema: z.Schema, processor: PageUpdater) => {
  return async (req: express.Request, res: express.Response) => {
    const { username } = res.locals;
    const body = schema.safeParse(req.body);
    if (body.success) {
      try {
        const updated = await processor(username, body.data);
        if (updated) {
          res.status(200).send({
            error: false,
            message: "Page updated",
            body: updated,
          });
        } else {
          res.status(404).send({
            error: true,
            message:
              "Resource " +
              (body.data._id ? body.data._id : username) +
              " does not exist",
          });
        }
      } catch {
        res.status(503).send({ error: true, message: "Internal server error" });
        return;
      }
    } else {
      res.status(400).send({
        error: true,
        message:
          body.error.issues[0].path + " - " + body.error.issues[0].message,
      });
    }
  };
};

// POST /page/color
// Sets a color for the authorized user, in hex form
// 200: Color was set
// 400: Bad params
// 401: Unauthorized/Bad auth
// 503: ISA

export const pageColorReqSchema = z
  .object({
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  })
  .strict();

router.post("/color", basePageUpdate(pageColorReqSchema, updatePage));

// POST /page/title
// Sets a title for the authorized user's page
// 200: Title was set, returned in body
// 400: Bad params
// 401: Unauthorized/Bad auth
// 503: ISA
export const pageTitleReqSchema = z
  .object({ title: z.string().min(1) })
  .strict();

router.post("/title", basePageUpdate(pageTitleReqSchema, updatePage));

// POST /page/avatar
// Sets an avatar URL for the authorized user's page
// 200: avatar URL was set, returned in body
// 400: Bad params
// 401: Unauthorized/Bad auth
// 503: ISA
export const pageAvatarReqSchema = z
  .object({ avatar: z.string().min(1) })
  .strict();

router.post("/avatar", basePageUpdate(pageAvatarReqSchema, updatePage));

// POST /page/categories
// Adds a new category to the authorized user’s page with a name string and a color hex string
// 200: Category was created, returns new category with it's _id in body data
// 400: Bad params
// 401: Unauthorized/Bad auth
// 503: ISA

export const pageCategoryAddReqSchema = z
  .object({
    name: z.string().min(1),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  })
  .strict();

router.post(
  "/categories",
  basePageUpdate(pageCategoryAddReqSchema, addCategory)
);

export const pageCategoryEditReqSchema = z
  .object({
    name: z.string().min(1).optional(),
    _id: z.string().min(1),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional(),
  })
  .strict();

router.post("/categories/:id", async (req, res) => {
  req.body._id = req.params.id;
  return await basePageUpdate(pageCategoryEditReqSchema, editCategory)(
    req,
    res
  );
});

export const pageCategoryDeleteReqSchema = z
  .object({
    _id: z.string().min(1),
  })
  .strict();

router.delete("/categories/:id", async (req, res) => {
  req.body._id = req.params.id;
  return await basePageUpdate(pageCategoryDeleteReqSchema, deleteCategory)(
    req,
    res
  );
});

router.delete("/categories");

export const pageLinkCreateReqSchema = z
  .object({
    name: z.string().min(1),
    url: z.string().min(1),
    category: z.string().nullable(),
  })
  .strict();

router.post("/links", basePageUpdate(pageLinkCreateReqSchema, addLink));

export const pageLinkEditReqSchema = z
  .object({
    _id: z.string().min(1),
    name: z.string().min(1).optional(),
    url: z.string().min(1).optional(),
    category: z.string().nullable().optional(),
  })
  .strict();

router.post("/links/:id", async (req, res) => {
  req.body._id = req.params.id;
  return await basePageUpdate(pageLinkEditReqSchema, editLink)(req, res);
});

export const pageLinkDeleteReqSchema = z
  .object({
    _id: z.string().min(1),
  })
  .strict();

router.delete("/links/:id", async (req, res) => {
  req.body._id = req.params.id;
  return await basePageUpdate(pageLinkDeleteReqSchema, deleteLink)(req, res);
});

module.exports = router;
