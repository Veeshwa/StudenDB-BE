const dotenv=require('dotenv')
const mongoose=require('mongoose')
const express=require('express')
const app=express()
dotenv.config()
const stream=process.env.MONGODB_URL

mongoose.connect(stream).then(()=> console.log('is working')
).catch((e)=>console.log(e))

const student=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    feedback:String
})

const Student = mongoose.model('student',student)

app.use(express.json())

app.get('/student',(req,res)=>{
    Student.find().then((data)=>res.json(data)).catch(()=>res.status(500).send('error'))
})

app.post('/student',(req,res)=>{
    const list= new Student(req.body)
    list.save().then((data)=>res.json(data)).catch(()=>res.status(500).send('error'))
})

app.put('/student/:id',(req,res)=>{
    const {id}=req.params
    const list1= req.body
    Student.findByIdAndUpdate(id,list1).then((data)=>res.json(data)).catch(()=>res.status(500).send('error'))
})

app.delete('/student/:id',(req,res)=>{
    const {id}=req.params
    Student.findByIdAndDelete(id).then((data)=>res.json(data)).catch(()=>res.status(500).send('error'))
})


app.listen(3000,()=>console.log('connected server')
)