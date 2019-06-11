let express = require('express')
let path = require('path')
let app = express()
const port = process.env.PORT || 8080

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname,'./client/build/')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./client/build/','index.html'))
})

app.listen(port,()=>{console.log(`server is listening ${port}`)})
