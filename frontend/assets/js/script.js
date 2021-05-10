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

document.getElementById("main").innerHTML

document.getElementById("loginForm").addEventListener("submit", loginReq)

async function loginReqOld(event) {
  event.preventDefault()
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  let res = await fetch("http://127.0.0.1/serv/", {
    method: "POST",
    headers: {
      Accept: "*/*",
    },
    body: `email=${email}&password=${password}`,
  })
  console.log(res)
}

function loginReq(event) {
  event.preventDefault()
  const formData = new FormData(this)
  console.log(formData)
  fetch("http://127.0.0.1/serv/", {
    mode: "cors",
    method: "POST",
    body: formData,
  }).then((res) => console.log(res.headers))
}
