// If you are interested or you want develope webpages contact me on: 
// ZllYiEZw9HoF5DFOEnYUimugcJaHp36WrURzRyZGHkE=
// Full screen toggler
document.querySelector('.fa-expand').addEventListener('click', (ele) => {
	var elem = document.querySelector("html");
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	}
})


// DOM elements
const $input  = document.querySelector('#input');
const $delete = document.querySelector('.delete');
const $Todos  = document.querySelector('.pending');

// LocalStorage Operations
const LocalStorage = {
	getTodos : () => {
		if(localStorage.getItem('Todos')){
			Todos = JSON.parse(localStorage.getItem('Todos'));
		}
	},
	setTodos: todos => {
		localStorage.setItem('Todos', JSON.stringify(todos));
	}
}

// TODOS List
let Todos = [];
LocalStorage.getTodos();

// Todo operations
const TodosObject = {
	display: todo => {
		$Todos.insertAdjacentHTML('beforeEnd', `
			<div class = "item mb-3">
				<p class  = "d-inline ml-2">${todo}</p>
				<a href   = "#" class = "far fa-check-circle delete" onclick = 'TodosObject.remove(this)'></a>
			</div>
		`)
	},
	remove: ele => {
		const $todo = ele.parentElement.querySelector('p').innerHTML
		Todos.splice(Todos.indexOf($todo), 1);
		LocalStorage.setTodos(Todos);
		$Todos.innerHTML = '';
		Todos.forEach(todo => TodosObject.display(todo));
	}
}


// Onload Events
Todos.forEach(todo => {
	TodosObject.display(todo)
});

// Date
document.querySelector('.date').innerHTML = new Date().toUTCString().slice(0, -18);

// Add Todo
$input.addEventListener('keypress', ele => {
	if (ele.which === 13) {
		Todos.push($input.value);
		LocalStorage.setTodos(Todos);	
		TodosObject.display($input.value);
		$input.value = '';
	}
});