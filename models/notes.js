const user = require("./user")

module.exports = function(sequelize, DataTypes){
    const Note = sequelize.define("Note", {
        picture: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
        },
        observation: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Note.associate = function(models){
        Note.belongsTo(models.User)
    }
    return Note
}