import Local from 'passport-local'
import { findUser } from './userFetch'

export const localStrategy = new Local.Strategy(function (
  username,
  password = 'bob',
  done,
) {
  findUser({ username })
    .then((user) => {
      done(null, user)
    })
    .catch((error) => {
      done(error)
    })
})

// export const localStrategy = new Local.Strategy(
//   () => (username, password = 'bob', done) => {
//     findUser({ username, password })
//       .then((user) => {
//         done(null, user)
//       })
//       .catch((error) => {
//         done(error)
//       })
//   },
// )
