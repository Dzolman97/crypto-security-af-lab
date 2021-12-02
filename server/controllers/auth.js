const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const existingPass = bcrypt.compareSync(password, users[i].passwordHash)
          if (existingPass) {
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            res.status(200).send(userToReturn)
            return
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const { username, email, firstName, lastName, password } = req.body
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        let newUserObj = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        users.push(newUserObj)
        let userToReturn = {...users}
        delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
    }
}