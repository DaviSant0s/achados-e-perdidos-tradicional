const requiSignin = (req, res, next) => {
  if (req.session.userId) {
    return next()
  }

  console.log('Usuário não autorizado!')
}

module.exports = {
    requiSignin,
}