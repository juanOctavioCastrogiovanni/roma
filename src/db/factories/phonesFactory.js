const faker = require('faker')

module.exports = (n = 1) => {
    let phones = []
      for (let i = 0; i < n; i++) {
        let num =  faker.random.number({ min: 1111111111, max: 1199999999})
        let num2 = faker.random.number({ min: 1111111111, max: 1199999999})
        let num3
        
        if ((num2 % 2) ==0) {
            num3 = null
        } else {
            num3 = num2
        }

        
        phones.push({
           cell_phone: num,
           cell_phone_2: num3,
           phone: num3
        })
        
    }
    return phones
}                                                                                 