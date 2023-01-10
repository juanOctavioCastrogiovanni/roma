async function filterProducts () {

let filter = req.query.filter;
        let priceMin = req.query.filterPriceMin;
        let priceMax = req.query.filterPriceMax;
        let filterBool = false
        let filterPriceBool = false
        let products
        let categoriesAll 
        let productsAll
        let categoryFilter
        let flag = false
        let respuesta
        
        // async function nextStsp(bool){
            
        //     products = productsAll
        //     categoriesAll = await db.Category.findAll()
        //     if (bool) {
        //         categoryFilter = await db.Category.findByPk(filter)
        //         categoryFilter = categoryFilter.name 
        //     } 
           
        // }



        if ((filter != undefined)&&(priceMin != undefined)&&(priceMax != undefined)&&(flag==false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                        category_id:filter,
                        price: {
                            [Op.between]: [priceMin, priceMax]
                        }
                  }                    
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)
            categoryFilter = categoryFilter.name 
            flag=true;
            respuesta = 'filtro, precio maximo y precio minimo'
        }  





        if ((filter != undefined)&&(priceMin != undefined)&&(flag==false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                        category_id:filter,
                        price: {
                            [Op.gte]: priceMin,
                        }
                  }                    
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)
            categoryFilter = categoryFilter.name 
            flag=true;
            respuesta = 'filtro y precio minimo'
        }







        if ((filter != undefined)&&(priceMax != undefined)&&(flag==false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                        category_id:filter,
                        price: {
                            [Op.lte]: priceMax,
                        }
                  }                    
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)
            categoryFilter = categoryFilter.name 
            flag=true;
            respuesta = 'filtro y precio maximo'
        }
        




        
        if ((priceMin != undefined)&&(priceMax != undefined)&&(flag==false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                        price: {
                            [Op.between]: [priceMin, priceMax]
                        }
                  }                    
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            flag=true;
            respuesta = 'precio maximo y precio minimo'
           
        }  





        if ((priceMin != undefined)&&(flag==false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                        price: {
                            [Op.gte]: priceMin,
                        }
                  }                    
            })
           products = productsAll
            categoriesAll = await db.Category.findAll()
            flag=true;
            respuesta = 'precio minimo'
        }







        if ((priceMax != undefined)&&(flag==false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                        price: {
                            [Op.lte]: priceMax,
                        }
                  }                    
            })
             products = productsAll
            categoriesAll = await db.Category.findAll()
            flag=true;
            respuesta = 'precio maximo'
        }
        


        if ((filter != undefined)&&(flag==false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                        category_id:filter
                  }                    
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)
            categoryFilter = categoryFilter.name 
            flag=true;
            respuesta = 'filtro'
        } 
        
          if ((filter == undefined)&&(flag==false))  {
            productsAll = await db.Product.findAndCountAll({
                offset: Number(req.query.page) * 18 || 0,
                limit: 12,
                include: ['category'],
            })
            products = productsAll.rows
            categoriesAll = await db.Category.findAll()
            flag = true
            respuesta = 'nada'
        }
    }

module.exports = filterProducts