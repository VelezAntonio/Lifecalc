const mysql = require("mysql");

//create db connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.signup = (req,res) => {
    console.log(req.body);

    //grabs variables from form
    const { email,password,passwordConfirm } = req.body
    

    db.query('SELECT email FROM users WHERE email = ?', [email], (error,result) =>{
        if(error){
            console.log(error);
        }
        //if this returns more than 0 email exists already
        if(results.length > 0){
            return res.render('signup', {
                message: 'That Email is already in use'
            })
        }else if(password !== passwordConfirm) {
            return res.render('signup', {
                message:'Passwords do not match!'
            });
        }
    })

    
    res.send("Form submitted")
}