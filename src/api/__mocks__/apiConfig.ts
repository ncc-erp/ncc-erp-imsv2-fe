import { rest } from "msw"
import { HttpStatusCode } from "axios"
import { configData } from "./data/config"

const url = "/config"

export default [
  // getAll
  rest.get(`${url}`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(configData))
  }),
  //update email setting
  rest.put(`${url}/email`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(req.body))
  }),
  //update komu
  rest.put(`${url}/komu`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(req.body))
  }),
]
