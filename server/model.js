const mongoose = require('mongoose');
const db = mongoose.connection;
const uuid = require('uuid');
const model = {
  user: {
    name: { type: String, required: true },
    pwd: { type: String, required: true },
    type: { type: String, enum: ['buyer', 'seller'], required: true },
    avator: { type: String }
  },
  goods: {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: String, required: true },
    query_id: {type: String, default: uuid.v4() },
    desc: { type: String },
    create_time: {type: Date, default: new Date()}
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