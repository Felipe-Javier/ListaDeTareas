
const loadInitialTemplate = () => {
	const template = `    
    <div class="container-logout">
        <a href="" id="logout"> <input src="./icons/logout.svg" type="image" id="logout-icon"> Log out</a>
    </div>
    <div class="container-brand">
        <h1>ToDo List</h1> 
    </div>

    <form id="tarea-form">
        <input src="./icons/plus.svg" type="image" id="plus"> 
        <input type="text" name="name" placeholder="add Task" required>
        
    </form>
    <span>List</span>
    <ul id="tarea-list"></ul>


 `
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template

	const logout = document.getElementById('logout')
	logout.onclick = (e) => {
		e.preventDefault()
		localStorage.removeItem('jwt')
		loginPage()

	}
}

const getTareas = async () => {
	const response = await fetch('/tareas', {
		headers: {
			Authorization: localStorage.getItem('jwt')
		}
	})
	const tareas = await response.json()
	const template = tarea =>  `
	<div>
		<input src="./icons/remove.svg" type="image" data-id="${tarea._id}">
			<li>
				${tarea.name}
			</li>
		</input>
	</div>
	`

	const tareaList = document.getElementById('tarea-list')
	tareaList.innerHTML = tareas.map(tarea => template(tarea)).join('')
	tareas.forEach(tarea => {
		tareaNode = document.querySelector(`[data-id="${tarea._id}"]`)
		tareaNode.onclick = async e => {
			await fetch(`/tareas/${tarea._id}`, {
				method: 'DELETE',
				headers: {
					Authorization: localStorage.getItem('jwt')
				}
			})
			tareaNode.parentNode.remove()
			alert('Eliminado con éxito')
			getTareas()
		}
	})
}

const addFormListener = () => {
	const tareaForm = document.getElementById('tarea-form')
	tareaForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(tareaForm)
		const data = Object.fromEntries(formData.entries())
		await fetch('/tareas', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('jwt')
			}
		})
		tareaForm.reset()
		getTareas()
	}
}

const checkLogin = () => 
	localStorage.getItem('jwt')

const tareasPage = () => {
	loadInitialTemplate()
	addFormListener()
  	getTareas()
}

const loadRegisterTemplate = () => {
	const template = `
    <div class="container-brand-login">
        <h1>ToDo List</h1>
    </div>
    <div class="container-main">
        <div class="container-login">
            <form action="" id="register-form">
                <div class="tittle">Register</div>
                <div class="inputs">
                    <label for="">User</label>
                    <input type="text" name="user" required>
                    <label for="">Password</label>
                    <input type="password" name="password" required>
                    <button type="submit">Register</button>
                </div>
            </form>
            <a href="#" id="login">Log In</a>
            <div id="error"></div>
        </div>
    </div> 
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}
const addRegisterListener = () => {
	const registerForm = document.getElementById('register-form')
	registerForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(registerForm)
		const data = Object.fromEntries(formData.entries())
		const response = await fetch('/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const responseData = await response.text()
		if(response.status >= 300){
			const errorNode = document.getElementById('error')
			errorNode.innerHTML = responseData
		} else {
			localStorage.setItem('jwt', `Bearer ${responseData}`)
			tareasPage()
		}
	}
}
const gotoLoginListener = () => {
	const gotoLogin = document.getElementById('login')
	gotoLogin.onclick = (e) => {
		e.preventDefault()
		loginPage()
	}
}

const registerPage = () => {
	console.log('pagina de registro')
	loadRegisterTemplate()
	addRegisterListener()
  	gotoLoginListener()
}

const loginPage = () => {
	loadLoginTemplate()
	addLoginListener()
	gotoRegisterListener()
}

const loadLoginTemplate = () => {
	const template = `
    <div class="container-brand-login">
        <h1>ToDo List</h1>
    </div>
    <div class="container-main">
        <div class="container-login">
            <form action="" id="login-form">
                <div class="tittle">Sign in</div>
                <div class="inputs">
                    <label for="">User</label>
                    <input type="text" name="user" required>
                    <label for="">Password</label>
                    <input type="password" name="password" required>
                    <button type="submit">Login</button>
                </div>
            </form>
            <a href="#" id="register">Register</a>
            <div id="error"></div>
        </div>
    </div> 
	`
	const body =  document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const gotoRegisterListener = () => {
	const gotoRegister = document.getElementById('register')
	gotoRegister.onclick = (e) => {
		e.preventDefault()
		registerPage()
	}
}

const addLoginListener = () => {
	const loginForm = document.getElementById('login-form')
	loginForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(loginForm)
		const data = Object.fromEntries(formData.entries())

		const response = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const responseData = await response.text()
		if(response.status >= 300) {
			const errorNode = document.getElementById('error')
			errorNode.innerHTML = responseData
		} else {
			localStorage.setItem('jwt', `Bearer ${responseData}`)
			tareasPage()
		}
	}
}
window.onload = () => {
	const isLoggedIn = checkLogin()
	if(isLoggedIn) {
		tareasPage()
	} else {
		loginPage()
	}
}
