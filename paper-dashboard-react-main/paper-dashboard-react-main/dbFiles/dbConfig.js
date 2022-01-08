const config = {
    user: 'ttkhoa',
    password: '123',
    database: 'Books',
    server: "LAPTOP-6OVMRM2D",
    dialect: "mssql",
    options: {
        trustedConnection: false,
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    port: 1433
}
module.exports = config;