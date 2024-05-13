const {Model, DataTypes}= require('sequelize');
const bycrypt= require('bcrypt');//to hash psw for security
const sequelize= require('../config/connection');
const { timeStamp } = require('console');

class User extends Model{
    checkPassword(loginPw){//this is a method of the User class/
        //User class hass access to this method b/c it extends from Model class
        return bycrypt.compareSync(loginPw, this.password);
    }//compares entered password to the the hashed password stored 
    //in the User object
}

User.init(
    {//first object
     id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement: true,

     },
     name:{
        type:DataTypes.STRING,
        allowNull:false,

     },
     email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
        },
     },

    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]//min length of pswd
        },

    },

    },
    {
        hooks:{//b/f saving, pswd must be saved//by using hashing our pswd is safe
            beforeCreate:async (newUserData)=>{
                newUserData.passwors= await bycrypt.hash(newUserData.password, 10);
                return newUserData
            }
        },
        sequelize,
        timeStamps: false,
        freezeTableName: true,//make sure table name doesnt get plural to 'users' 
        //bc that is sequelize default behavior//
        undescored: true,
        modelName:'user'

    }
);

module.exports= User;