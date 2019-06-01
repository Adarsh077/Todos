const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	todo: {
		type: String,
		required: true
	}
});

module.exports = new mongoose.model('Todos', TodoSchema);