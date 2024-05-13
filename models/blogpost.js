const{Model, DataTypes}= require('sequelize');
const sequelize= require('../config/connection');
const { type } = require('os');
const { timeStamp } = require('console');

class BlogPost extends Model {}

BlogPost.init({//1st object
    id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoincrement:true,
    },
    title:{
    type:DataTypes.STRING,
    allowNull:false

    },
    content:{
    type:DataTypes.TEXT,
    allowNull:false,
    },

    author_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    refernces:{
        model:'user',
        key:'id',
    },

    },
},
{//2nd object
sequelize,
timeStamps: true,
underscored:true,
modelName:'blogpost',
}

);

module.exports=BlogPost;


