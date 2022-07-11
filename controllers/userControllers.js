const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendMail = require('./verificationMail')
const jwt = require('jsonwebtoken')

const userControllers = {
    signUpUser: async (req, res) => {
        let { firstName, lastName, photoUser, email, password, from, country } = req.body.userData
        try {
            const verification = false
            const uniqueString = crypto.randomBytes(15).toString('hex')
            const userExists = await User.findOne({ email })
            if (userExists) {
                if (userExists.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from: from,
                        message: 'This email is already registered, please Log in',
                    })
                } else {
                    const hashedPassword = bcryptjs.hashSync(password, 10)
                    userExists.from.push(from)
                    userExists.password.push(hashedPassword)
                    userExists.verification = true
                    await userExists.save()
                    res.json({
                        success: true,
                        from: from,
                        message: "This email is already registered, please Log in"
                    })
                }
            } else {
                const hashedPassword = bcryptjs.hashSync(password, 10)
                const newUser = await new User({
                    firstName,
                    lastName,
                    photoUser,
                    email,
                    verification,
                    country,
                    uniqueString: uniqueString,
                    password: [hashedPassword],
                    from: [from]
                })
                if (from !== 'form-Signup') {
                    await newUser.save()
                    await sendMail(email, uniqueString)
                    res.json({
                        success: true,
                        from: from,
                        message: 'We send you and email verification, please check your mailbox',
                    })
                } else {
                    await newUser.save()
                    await sendMail(email, uniqueString)
                    res.json({
                        success: true,
                        from: from,
                        message: 'Congratulations! User created, please check your account to verify your email address',
                    })
                }
            }
        } catch (error) {
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes', console: console.log(error) })
        }
    },


    signInUser: async (req, res) => {
        const { email, password, from } = req.body.logedUser
        try {
            const userLogin = await User.findOne({ email })
            if (!userLogin) {
                res.json({
                    success: false,
                    from: from,
                    message: `The entered ${email} does not exist. Please signUp`
                })
            } else {
                if (from !== 'form-SignUp') {
                    let samePassword = userLogin.password.filter(pass => bcryptjs.compareSync(password, pass))
                    if (samePassword.length > 0) {

                        const userData = {
                            id: userLogin._id,
                            firstName: userLogin.firstName,
                            lastName: userLogin.lastName,
                            photoUser: userLogin.photoUser,
                            email: userLogin.email,
                            password: userLogin.password,
                            from: userLogin.from,
                        }
                        await userLogin.save()
                        const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: 'Welcome back ' + userData.firstName,

                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: 'Invalid user or password',
                        })
                    }
                } else {
                    if (samePassword.length > 0) {
                        const userData = {
                            id: userLogin._id,
                            firstName: userLogin.firstName,
                            lastName: userLogin.lastName,
                            photoUser: userLogin.photoUser,
                            email: userLogin.email,
                            from: from,

                        }
                        await userLogin.save()
                        const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                        res.json({
                            success: true,
                            from: from,
                            response: userData,
                            message: 'Welcome back ' + userData.firstName,

                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: 'User name or password incorrect'
                        })
                    }
                }
            }
        } catch (error) {
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes.' })
        }
    },

    verifyMail: async (req, res) => {
        const { string } = req.params
        const user = await User.findOne({ uniqueString: string })
        console.log(user)
        if (user) {
            user.verification = true
            await user.save()
            res.redirect("http://localhost:3000/login")
        }
        else {
            res.json({
                success: false,
                message: `This email has not account yet!`
            })
        }
    },

    verifyToken: (req, res) => {
        console.log(req.user)
        if (req.user) {
            res.json({
                success: true,
                response: { id: req.user.id, firstName: req.user.firstName, email: req.user.email, photoUser: req.user.photoUser, from: "token" },
                message: "Welcome again " + req.user.firstName
            })
        } else {
            res.json({
                success: false,
                message: "Error. Please login again"
            })
        }
    },

    getAllUsers: async (req, res) => {
        let users
        let error = null
        try {
            users = await User.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { users },
            success: error ? false : true,
            error: error
        })
    },


}

module.exports = userControllers