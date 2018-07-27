import createSchemaFields from './createSchemaFields'

const schema = createSchemaFields('User', {
    name: String,
    age: Number
})

console.log(schema.ModelTC.getType())
schema.ModelTC.addFields({
    phone: 'String',
    createdAt: 'String',
})

export default schema
