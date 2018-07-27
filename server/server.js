import Koa from 'koa'
import cors from '@koa/cors'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa } from 'apollo-server-koa'
import koaPlayground from 'graphql-playground-middleware-koa'
import schema from './graphql'
import dbConnect from './mongo'

dbConnect()

const app = new Koa()
const router = new KoaRouter()
const port = process.env.PORT || 3000

app.use(cors())
app.use(koaBody())

// koaBody is needed just for POST.
router.post('/graphql', graphqlKoa({ schema }))

router.all('/playground', koaPlayground({
    endpoint: '/graphql'
}))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, () => {
    console.log(`\n👉 Serving the GraphQL Playground on http://localhost:${port}/playground`)
    console.log(`👉 Serving the GraphQL api endpoint on http://localhost:${port}/graphql\n`)
})
