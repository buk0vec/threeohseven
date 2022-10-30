import express from "express"
import { verify } from "jsonwebtoken"
const router = express.Router()

// Validates a user's Authorization cookie
// 200: Authentication good
// 401: Bad token stored in cookie or no cookie, cookie unset 
// 503: ISA
router.post("/", async (req, res) => {
	const token = req.cookies['Authorization']
	if (token) {
		if (process.env.JWT_SECRET) {
			try {
				const decoded = verify(token, process.env.JWT_SECRET)
				res.status(200).send({ error: false, message: "Session validated", data: { name: (typeof decoded == "string" ? decoded : decoded.name) } })
			}
			catch {
				res.clearCookie("Authorization")
				res.status(401).send({ error: true, message: "Bad token" })
			}
		} else {
			res.status(503).send({ error: true, message: "Internal server error" })
		}
	} else {
		res.status(401).send({ error: true, message: "No token" })
	}
})

module.exports = router
