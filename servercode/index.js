
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const app = express();


const multer = require('multer');


const { S3Client } = require('@aws-sdk/client-s3');
    
const multerS3 = require('multer-s3');


let s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: '${yourAPIKey}',
    secretAccessKey: '${yourSecretApiKey}'
  },
 
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'orionbucket1',
    acl:'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        'foodmart/' + Date.now().toString() + '-' + file.originalname
      );
    },
  }),
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  })
);







app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);




const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "alexa",
  database: "foodstore",
  multipleStatements:true
});

app.post("/signup", (req, res) => {
  const username = req.body.nickname;
  const password = req.body.password;
  const email = req.body.email
  const role = req.body.role
  const address = req.body.address


  console.log(username)
  console.log(password)
  console.log(email)
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO customers (`nickname`,`email`, `password`,`targetrole`,`address`) VALUES (?,?,?,?,?)",
      [username, email, hash,role,address],
      (err, result) => {
        if (err){
          console.log(err)
        }
        else{
          const jwtData = {result};
    const token = jwt.sign(jwtData, 'CODEBLESSYOU', { expiresIn: "2h" });
    res.send(token);
        }
        
      }
    );
  });
 
});


app.post('/login',function(req,res){
  const user_name = req.body.nickname;
  console.log(req.body.logusername);
  const user_password = req.body.password;
  console.log(user_password);
  if(user_name && user_password)
  {
      query = `
      SELECT * FROM customers
      WHERE nickname = "${user_name}"
      `;
      
      db.query(query, function(error, data){
        console.log(data)
        

          if(data.length > 0)
          {
          
                  if(data[0].password)
                  {
                    console.log(data[0].password, user_password)
               
                    
                    bcrypt.compare(user_password,data[0].password,function(err,result){
                    if (result){
                     
                     
                      const {password, ...other} = data[0] 
                      const token = jwt.sign(other, 'CODEBLESSYOU', { expiresIn: "2h" });
                      console.log(token)
                      superid = token.id
                      res.send(token);
                                    
                    

                    }
                   else if (err){
                    console.log("wrong password")
                    return res.sendStatus(401).json(err);
                    
                  
                   
                   }

                  });
                }
              }
              else{
                return res.status(401).json(error);
              }
          
           
              
            })
          
          }
        })
        app.get("/main/:id",(req, res) => {
          const id=req.params.id
          const q = `Select * from products limit 12; select * from products,  customers, wishlist where userid=customers.id and prodid=pid and userid=${id};`;
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return res.json(data);
          });
        });
        app.get("/myfoods/:id",(req, res) => {
          const id=req.params.id
          const q = `Select * from products where usersid=${id}; select * from products,  customers, wishlist where userid=customers.id and prodid=pid and userid=${id} and usersid=${id};`;
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return res.json(data);
          });
        });
        app.get("/cheapfoods/:id",(req, res) => {
          const id=req.params.id
          const q = `Select * from products order by price asc limit 10; select * from products,  customers, wishlist where userid=customers.id and prodid=pid and userid=${id} and usersid=${id};`;
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return res.json(data);
          });
        });
        app.post("/main/:id",(req, res) => {
          const id=req.params.id
          const search=req.body.search
          var q = `Select * from products `
          if (search){
            q+=` where pname='${search}'`
          }
          
          q+=`
          ; select * from products,  customers, wishlist where userid=customers.id and prodid=pid and userid=${id}
          `
          if(search){
            q+=` and pname='${search}'`

          }
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return res.json(data);
          });
        });
        
        app.get('/cart/orders',(req,res)=>{
          const id = req.query.id
          const q = `SELECT * from orders, products where orders.custId = ${id} and orders.productId=products.pid`
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              
              return res.json(err);
            }
            return res.json(data);
          });
        
        })
        
  app.delete('/cart/remove/:pid/:id', (req, res, next) => {  
    const id = req.params.id
    const pid = req.params.pid
    console.log(id,pid)
    var q;
    


          
   q=`delete from orders where productId=${pid} and custId=${id}`


 


    console.log(q)
  
    
      db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
        ;
      }
    
      return res.json(data);
    
    });
    })
       
  app.delete('/products/:pid', (req, res, next) => {  
    const pid = req.params.pid
    var q;
    


          
   q=`delete from products where pid=${pid}`


 


    console.log(q)
  
    
      db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
        ;
      }
    
      return res.json(data);
    
    });
    })
           
        app.get('/categories',(req,res)=>{
          const q = `SELECT * from category`
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              
              return res.json(err);
            }
            return res.json(data);
          });
        
        })
        app.post('/cart/orders',(req,res)=>{
          const sign = req.query.sign
    
          const id = req.query.cId
          const pId = req.query.pId
          var q;
          
          if (sign=='+'){
             q = `Insert into orders ( productId,custId,quantity) values (${pId},${id},1) ON DUPLICATE KEY UPDATE quantity=quantity+1`


          }
          else{
            q = `UPDATE orders set quantity=quantity-1 where productId=${pId} and custId=${id} `

          }
           db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              
              return res.json(err);
            }
            return res.json(data);
          });
        

        })
      
         app.post("/profile/:id", (req, res) => {
         
          const id = req.params.id
          const firstname  = req.body.firstName
          const lastname = req.body.lastName
          const bio = req.body.bio
          const username  =req.body.nickname
          const address  =req.body.address

          const email =req.body.email
          console.log("id", id,firstname,lastname, bio,username,email)
          
  var q = `update customers set`;
  const conditionsArr = []; 
  if (email){
   conditionsArr.push(  ` email='${email}'`);
  }
 
  
  if (firstname){
     conditionsArr.push(  ` first_name='${firstname}'`);
 
 
  }
  if (lastname){
    conditionsArr.push(  ` last_name='${lastname}'`);


 }
  if(username){
       conditionsArr.push(  ` nickname='${username}'`);
 
 
  }
  if(address){
    conditionsArr.push(  ` address='${address}'`);


}
  if (bio){
       conditionsArr.push(  ` bio='${bio}'`);
 
 
  }
  
 q += conditionsArr.join(', '); 
 
 q += ` WHERE id = ${id}`;
   db.query(q, (err, data) => {
     if (err) {
       console.log(err);
       return res.json(err);
     }
     console.log(data)
     return res.json(data);
   });
 });
        app.get("/profile/info/:id", (req, res) => {
          const id = req.params.id
          console.log(id)
        
          const q = `SELECT * from customers where id = ${id};SELECT * from orders, products where orders.custId = ${id} and orders.productId=products.pid`;
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            console.log(data)
            return res.json(data);
          });
        });
         
        app.get("/foods/:department/:id", (req, res) => {
          console.log(1)
          const department = req.params.department
          const id=req.params.id
          console.log("d",department)
          const q = `Select categid into @catid from category where categname = "${department}";SELECT * from products where products.cat_id = @catid;select * from products,  customers, wishlist where userid=customers.id and prodid=pid and cat_id=@cat_id and userid=${id}`;
          console.log(q)
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            console.log(data)
            return res.json(data);
          });
        });

        app.post("/foods/:department/:id", (req, res) => {
          console.log(1)
          const department = req.params.department
          const search = req.body.search

          const id=req.params.id
          console.log("d",department)
          var q = `Select categid into @catid from category where categname = "${department}";SELECT * from products where products.cat_id = @catid`
          if (search){
            q+=` and pname='${search}'`


          }
          q+=           ` ;select * from products,  customers, wishlist where userid=customers.id and prodid=pid and cat_id=@cat_id and userid=${id}`

          
          if (search){
            q+=` and pname='${search}'`
          };
          console.log(q)
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            console.log(data)
            return res.json(data);
          });
        });
        app.get("/favourite/:id", (req, res) => {
          console.log(1)
          const id=req.params.id
          const q=`select * from products,  customers, wishlist where userid=customers.id and prodid=pid and userid=${id};`
          console.log(q)
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            console.log(data)
            return res.json(data);
          });
        });
        app.post("/favourite/:id", (req, res) => {
          console.log(1)
          const id=req.params.id
          const search=req.body.search
          var q=`select * from products,  customers, wishlist where userid=customers.id and prodid=pid and userid=${id}`
          if (search){
            q+=` and pname='${search}'`
          }
          console.log(q)
          db.query(q, (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            console.log(data)
            return res.json(data);
          });
        });
        app.post('/upload', upload.single('file'), (req, res, next) => {
         
          const title = req.body.title
          const weight = req.body.weight
          const cat = req.body.cat
          const price = Number(req.body.price)
          const author = req.body.author
          const usersid = req.body.usersid

          const image = req.file.location
       
    
      
      
         
          
      
             
          const q= `Select categid into @catid from category where categname = '${cat}';insert into products( usersid, pname,cat_id,prodimage, price, brand, weight) values (${usersid},'${title}',@catid,'${image}', ${price},'${author}','${weight}')`
      


        
        db.query(q, (err, data) => {
          if (err) {
            console.log(err);
            return res.json(err)
            ;
          }
          return res.json(data);
     
      });
  


       
      })
      
app.get('/quantity/:id/:userid', (req, res, next) => {  
  const id = req.params.id
  const userid = req.params.userid
  var q;
   q=`Select quantity as num  from orders where productId =${id} and custId=${userid}`
    console.log(q)
    db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err)
      ;
    }
   
      return res.json(data);

 
  
   
  
  });
  })
  app.post('/liked/:id/:userid/:sellerid', (req, res, next) => {  
    const id = req.params.id
    const userid = req.params.userid
    const sellerid = req.params.sellerid

 
    console.log(id,userid)
    var q;
    
   q=`Insert into wishlist ( userid,prodid,sellerid) values (${userid}, ${id},${sellerid})`


          


 


    console.log(q)
  
    
      db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
        ;
      }
    
      return res.json(data);
    
    });
    })
    
  app.post('/disliked/:id/:userid', (req, res, next) => {  
    const id = req.params.id
    const userid = req.params.userid
    console.log(id,userid)
    var q;
    


          
   q=`delete from wishlist where prodid=${id} and userid=${userid}`


 


    console.log(q)
  
    
      db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
        ;
      }
    
      return res.json(data);
    
    });
    })
   

       

        





app.listen(8800, () => {
  console.log("running server");
});
