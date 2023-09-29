import { widgetData } from "./data/widget"
import { rest } from "msw"
import { HttpStatusCode } from "axios"

export default [
  // getWidgetList
  rest.get("/widgets", (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(widgetData))
  }),

  rest.get("/widgets/my-dashboard", (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json([]))
  }),
]
