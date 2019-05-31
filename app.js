// DOM elements
const $input = document.querySelector('#input');
const $add = document.querySelector('.fa-plus-circle');
const $faCircleThin = document.querySelector('.fa-circle-thin');

const TodosObject = {
	FrontEnd: {
		display : (todo) => {
			document.querySelector('.pending').insertAdjacentHTML('beforeEnd', `
				<div class="item mb-3">
					<p class="d-inline ml-2">${todo}</p>
					<a href="#" class="far fa-check-circle delete" onclick='completed(this)'></a>
				</div>
			`)
		}
	}
}
// TODOS List
let Todos = ['Hello'];

// Onload Events
Todos.forEach(todo => TodosObject.FrontEnd.display(todo));

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

// Date
document.querySelector('.date').innerHTML = new Date().toUTCString().slice(0, -18);

$input.addEventListener('keypress', ele => {
	if (ele.which === 13) {
		Todos.push($input.value)
		TodosObject.FrontEnd.display($input.value);
		$input.value = '';
	}
});

