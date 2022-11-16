const fetch = require('node-fetch');
const getToken = () => {
  return  fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: process.env.user_api, pass: process.env.pass_api })
    })
        .then((res) => {
            if (res != undefined)
                return res.json();
            throw new Error('Something went wrong');
        })
        .then(res => {
            let token = res.data.token;
            return token;
        })
        .catch((err) => {
            return null;
        })
}

module.exports = getToken