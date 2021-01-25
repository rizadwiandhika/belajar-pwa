document.addEventListener("DOMContentLoaded", function () {
	// nav menu
	const menus = document.querySelectorAll(".side-menu")
	M.Sidenav.init(menus, { edge: "right" })
	// add recipe form
	const forms = document.querySelectorAll(".side-form")
	M.Sidenav.init(forms, { edge: "left" })

	// Initialiez Materialize for form
	const rightForms = document.querySelectorAll('.right-form')
	M.Sidenav.init(rightForms, {edge: 'right'})
})

// Menghandle ketika suatu dokumen DITAMBAHKAN ke firebase
// dengan membuat fungsi ini, kita me-render data yg bersifat 'added'
// Kalo ada data yg ditambahkan, harus ditampilkan jg di page
const displayFoods = (data, id) => {
	const food = `
	<div class="card-panel recipe white row" data-id="${id}">
		<img src="/img/dish.png" alt="recipe thumb" />
		<div class="recipe-details">
			<div class="recipe-title">${data.title}</div>
			<div class="recipe-ingredients">${data.ingredients}</div>
		</div>
		<div class="recipe-delete" style="cursor: pointer">
			<i class="material-icons" data-target="right-form" data-id="${id}">create</i>
			<i class="material-icons" data-id="${id}">delete_outline</i>
		</div>
	</div>
	`
	const foodCont = document.querySelector( '.recipes' )
	foodCont.innerHTML += food
}

const displayEditFoods = (data, id) => {
	console.log( id )
	const food = document.querySelector( `.recipe[data-id="${id}"]` )
	food.querySelector( '.recipe-title' ).innerHTML = data.title
	food.querySelector( '.recipe-ingredients' ).innerHTML = data.ingredients
}

const removeFoods = (id) => {
	const food = document.querySelector( `.recipe[data-id="${id}"]` )
	food.remove()
}