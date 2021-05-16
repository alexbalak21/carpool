document.getElementById('registerLink').addEventListener('click', registerFormDisp)
document.getElementById('loginLink').addEventListener('click', loginForm)
document.getElementById('GetTrips').addEventListener('click', getTrips)

User = ''

let host = 'http://127.0.0.1/'
let backendFolder = 'carpool/backend/'
let url = host + backendFolder

function test() {
  document.getElementById('test').innerHTML = 'Account modification'
}

function currentDate(year = 0) {
  let n = new Date()
  let y = n.getFullYear()
  y += year
  let m = n.getMonth() + 1
  if (m < 10) m = '0' + m
  let d = n.getDate()
  let today = `${y}-${m}-${d}`
  return today
}

function currentTime() {
  let n = new Date()
  let h = n.getHours()
  if (h < 10) h = '0' + h
  let m = n.getMinutes()
  if (m < 10) m = '0' + m
  let time = `${h}:${m}`
  return time
}
// --------------------------------------------------------------------------------------- TRIP FORM
function tripForm() {
  document.getElementById('title').innerHTML = 'CARPOOL - PLAN A TRIP'
  let date = currentDate()
  let time = currentTime()
  let main = `
  <h1>REGISTER A TRIP</h1>
  <br />
  <form id="tripForm" method="post">
    <label >Departure Date: </label>
    <br />
    <input type="date" name="date" min="${date}" max=${currentDate(1)} value="${date}"/>
    <br />
    <label>Time</label>
    <br>
    <input type="time" name="time" value="${time}">
    <br>
    <label>Departure:</label><br />
    <input type="text" name="departure" value="Paris" />
    <br />
    <label>Arrival:</label><br />
    <input type="text" name="arrival" value="Lyon" />
    <br />
    <p id="formError"></p>
    <br />
    <label >Avalable Places:</label>
    <br />
    <input type="number" value="3" name="avalablePlaces" />
    <br />
    <label>Price per Places:</label><br />
    <input type="number" value="25" name="price" />
    <br /><br>
    <input type="submit" value="Register the trip" />
  </form>`
  document.getElementById('main').innerHTML = main
  document.getElementById('tripForm').addEventListener('submit', postTrip)
}

//----------------------------------------------------------------LOGIN FORM
function loginForm() {
  document.getElementById('title').innerHTML = 'CARPOOL - LOGIN'
  let main = `
  <div>
  <h1>LOGIN</h1>
  <br />
  <form id="loginForm" method="post">
    <label for="email">E-mail:</label><br />
    <input type="email" value="john.doe@email.com" name="email" />
    <br /><br />
    <label for="password">Password:</label><br />
    <input type="password" name="password" value="azerty" /><br /><br />
    <input type="submit" value="Submit" />
  </form>
</div>
  `
  document.getElementById('main').innerHTML = main
  document.getElementById('loginForm').addEventListener('submit', loginReq)
}

//--------------------------------------------------------------------------REGISTER FORM
function registerFormDisp() {
  document.getElementById('title').innerHTML = 'CARPOOL - REGISTER'
  let main = `
  <h1>REGISTER</h1>
  <br />
  <form id="registrForm" method="post">
    <label for="email">E-mail:</label>
    <br />
    <input type="email" value="john.doe@email.com" name="email" />
    <br /><br />
    <!-- PASSWORD SECTION -->
    <label for="password">Password:</label><br />
    <input type="password" name="password" value="azerty" />
    <br />
    <label for="pass2">Confirm Password:</label><br />
    <input type="password" name="password2" value="azerty" />
    <br />
    <p id="passError">
      <br />
      Passwords don't Match !
    </p>
    <br />
    <label for="firstname">Firstname:</label>
    <br />
    <input type="text" value="John" name="firstname" />
    <br />
    <label for="lastname">Lastname:</label><br />
    <input type="text" value="Doe" name="lastname" />
    <br /><br />
    <label for="phone">Phone Number:</label><br />
    <input type="text" value="07.00.00.00.00" name="phone" />
    <br /><br />
    <input type="checkbox" id="vehicle1" name="agree" value="true" />
    <label for="agree">Agree to the terms.</label><br />
    <br />
    <input type="submit" value="Submit" />
  </form>
  `
  document.getElementById('main').innerHTML = main
  document.getElementById('registrForm').addEventListener('submit', registerForm)
}

// ------------------------------------------------------------------------LOGIN REQUEST
async function loginReq(event) {
  event.preventDefault()
  let email = document.getElementsByName('email')[0].value
  let password = document.getElementsByName('password')[0].value
  if (email == '') {
    document.getElementById('warning').style.display = 'block'
    document.getElementById('warning').innerHTML = 'EMAIL IS EMPTY'
    return null
  }
  if (password == '') {
    document.getElementById('warning').style.display = 'block'
    document.getElementById('warning').innerHTML = 'PASSWORD IS EMPTY'
    return null
  }
  let result = await fetch(url + 'login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  let output = await result.text()
  if (output == 'USER NOT FOUND' || output == 'WRONG PASSWORD') {
    document.getElementById('warning').style.display = 'block'
    document.getElementById('warning').innerHTML = output
    return null
  }
  User = JSON.parse(output)
  console.log(User)
  document.getElementsByClassName('nav')[0].innerHTML += `<li><a id="tripFormLink" href="#">Plann a Trip</a></li>`
  document.getElementById('tripFormLink').addEventListener('click', tripForm)
  sessionStorage.setItem('User', User['fistname'])
  sessionStorage.setItem('UserEmail', User['email'])
  document.getElementById('loginLink').style.display = 'none'
  document.getElementById('registerLink').innerHTML = User['firstname']
  document.getElementById('registerLink').removeEventListener('click', registerFormDisp)
  document.getElementById('registerLink').id = 'account'
  document.getElementById('account').addEventListener('click', updateUser)
  document.getElementById('GetTrips').addEventListener('click', getTrips)
}

function userPage() {}

//-----------------------------------------------------------------------------REGISTER USER
async function registerForm(event) {
  event.preventDefault()
  let email = document.getElementsByName('email')[0].value
  let password = document.getElementsByName('password')[0].value
  let password2 = document.getElementsByName('password2')[0].value
  let firstname = document.getElementsByName('firstname')[0].value
  let lastname = document.getElementsByName('lastname')[0].value
  let phone = document.getElementsByName('phone')[0].value
  let agree = document.getElementsByName('agree')[0].value
  if (password != password2) {
    document.getElementById('passError').style.display = 'block'
    return null
  }
  let res = await fetch(url + 'newuser/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone: phone,
    }),
  })
  let id = await res.text()
  if (id > 0) document.getElementById('passError').style.display = 'none'
  loginForm()
  console.log(id)
}
//-----------------------------------------------------------------REGISTER A TRIP
async function postTrip(RegTrip) {
  RegTrip.preventDefault()
  let date = document.getElementsByName('date')[0].value
  let time = document.getElementsByName('time')[0].value
  let datetime = date + ' ' + time + ':00'
  let departure = document.getElementsByName('departure')[0].value
  let arrival = document.getElementsByName('arrival')[0].value
  let places = document.getElementsByName('avalablePlaces')[0].value
  let price = document.getElementsByName('price')[0].value
  let res = await fetch(url + 'newtrip/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      driver_id: User['id'],
      departure_time: datetime,
      departure: departure,
      arrival: arrival,
      avalable_places: places,
      price_per_passanger: price,
    }),
  })
  let result = await res.text()
  console.log(result)
}

// ----------------------------------------------------------------  GET ALL TRIPS
async function getTrips() {
  let addCol = ''
  let addTd = ''
  let getOn = ''
  let delTrip = "<button id='delTrip'>DELETE</button>"
  let modify = "<button id='modTrip'>MODIFY</button>"

  if (User !== '') {
    addCol = '<th>Options</th>'
    addTd = `<td>${getOn}${getOff}</td>`
  }
  let res = await fetch(url + 'trips/')
  let data = await res.json()
  // if (typeof User !== "undefined") {
  //   addTh = "<th>ADD</th>"
  //   Container = `<td><button onclick="addToTrip(${User["id"]})">ADD</button></td>`
  // }
  let output = `
    <table>
    <tr>
      <th>DATE TIME</th>
      <th>FROM</th>
      <th>TO</th>
      <th>DRIVER</th>
      <th>Avalable Places</th>
      <th>Price</th>
      ${addCol}
    </tr>
  `
  data.forEach((trip) => {
    if (User !== '') {
      let id = User['id']
      if (
        id == trip['passanger_1_id'] ||
        id == trip['passanger_2_id'] ||
        id == trip['passanger_3_id'] ||
        id == trip['passanger_4_id'] ||
        id == trip['passanger_5_id']
      ) {
        let getOff = `<button onclick="getOffTrip(${trip['id']})" id='getOff'>GET OFF</button>`
        addTd = `<td>${getOff}</td>`
        // document.getElementById('getOff').addEventListener('onclick', getOffTrip)
      } else {
        let getOn = `<button onclick="getOnTrip(${trip['id']})" id='getOn'>GET ON</button>`
        addTd = `<td>${getOn}</td>`
        // document.getElementById('getOn').addEventListener('onclick', getOnTrip)
      }
      if (id == trip['driver_id']) addTd = `<td>${delTrip} ${modify}</td>`
    }
    output += `
        <tr>
        <td>${trip.departure_time}</td>
        <td>${trip.departure}</td>
        <td>${trip.arrival}</td>
        <td>${trip.fullname}</td>
        <td>${trip.avalable_places}</td>
        <td>${trip.price_per_passanger}</td>
        ${addTd}
      </tr>
      `
  })
  output += '<h1>Planned Trips</h1>' + '</table>'
  document.getElementById('main').innerHTML = output
}

//----------------------------------------------------------------------------UPDATE USER PROFILE
function updateUser() {
  if (typeof User == 'undefined') return null
  document.getElementById('title').innerHTML = 'CARPOOL - PROFILE'
  let main = `
  <h1>UPDATE PROFILE</h1>
  <br />
  <form id="updateUserForm" method="post">
  <label id="profileID">${User['id']}</label><br>
    <label >E-mail:</label>
    <br />
    <input type="email" value="${User['email']}" name="email" />
    <br /><br />
    <!-- PASSWORD SECTION -->
    <label >Password:</label><br />
    <input type="password" name="password" />
    <br />
    <label >Confirm Password:</label><br />
    <input type="password" name="password2"/>
    <br />
    <p id="passError">
      <br />
      Passwords don't Match !
    </p>
    <br />
    <label>Firstname:</label>
    <br />
    <input type="text" value="${User['firstname']}" name="firstname" />
    <br />
    <label >Lastname:</label><br />
    <input type="text" value="${User['lastname']}" name="lastname" />
    <br /><br />
    <label >Phone Number:</label><br />
    <input type="text" value="${User['phone']}" name="phone" />
    <br /><br />
    <input type="submit" value="Update Profile" />
  </form>
  `
  document.getElementById('main').innerHTML = main
  document.getElementById('updateUserForm').addEventListener('submit', registerForm)
}

//---------------------------------------------------------------------------------------GET OFF TRIP
async function getOffTrip(tripID) {
  let userID = User['id']
  console.log(tripID)
  let result = await fetch(url + 'getofftrip/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripID: tripID,
      userID: userID,
    }),
  })
  console.log('DONE OFF')
  getTrips()
}

//------------------------------------------------------------------------------------------GET ON TRIP
async function getOnTrip(tripID) {
  let userID = User['id']
  console.log(tripID)
  let result = await fetch(url + 'getontrip/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripID: tripID,
      userID: userID,
    }),
  })
  console.log('DONE ON')
  getTrips()
}
