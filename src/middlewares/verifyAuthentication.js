const requiSignin = (req, res, next) => {
  if (req.session.userId) {
    console.log('oiiii')
    return next()
  }
}

module.exports = {
    requiSignin,
}