
import { GQC } from 'graphql-compose'
import * as models from '../models'

Object.values(models).forEach(model => {
    const { query, mutation } = model
    GQC.rootQuery().addFields(query)
    GQC.rootMutation().addFields(mutation)
})

const schema = GQC.buildSchema()

export default schema
