module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                msg : 'Ce nom d\'utilisateur est déjà pris !'
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })

    return User
}