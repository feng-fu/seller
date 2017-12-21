const mongoose = require('mongoose')
const db = mongoose.connection;
const model = {
  user: {
    name: { type: String, required: true },
    pwd: { type: String, required: true },
    type: { type: String, enum: ['buyer', 'seller'], required: true },
    avator: { type: String },
  }
}
Object.keys(model).forEach(item => {
  mongoose.model(item, mongoose.Schema(model[item]))
})



module.exports = {
  getModel(name) {
    return db.models[name]
  }
}