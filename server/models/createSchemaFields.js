import mongoose, { Schema } from 'mongoose'
import composeWithMongoose from 'graphql-compose-mongoose'

export const createModel2Schema = (name, schema, opts = {}) => composeWithMongoose(mongoose.model(name, new Schema(schema)), opts)

const field = {
    query: ['findById', 'findByIds', 'findOne', 'findMany', 'count', 'connection', 'pagination'],
    mutation: ['createOne', 'updateById', 'updateOne', 'updateMany', 'removeById', 'removeOne', 'removeMany']
}

const firstUpperCase = s => s.slice(0, 1).toUpperCase() + s.slice(1)

export default (name, schema, opts) => {
    const ModelTC = createModel2Schema(name, schema, opts)

    return {
        ModelTC,
        ...Object.keys(field).reduce((res, key) => ({
            ...res,
            [key]: field[key].reduce((prev, curr) => ({
                ...prev,
                [`${name.toLowerCase()}${firstUpperCase(curr)}`]: ModelTC.getResolver(curr)
            }), {})
        }), {})
    }
}
