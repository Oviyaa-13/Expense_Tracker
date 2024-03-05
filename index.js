const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Expense} = require('./schema.js')
const app = express()
app.use(bodyParser.json())
/**
 * git clone <link>
 * git add .
 * git commit -m "any msg"
 * git push origin main
 * 
 * git config --global user.name "Your Name"
 * git config --global user.email "Your email"
 */
/**
 * Expense Tracker
 * Adding a new expense/income : /add-expense ->post
 * Displaying existing expenses : /get-expense ->get
 * editing existing entries : edit-expense ->patch
 * deleting expenses : /delete-expense ->delete
 * 
 * budget reporting
 * creating new user
 * validating user
 * 
 * defining schema
 * categories,amount,date
 */
async function connectToDb(){
try{
   await mongoose.connect('mongodb+srv://oviyaa:Oviyaa_0903@cluster0.wo10wno.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0') 
  // name b/w / and ? is the name of db..here it is ExpenseTracker
   console.log('DB connection established')
   const port = process.env.PORT || 8000
   app.listen(port,function(){
   console.log(`listening to port ${port}`)
 })
 }
 catch(error){
   console.log(error)
   console.log("couldn't establish connection")
 }
}
connectToDb()
// app.post('/add-expense',function(request,response){
 // console.log(request.body)
  // response.json({
  //   "status" : "Expense Added"
  // })
// })
app.post('/add-expense',async function(request,response){
try{
  await Expense.create({                   //to create/add entry/data in db
    "amount" : request.body.amount,
    "category" : request.body.category,
    "date" : request.body.date
  })
  response.status(201).json({
    "status" : "success",
    "message" : "expense entry success"
  })
}
catch(error){
  response.status(500).json({
    "status" : "failure",
    "message" : "entry not created",
     "error" : error
})
}})
app.get('/get-expense',async function(request,response){
  try{
  const expenseData = await Expense.find()
  response.status(200).json(expenseData)
  }
  catch(error){
    response.status(500).json({
      "status" : "failure",
      "message" : "could not fetch entry",
       "error" : error
  })
  }
})
app.delete('/delete-expense/:id',async function(request,response){
  //  console.log("req received..")
  // console.log(request.params)
try{
  const expenseData = Expense.findById(request.params.id)
  if(expenseData){
    await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
      "status" : "success",
      "message" : "deleted entry"
    })
  }
  else{
    response.status(404).json({
      "status" : "failure",
      "message" : "could not find documnet",
  })
  }
}
catch(error){
  response.status(500).json({
    "status" : "failure",
    "message" : "could not delete entry",
})
}
})
app.patch('/edit-expense/:id', async function(request, response) {
  try {
      const expenseEntry = await Expense.findById(request.params.id)
      if(expenseEntry) {
          await expenseEntry.updateOne({
              "amount" : request.body.amount,
              "category" : request.body.category,
              "date" : request.body.date
          })
          response.status(200).json({
              "status" : "success",
              "message" : "updated entry"
          })
      } else {
          response.status(404).json({
              "status" : "failure",
              "message" : "could not find entry"
          })
      }
  } catch(error) {
      response.status(500).json({
          "status" : "failure",
          "message" : "could not delete entry",
          "error" : error
      })
  }
})


