const mongoose = require("mongoose");

const dbConnection  = async() => {
    try
    {
        await mongoose
            .connect(process.env.DBCONNECTION, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true });
        console.log("Db online");

    }catch(error){
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
  
};

module.exports = {
 dbConnection
};


