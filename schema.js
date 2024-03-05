//schema is for readability and accessibility
//all imports should be at top of file
const mongoose = require('mongoose')
const expenseTrackerSchema = new mongoose.Schema({
  amount : {        //field
    type : Number   //datatype
  },
  category : {      //field
    type : String   //datatype
  },
  date : {         //field
    type : String  //datatype
  }
})

const Expense = mongoose.model('expenseDetails',expenseTrackerSchema) //1st parameter is collection_name,2nd parameter is schema variablename defined in 2nd line here
module.exports = {Expense} ////all exports should be at end of file