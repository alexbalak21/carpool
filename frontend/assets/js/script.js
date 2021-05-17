document.getElementById("registerLink").addEventListener("click", registerFormDisp)
document.getElementById("loginLink").addEventListener("click", loginForm)
document.getElementById("GetTrips").addEventListener("click", getTrips)

User = ""

let host = "http://127.0.0.1/"
let backendFolder = "carpool/backend/"
let url = host + backendFolder

loginForm()

// ------------------------------------------------------------------------LOGIN REQUEST
async function loginReq(event) {
  event.preventDefault()
  let email = document.getElementsByName("email")[0].value
  let password = document.getElementsByName("password")[0].value
  if (email == "") {
    document.getElementById("warning").style.display = "block"
    document.getElementById("warning").innerHTML = "EMAIL IS EMPTY"
    return null
  }
  if (password == "") {
    document.getElementById("warning").style.display = "block"
    document.getElementById("warning").innerHTML = "PASSWORD IS EMPTY"
    return null
  }
  let result = await fetch(url + "login/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  let output = await result.text()
  if (output == "USER NOT FOUND" || output == "WRONG PASSWORD") {
    document.getElementById("warning").style.display = "block"
    document.getElementById("warning").innerHTML = output
    return null
  }
  User = JSON.parse(output)
  console.log(User)
  document.getElementsByClassName("nav")[0].innerHTML += `<li><a id="tripFormLink" href="#">Plann a Trip</a></li>`
  document.getElementById("tripFormLink").addEventListener("click", tripForm)
  sessionStorage.setItem("User", User["fistname"])
  sessionStorage.setItem("UserEmail", User["email"])
  document.getElementById("loginLink").style.display = "none"
  document.getElementById("registerLink").innerHTML = User["firstname"]
  document.getElementById("registerLink").removeEventListener("click", registerFormDisp)
  document.getElementById("registerLink").id = "account"
  document.getElementById("account").addEventListener("click", updateUserForm)
  document.getElementById("GetTrips").addEventListener("click", getTrips)
  document.getElementById("warning").style.display = "none"
  getTrips()
}

//-----------------------------------------------------------------------------REGISTER USER
async function createUser(createUserEvent) {
  console.log("createUser Enterd")
  createUserEvent.preventDefault()
  let email = document.getElementsByName("email")[0].value
  let password = document.getElementsByName("password")[0].value
  let password2 = document.getElementsByName("password2")[0].value
  let firstname = document.getElementsByName("firstname")[0].value
  let lastname = document.getElementsByName("lastname")[0].value
  let phone = document.getElementsByName("phone")[0].value
  let agree = document.getElementsByName("agree")[0].value
  console.log("FORM VALUES IMPORTED")
  if (password != password2) {
    document.getElementById("passError").style.display = "block"
    return null
  }
  console.log("PASSWORD CHEKC DONE")
  let res = await fetch("http://localhost/carpool/backend/newuser/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone: phone,
    }),
  })
  console.log("FETCH DONE")
  loginForm()
}

//-------------------------------------------------------------------------------UPDATE USER

async function updateUser(event) {
  event.preventDefault()
  if (typeof User == "undefined") return null
  let id = User["id"]
  let email = document.getElementsByName("email")[0].value
  let password = document.getElementsByName("password")[0].value
  let password2 = document.getElementsByName("password2")[0].value
  let firstname = document.getElementsByName("firstname")[0].value
  let lastname = document.getElementsByName("lastname")[0].value
  let phone = document.getElementsByName("phone")[0].value
  if (password == "" || password2 == "") {
    document.getElementById("passError").innerHTML = "Enter Paswords please."
    document.getElementById("passError").style.display = "block"
    return null
  }
  if (password != password2) {
    document.getElementById("passError").innerHTML = "Passwords Dont Match !"
    document.getElementById("passError").style.display = "block"
    return null
  }
  if (firstname == "" || lastname == "" || phone == "") {
    document.getElementById("passError").innerHTML = "Make sure all fields are filled !"
    document.getElementById("passError").style.display = "block"
    return null
  }
  let result = await fetch(url + "updateuser/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone: phone,
    }),
  })
  console.log(result)
}

//-------------------------------------------------------------------------DELETE USER
async function deleleteUser() {
  console.log("DELETE USER REQUEST JS")
  if (User == "") {
    return null
  }
  let userID = User["id"]
  let userPass = document.getElementById("ModalPassword").value
  if (userPass == "") {
    return null
  }
  let res = await fetch(url + "deleteuser/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: userID,
      userPass: userPass,
    }),
  })
  location.reload()
}

//-----------------------------------------------------------------CREATE A TRIP
async function postTrip(RegTrip) {
  RegTrip.preventDefault()
  let date = document.getElementsByName("date")[0].value
  let time = document.getElementsByName("time")[0].value
  let datetime = date + " " + time + ":00"
  let departure = document.getElementsByName("departure")[0].value
  let arrival = document.getElementsByName("arrival")[0].value
  let places = document.getElementsByName("avalablePlaces")[0].value
  let price = document.getElementsByName("price")[0].value
  let res = await fetch(url + "newtrip/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      driver_id: User["id"],
      departure_time: datetime,
      departure: departure,
      arrival: arrival,
      avalable_places: places,
      price_per_passanger: price,
    }),
  })
  getTrips()
}

//---------------------------------------------------------------------------------------GET OFF TRIP
async function getOffTrip(tripID) {
  let userID = User["id"]
  console.log(tripID)
  let result = await fetch(url + "getofftrip/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tripID: tripID,
      userID: userID,
    }),
  })
  console.log("DONE OFF")
  getTrips()
}

//------------------------------------------------------------------------------------------GET ON TRIP
async function getOnTrip(tripID) {
  let userID = User["id"]
  console.log(tripID)
  let result = await fetch(url + "getontrip/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tripID: tripID,
      userID: userID,
    }),
  })
  console.log("DONE ON")
  getTrips()
}

//------------------------------------------------------------------------------UPDATE TRIP
async function updateTrip(event) {
  event.preventDefault()
  let tripID = document.getElementById("tripID").textContent
  let date = document.getElementsByName("date")[0].value
  let time = document.getElementsByName("time")[0].value
  let datetime = date + " " + time
  console.log(datetime)
  let departure = document.getElementsByName("departure")[0].value
  let arrival = document.getElementsByName("arrival")[0].value
  let places = document.getElementsByName("avalablePlaces")[0].value
  let price = document.getElementsByName("price")[0].value
  let res = await fetch(url + "updatetrip/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tripID: tripID,
      departure_time: datetime,
      departure: departure,
      arrival: arrival,
      avalable_places: places,
      price_per_passanger: price,
    }),
  })
  getTrips()
}

//---------------------------------------------------------------------------------------DELETE TRIP
async function deleteTrip(tripID) {
  if (User == "") return null
  let userID = User["id"]
  let res = await fetch(url + "deletetrip/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tripID: tripID,
      userID: userID,
    }),
  })
  getTrips()
}
