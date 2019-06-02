const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var methodOverride = require('method-override')


const TodosDocument = require('./models/Todo');

// MongoDB atlas: mongodb+srv://AJ:$077Adarsh@cluster0-3l0im.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://AJ:$077Adarsh@cluster0-3l0im.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

const app = express();

// Express
app.use(express.static('./public'))

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Express-Handlebars
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Method Override
app.use(methodOverride('_method'))

// Routes
app.get('/', (req, res) => {
	TodosDocument.find({})
		.then(data => {
			res.render('index', {
				data: data
			})
		})
})

app.post('/index', (req,res)=>{
	new TodosDocument({
		todo : req.body.todo
	}).save()
		.then(()=>{
			TodosDocument.find({})
				.then(data => {
					res.redirect('/')
				})
		})
})

app.delete('/index/:id', (req,res)=>{
	TodosDocument.deleteOne({_id: req.params.id})
		.then(() => {
			res.redirect('/');
		})
})


const port = process.env.PORT || 8000;
app.listen(port);