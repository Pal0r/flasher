module.exports = {
  // JWT Secret Key for signing requests
  'secret': process.env.JWT_SECRET_KEY,
  // Database connection data
  'database': `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds153412.mlab.com:53412/flasherdb`,
  'port': process.env.PORT || 3000
}