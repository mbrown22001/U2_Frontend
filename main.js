const signUpScreen = document.querySelector('.signUpScreen')
const signUpForm = document.querySelector('.signup-form')

const loginScreen = document.querySelector('.loginScreen')
const dashboard = document.querySelector('.dashboard')

const kantoPokemon = document.querySelector('.kantoPokemon')
const kantoPokemonBox = document.querySelector('.kantoPokemonBox')
const kantoNumber = 151;

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const switchToDash = () => {
    dashboard.classList.remove('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.add('hidden')
    let userName = document.querySelector('.userName')
    let usersName = localStorage.getItem('userName')
    if(usersName !== undefined) {
        userName.innerText = usersName

    }
}

const switchToKanto = () => {
    dashboard.classList.add('hidden')
    kantoPokemon.classList.remove('hidden')
}

const switchToLogin = () => {
    dashboard.classList.add('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.remove('hidden')
}


let signUpButton= document.querySelector('.signUpButton')
const switchToSignUp = () => {
    dashboard.classList.add('hidden')
    signUpScreen.classList.remove('hidden')
    loginScreen.classList.add('hidden')
}
signUpButton.addEventListener('click', () => {
    switchToSignUp()
})



signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.querySelector('#signup-name').value

    const email = document.querySelector('#signup-email').value

    const password = document.querySelector('#signup-password').value

    try {
        const response = await axios.post('http://localhost:3001/user', {
            name: name,
            email: email,
            password: password
        })
        console.log(response)
        const userId = response.data.user.id
        console.log(userId)
        const userName = response.data.user.name
        localStorage.setItem('userId', userId) 
        localStorage.setItem('userName', userName) 
        //getAllLocations()
        switchToDash()

    } catch (error) {
        console.log(error)
    }
})


const loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit',async (e) => {
    e.preventDefault()
    const email = document.querySelector('#login-email').value

    const password = document.querySelector('#login-password').value
    try {
        const response = await axios.post('http://localhost:3001/user/login', {
            email: email,
            password: password
        })
     const userId = response.data.id
    console.log(response)
    const userName = response.data.name
    localStorage.setItem('userName', userName)
    localStorage.setItem('userId', userId)
    switchToDash()

    
    } catch (error) {
        console.log(error)
        alert(error)
    }
})

const loginButton = document.querySelector('.loginButton')
loginButton.addEventListener('click', () => {
    switchToLogin()
})
const logoutButton = document.querySelector('.signOutButton')
logoutButton.addEventListener('click', () => {
    logout()
})
const logout = () => {
    localStorage.clear()
    authCheck()
}

let kantoBox = document.querySelector('.kanto')
kantoBox.addEventListener('click', () => {
    switchToKanto()
})

const fetchKantoPokemons = async () => {
    for(let i=1; i<kantoNumber; i++){
        await getPokemon(i)
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    pokemonCards(pokemon)
    //console.log(pokemon)
}
//getPokemon(1)


fetchKantoPokemons()
function pokemonCards(pokemon){
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);

    const name = pokemon.name[0].toUpperCase() +
    pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML =`
        <div class = "img-container" onclick = console.log("hey")>
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
        <div class = "info">
        <span class="number">#${pokemon.id
            .toString()
            .padStart(3, '0')}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
        </div>
        
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    kantoPokemonBox.appendChild(pokemonEl)
}
//https://pokeapi.co/api/v2/pokemon/151/

let total = 0;
let trainerPokemon = []
function pokemonControl(pokemon){
    const textInnerHTML = `<p>You have added ${pokemon.name}</p>`
    if(total <=5 ){
        
    }
}

function addPoint() {
    total++;
}



const authCheck = () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
        let userName = document.querySelector('.userName')
        let usersName = localStorage.getItem('userName')
        userName.innerText = usersName
        switchToDash()
    } else {
        switchToLogin()
    }
}
authCheck()





























