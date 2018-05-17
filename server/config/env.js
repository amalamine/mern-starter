module.exports = {
  development: {
    name: 'HajjAgencyPortalMockup',
    port: 3001,
    mongo: process.env.DEV_MONGO_URL,
    endpoint: process.env.BLOCKCHAIN_SERVICES_ENDPOINT,
    users: {
      'ash@uk.ibm.com': process.env.USER_PORT_AGENCY_A,
      'danny@us.ibm.com': process.env.USER_PORT_AGENCY_B,
      admin: process.env.USER_PORT_ADMIN
    }
  },
  production: {
    name: 'HajjAgencyPortal',
    port: 3000,
    mongo: process.env.PROD_MONGO_URL,
    endpoint: process.env.BLOCKCHAIN_SERVICES_ENDPOINT,
    users: {
      'ash@uk.ibm.com': process.env.USER_PORT_AGENCY_A,
      'danny@us.ibm.com': process.env.USER_PORT_AGENCY_B,
      commandCenter: process.env.USER_PORT_COMMAND_CENTER,
      admin: process.env.USER_PORT_ADMIN
    }
  }
};
