let main = `
<div>
<h1>LOGIN</h1>
<br />
<form id="loginForm" action="http://127.0.0.1:1080/" method="post">
  <label for="email">E-mail:</label><br />
  <input type="email" name="email" /> <br /><br />
  <label for="password">Password:</label><br />
  <input type="password" name="password" /><br /><br />
  <input type="submit" value="Submit" />
</form>
</div>`
document.getElementById('registrForm').addEventListener('submit', registerForm)
// document.getElementById('loginForm').addEventListener('submit', loginReq)

async function loginReqOld(event) {
  event.preventDefault()
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  let res = await fetch('http://127.0.0.1/serv/', {
    method: 'POST',
    headers: {
      Accept: '*/*'
    },
    body: `email=${email}&password=${password}`
  })
  console.log(res)
}
//LOGIN REQUET
async function loginReq(event) {
  event.preventDefault()
  let email = document.getElementsByName('email')[0].value
  let password = document.getElementsByName('password')[0].value
  let result = await fetch('http://127.0.0.1/api/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  let output = await result.text()
  document.getElementById('test').innerHTML = output
}

//REGISTER REQUEST
async function registerForm(eve) {
  eve.preventDefault()
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
  let res = await fetch('http://localhost/api/newuser/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone: phone
    })
  })
  let result = await res.json()
  document.getElementById('test').innerHTML = result
}
