const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
let config = require('./config');
const conn = mongoose.createConnection(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const UserModel = conn.model('User', new Schema({
    username: { type: String },
    password: { type: String }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } }));

module.exports = {
    UserModel
}
