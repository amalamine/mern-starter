module.exports = {
  development: {
    name: 'MernStarterMockup',
    port: 3001,
    mongo: process.env.DEV_MONGO_URL
  },
  production: {
    name: 'MernStarter',
    port: 3000,
    mongo: process.env.PROD_MONGO_URL
  }
};
