import { rest } from "msw"
import { HttpStatusCode } from "axios"
import { userRole } from "./data/admin"

const url = "/admin"

export default [
  // getAll
  rest.get(`${url}/role`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(userRole))
  }),
  rest.post(`${url}/role`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(req.body))
  }),
  rest.put(`${url}/role/:id`, (req, res, ctx) => {
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json({ id: req.params.id, data: req.body })
    )
  }),
  rest.delete(`${url}/role:id`, (req, res, ctx) =>
    res(ctx.status(HttpStatusCode.Ok), ctx.json(req.params))
  ),
]
