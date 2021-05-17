function currentDate(year = 0) {
  let n = new Date()
  let y = n.getFullYear()
  y += year
  let m = n.getMonth() + 1
  if (m < 10) m = "0" + m
  let d = n.getDate()
  let today = `${y}-${m}-${d}`
  return today
}

function currentTime() {
  let n = new Date()
  let h = n.getHours()
  if (h < 10) h = "0" + h
  let m = n.getMinutes()
  if (m < 10) m = "0" + m
  let time = `${h}:${m}`
  return time
}

// ----------------------------------------------------------------  GET ALL TRIPS
async function getTrips() {
  let addCol = ""
  let addTd = ""
  let getOn = ""

  let res = await fetch(url + "trips/")
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
    if (User !== "") {
      addCol = "<th>Options</th>"
      let id = User["id"]
      if (
        id == trip["passanger_1_id"] ||
        id == trip["passanger_2_id"] ||
        id == trip["passanger_3_id"] ||
        id == trip["passanger_4_id"] ||
        id == trip["passanger_5_id"]
      ) {
        let getOff = `<button onclick="getOffTrip(${trip.id})" id='getOff'>GET OFF</button>`
        addTd = `<td>${getOff}</td>`
        // document.getElementById('getOff').addEventListener('onclick', getOffTrip)
      } else {
        let getOn = `<button onclick="getOnTrip(${trip.id})" id='getOn'>GET ON</button>`
        addTd = `<td>${getOn}</td>`
        // document.getElementById('getOn').addEventListener('onclick', getOnTrip)
      }
      if (id == trip["driver_id"]) {
        let modify = `<button onclick="updateTripForm(${trip.id}, '${trip.departure_time}', '${trip.departure}', '${trip.arrival}', ${trip.avalable_places}, ${trip.price_per_passanger})" id='updateTrip'>MODIFY</button>`
        let delTrip = `<button onclick="deleteTrip(${trip.id})" id='getOn'>DELETE</button>`
        addTd = `<td>${delTrip} ${modify}</td>`
      }
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
  output += "<h1>Planned Trips</h1>" + "</table>"
  document.getElementById("main").innerHTML = output
}

//----------------------------------------------------------------------------------------USERS
//----------------------------------------------------------------LOGIN FORM
function loginForm() {
  document.getElementById("title").innerHTML = "CARPOOL - LOGIN"
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
  document.getElementById("main").innerHTML = main
  document.getElementById("loginForm").addEventListener("submit", loginReq)
}

//------------------------------------------------------------------REGISTER USER FORM
function registerFormDisp() {
  document.getElementById("title").innerHTML = "CARPOOL - REGISTER"
  let main = `
    <h1>REGISTER</h1>
    <br />
    <form id="crateUserForm" method="post">
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
  document.getElementById("main").innerHTML = main
  document.getElementById("crateUserForm").addEventListener("submit", createUser)
  console.log("FROM DISPLAYED")
}

//----------------------------------------------------------------------------UPDATE USER FORM
function updateUserForm() {
  if (typeof User == "undefined") return null
  document.getElementById("title").innerHTML = "CARPOOL - PROFILE"
  let main = `
    <h1>UPDATE PROFILE</h1>
    <br />
    <form id="updateUserForm" method="post">
    <label id="profileID">${User["id"]}</label><br>
      <label >E-mail:</label>
      <br />
      <input type="email" value="${User["email"]}" name="email" />
      <br /><br />
      <!-- PASSWORD SECTION -->
      <label >Password:</label><br />
      <input type="password" name="password" />
      <br />
      <label >Confirm Password:</label><br />
      <input type="password" name="password2"/><br />
      <br />
      <p id="passError">
        
      </p>
      <br />
      <label>Firstname:</label>
      <br />
      <input type="text" value="${User["firstname"]}" name="firstname" />
      <br />
      <label >Lastname:</label><br />
      <input type="text" value="${User["lastname"]}" name="lastname" />
      <br /><br />
      <label >Phone Number:</label><br />
      <input type="text" value="${User["phone"]}" name="phone" />
      <br /><br />
      <input type="submit" value="Update Profile" />
    </form><br><br><br><br>
    <button id="deleteUserConfirm" value="1">DELETE ACCOUNT</button>
    `
  document.getElementById("main").innerHTML = main
  document.getElementById("updateUserForm").addEventListener("submit", updateUser)
  document.getElementById("deleteUserConfirm").addEventListener("click", deleteUserModal)
}

// ---------------------------------------------------------------------------------------CREATE TRIP FORM
function tripForm() {
  document.getElementById("title").innerHTML = "CARPOOL - PLAN A TRIP"
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
  document.getElementById("main").innerHTML = main
  document.getElementById("tripForm").addEventListener("submit", postTrip)
}

// ------------------------------------------------------------------------------------------- UPDATE TRIP FORM
function updateTripForm(id, dep_time, departure, arrival, avalablePlaces, price_per_passanger) {
  document.getElementById("title").innerHTML = "CARPOOL - PLAN A TRIP"
  let dateTime = dep_time.split(" ")
  let main = `
      <h1>UPDATE A TRIP</h1>
      <br />
      <form id="tripUpdateForm" method="post">
      <label id='tripID'>${id}</label><br>
        <label >Departure Date: </label>
        <br />
        <input type="date" name="date" min="${currentDate()}" max=${currentDate(1)} value="${dateTime[0]}"/>
        <br />
        <label>Time</label>
        <br>
        <input type="time" name="time" value="${dateTime[1]}">
        <br>
        <label>Departure:</label><br />
        <input type="text" name="departure" value="${departure}" />
        <br />
        <label>Arrival:</label><br />
        <input type="text" name="arrival" value="${arrival}" />
        <br />
        <p id="formError"></p>
        <br />
        <label >Avalable Places:</label>
        <br />
        <input type="number" value="${avalablePlaces}" name="avalablePlaces" />
        <br />
        <label>Price per Places:</label><br />
        <input type="number" value="${price_per_passanger}" name="price" />
        <br /><br>
        <input type="submit" value="Update the trip" />
      </form>`
  document.getElementById("main").innerHTML = main
  document.getElementById("tripUpdateForm").addEventListener("submit", updateTrip)
}

function deleteUserModal() {
  let modalContent = `
<div class="modal-content">
  <span class="close">&times;</span>
  <h2>Are you Sure to delete your account.</h2><br><br>
  <label >Plese Confirm your Password:</label><br /><br><br>
  <input type="password" id="ModalPassword" /><br><br><br>
  <button id="deleteUser">DELETE ACCOUNT</button><br><br>
  <button id="cancelModal">CANCEL</button>
</div>
  `
  document.getElementById("dispModal").innerHTML = modalContent
  document.getElementById("dispModal").style.display = "block"
  document.getElementsByClassName("close")[0].addEventListener("click", () => {
    document.getElementById("dispModal").style.display = "none"
  })
  document.getElementById("cancelModal").addEventListener("click", () => {
    document.getElementById("dispModal").style.display = "none"
  })
  document.getElementById("deleteUser").addEventListener("click", deleleteUser)
}
