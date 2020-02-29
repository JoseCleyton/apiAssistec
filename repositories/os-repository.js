'use strict'

const mongoose = require('mongoose')
const Os = mongoose.model('Os')

exports.get = async () => {
    const res = await Os.find();
    return res;
}

exports.create = async (data) => {
    let os = new Os(data);
    os.numeroOs = (new Date().getFullYear() + '-0' + (await Os.find()).length).toString()
    await os.save();
}

exports.getById = async (id) => {
    const res = await Os.findById(id);
    return res;
}
