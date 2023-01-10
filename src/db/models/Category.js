module.exports = function (sequelize,dataTypes) {
    let alias = 'Category' 

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        }, 
        name: {
            type: dataTypes.STRING(45),
            allownull: false
        }
    }

    let config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey:"category_id"
        })
    }

    return Category
} 
