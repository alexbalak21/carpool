function currentDate() {
  let n = new Date()
  let y = n.getFullYear()
  let m = n.getMonth() + 1
  let d = n.getDate()
  let today = `${d}-${m}-${y}`
  return today
}

function currentTime() {
  let n = new Date()
  let h = n.getHours()
  let m = n.getMinutes()
  let time = `${h}:${m}`
  return time
}

function loginForm() {
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
function PlanTrip() {
  return null
}

function registerFormDisp() {
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
  document.getElementById("main").innerHTML = main
  document.getElementById("registrForm").addEventListener("submit", registerForm)
}

function createTrips() {}

//LOGIN REQUEST
async function loginReq(event) {
  event.preventDefault()
  let email = document.getElementsByName("email")[0].value
  let password = document.getElementsByName("password")[0].value
  let result = await fetch("http://127.0.0.1/api/login/", {
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
  }
  let connected_user = JSON.parse(output)
  console.log(connected_user)
}

//REGISTER REQUEST
async function registerForm(eve) {
  eve.preventDefault()
  let email = document.getElementsByName("email")[0].value
  let password = document.getElementsByName("password")[0].value
  let password2 = document.getElementsByName("password2")[0].value
  let firstname = document.getElementsByName("firstname")[0].value
  let lastname = document.getElementsByName("lastname")[0].value
  let phone = document.getElementsByName("phone")[0].value
  let agree = document.getElementsByName("agree")[0].value
  if (password != password2) {
    document.getElementById("passError").style.display = "block"
    return null
  }
  let res = await fetch("http://localhost/api/newuser/", {
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
  let result = await res.text()
}
