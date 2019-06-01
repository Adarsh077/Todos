const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var methodOverride = require('method-override')


const TodosDocument = require('./models/Todo');
mongoose.connect('mongodb+srv://AJ:$077Adarsh@cluster0-3l0im.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

let todoData;
const findData = () => {
	TodosDocument.find({})
		.then(data => todoData = data)
		return todoData;
}

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
	res.render('index', {
		data: findData()
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