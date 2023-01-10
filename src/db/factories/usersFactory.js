const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = (n = 1) => {
    let users = [{
        name: 'Admin',
        last_name: 'Admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin1234', 10),
        admin: 1,
        phone_id: 1
    }]

    for (let i = 2; i <= n; i++) {
        users.push({
            name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('secret1234', 10),
            admin: 0,
            phone_id: i
        })
    }
    return users
}
