import Joi from 'joi'

const schema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    age:Joi.date().required(),
    amountOverdue:Joi.string(),
    amountPaid:Joi.string(),
})

export default schema;