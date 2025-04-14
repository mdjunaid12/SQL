const { faker } = require ("@faker-js/faker");
const mysql = require("mysql2");
const express = require ("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "9391659654",
});


let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.image.avatar(),
    faker.internet.password(),
    faker.date.birthdate(),
    faker.date.past(),
  ];
};
//HOME ROUTE
app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) AS count  FROM users"; 
  try{
        connection.query(q, (err, result) => {
            if (err) {
                throw err;    
            }
            console.log("Total users:", result[0].count);
            res.render("home.ejs" ,{count:result[0].count});
        });    
    }catch(err)
    {
        console.error("Unexpected result structure:", result);
        res.send("Unexpected database response");
    }
});

//Show users

app.get("/user",(req,res)=>{
    let q = `SELECT * FROM users`;
    try{
        connection.query(q, (err, result) => {
            if (err) {
                throw err;    
            }
            const users=result;
            res.render("showusers.ejs",{users});
        });    
    }catch(err)
    {
        console.error("Unexpected result structure:", result);
        res.send("Unexpected database response");
    }
});

//Edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM users WHERE id='${id}'`;
    try{
        connection.query(q, (err, result) => {
            if (err) {
                throw err;    
            }
            let user=result[0];
            res.render("edit.ejs",{user});
        });    
    }catch(err)
    {
        console.error("Unexpected result structure:", result);
        res.send("Unexpected database response");
    }
})
//Delete route
app.get("/user/:id/delete",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM users WHERE id='${id}'`;
    try{
        connection.query(q, (err, result) => {
            if (err) {
                throw err;    
            }
            let user=result[0];
            res.render("delete.ejs",{user});
        });    
    }catch(err)
    {
        console.error("Unexpected result structure:", result);
        res.send("Unexpected database response");
    }
})

app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {email:formEmail,password:formUser}=req.body;
    let q=`SELECT * FROM users WHERE id='${id}'`;
    try{
        connection.query(q, (err, result) => {
            if (err) {
                throw err;    
            }
            if(formEmail!=result[0].email || formUser!=result[0].password){
                res.send("WRONG PASSWORD OR WRONG EMAIL");
            }
            else{
                let q1=`DELETE FROM users WHERE id='${id}'`;
                connection.query(q1,(err,result)=>{
                    if(err)
                    {
                        throw err;
                    }
                    res.redirect("/user");
                });
            }
              
        });
        
        
    }catch(err)
    {
        console.error("Unexpected result structure:", result);
        res.send("Unexpected database response");
    }
})

//Add Route
app.get("/user/add",(req,res)=>{
    res.render("add.ejs");
});

app.post("/users",(req,res)=>{
    let{username,email,password}=req.body;
    let id=uuidv4();

       let q=`INSERT INTO users (id,user,email,password) VALUES('${id}','${username}','${email}','${password}')`;
    try{
        connection.query(q, (err, result) => {
            if (err) {
                throw err;    
            }
            res.redirect("/user");
               
        });
    }catch(err)
    {
        console.error("Unexpected result structure:", result);
        res.send("Unexpected database response");
    }

});

//Update Route
app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formPass,username:newUsername}=req.body;
    let q=`SELECT * FROM users WHERE id='${id}'`;
    try{
        connection.query(q, (err, result) => {
            if (err) {
                throw err;    
            }
            if(formPass!=result[0].password){
                res.send("WRONG PASSWORD!");
            }
            else{
                let q1=`UPDATE users SET user='${newUsername}' WHERE id='${id}'`;
                connection.query(q1,(err,result)=>{
                    if(err)
                    {
                        throw err;
                    }
                    res.redirect("/user");

                })
            }
        });    
    }catch(err)
    {
        console.error("Unexpected result structure:", result);
        res.send("Unexpected database response");
    }
})
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});