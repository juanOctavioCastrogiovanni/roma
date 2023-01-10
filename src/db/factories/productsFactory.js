const faker = require('faker')

module.exports = (n = 1) => {
    let products = []
    let description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    
    for (let i = 0; i < n; i++) {
        let prices = faker.commerce.price();
        let discount = faker.random.number({ min: 0, max: 30})
        let slice = faker.random.number({ min: 0, max: 12})
        let category = faker.random.number({ min: 1, max: 6})

        products.push({
            name: faker.commerce.productName(),
            description: description,
            gross_price: prices,
            discount: discount,
            price: prices - (discount*prices/100),
            stock: faker.random.number({ min: 0, max: 200}),
            slices: slice,
            image_1: 'product-image-1595193271799.jpg',
            image_2: 'product-image-1595193271792.jpg',
            image_3: 'product-image-1595193271799.jpg',
            image_4: 'product-image-1595193271792.jpg',
            category_id: category
        })
        
    }
    return products
}                                                                                 