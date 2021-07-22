const bcrypt = require("bcrypt")
const salt = 10
module.exports = function(sequelize, DataTypes){
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isLong(value){
                    if(value.length <= 5){
                        throw new Error("Password is not long enough")
                    }

                }
            }
        }
    },{
        hooks: {
            beforeCreate: (User, options)=> {
                return bcrypt.hashSync(User.password, salt)
            }
        }
    })
    
    User.associate = function(models){
        User.hasMany(models.Note)
    }
    return User
}