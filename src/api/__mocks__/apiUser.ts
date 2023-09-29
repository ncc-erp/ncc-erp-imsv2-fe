import { loginGoogleData, refreshData } from "@/api/__mocks__/data/login"
import { listUserData } from "@/api/__mocks__/data/users"
import { rest } from "msw"
import { HttpStatusCode } from "axios"

const url = "/users"

export default [
  // login
  rest.post("/auth/token", (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginGoogleData))
  }),

  // logout
  rest.post("/auth/logout", (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json("Logout successful"))
  }),

  // refreshtoken
  rest.post("/auth/refreshToken", (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshData))
  }),

  rest.get(url, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(listUserData))
  }),
]
