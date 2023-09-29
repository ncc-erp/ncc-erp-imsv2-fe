import {
  dashboardData,
  detailData,
  newsListData,
  tableData,
} from "@/api/__mocks__/data/news"
import { HttpStatusCode } from "axios"
import { rest } from "msw"

const url = "/news"

export default [
  // getAll
  rest.get(`/${url}`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(newsListData))
  }),

  rest.get(`${url}`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get("page") || "")
    const limit = parseInt(req.url.searchParams.get("limit") || "")
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = dashboardData.length
    const paginatedResults = dashboardData.slice(startIndex, endIndex)
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json({ data: paginatedResults, total }),
    )
  }),

  rest.get(`${url}/detail`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(detailData))
  }),

  rest.get(`${url}/detail`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(detailData))
  }),
  rest.get(`${url}/table`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get("page") || "")
    const limit = parseInt(req.url.searchParams.get("limit") || "")
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = tableData.length
    const paginatedResults = tableData.slice(startIndex, endIndex)
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json({ data: paginatedResults, total }),
    )
  })
]
