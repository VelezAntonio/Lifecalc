const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const { append } = require("express/lib/response");

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
    

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error,results) =>{
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

        let hashedPassword = await bcrypt.hash(password, 8);
        db.query('INSERT INTO users SET ?', {email: email, password: hashedPassword}, (error,results) => {
            if(error){
                console.log(error);
            }else{
                console.log(results)
                return res.render('signup', {
                    message:'User Registered!'
                });
            }
        })
});

}
exports.login = async (req, res)  => {
    try {
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).render('login',{
                message: 'Please enter an Email and Password!'
            })
        }
            //authenticate user

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            // if user not found
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'Incorrect Email/Password!'
                })
            }
            else { // if user found
                const id = results[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is: "+token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    //only able to set up cookies if httponly is true
                    httpOnly: true
                }
                
                res.cookie('jwt',token, cookieOptions);
                res.status(200).render('home');
            }
        })
    } catch (error) {
        console.log(error);
    }

    const { email, password } = req.body
    let hashedPassword = await bcrypt.hash(password, 8);


}