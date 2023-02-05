const mongoose = require('mongoose')
 
mongoose.set('strictQuery', true);

const connection = ()=>{

    mongoose.connect(process.env.connectionURL+'/'+process.env.db_name)
 
    .then(()=>{
   
       console.log('Database Connected')
    })
   
    .catch((er)=>{
   
       console.log(er.message)
    })

} 


module.exports = connection