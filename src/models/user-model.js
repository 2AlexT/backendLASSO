const {dataType} =require('sequelize');

function model(sequelize){
    const attributes={
        identificador:{type:dataType.INTEGER,allowNull:false},
        nombre:{type: dataType.STRING, allowNull: false},
        passwordHash:{type: dataType.STRINg, allowNull:false}
    };
    const options ={
        defaultScopte:{
            attributes:{exclude:['passwordHash']}
        },
        scopes:{
            withHash:{attributes:{},}
        }
    };
    return sequelize.define('User',attributes,options)
}