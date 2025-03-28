const userModel = (sequelize, DataTypes) => {
    const Users = sequelize.define("users",{
        id:{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false,
            validate: {
                len: [3, 50],
              },
              field: "name",
              comment: "Product name",
        },
        email :{
            type:DataTypes.STRING,
            allowNull : false,
            unique : true,
            validate: {
                isEmail: {
                  msg: 'Please enter a valid email'
                }
              }
        },
        password :{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [6, 255] // Minimum password length
            }
        },
    },{
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Users
}

module.exports = userModel;