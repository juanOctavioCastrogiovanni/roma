const faker = require('faker')

module.exports = (n = 1) => {
    let addresses = [{
        user_id: 1,
        street: "Hipólito Yrigoyen",
        city: "San Martin",
        floor: null,
        departament: null,
        prov: "Buenos Aires",
        alias: "ROMA",
        number: 4598,
        zip_code: 1651,       
    }]
    
    for (let i = 2; i <= n; i++) {
        addresses.push({
            user_id: i,
            street: faker.address.streetName(),
            city: faker.address.city(),
            floor:faker.random.number({ min: 1, max: 10}),
            departament: 'A',
            prov: faker.address.state(),
            alias: faker.name.firstName(),
            number: faker.random.number({ min: 1, max: 9999}),
            zip_code: faker.random.number({ min: 1111, max: 9999}),       
        })
        
    }
    return addresses
}                                                                                 