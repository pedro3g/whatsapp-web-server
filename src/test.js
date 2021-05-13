const { createSession } = require('./venom');

(async function () {
  console.log(await createSession('teste', Date.now()))
}())
