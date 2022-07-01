const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendMail = require('./verificationMail')

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
                        message: 'This email is already registered, please Sign In',
                    })
                } else {
                    const hashedPassword = bcryptjs.hashSync(password, 10)

                    userExists.from.push(from)
                    userExists.password.push(hashedPassword)
                    res.json({
                        success: true,
                        from: from,
                        message: "Added " + from + " at your options for sign in"
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
                        message: 'Congratulations. User created with ' + from,
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
                            message: 'You are not registered. If you want to sign in with this method you must be registered with ' + from,
                        })
                    }
                } else {
                    if (samePassword.length > 0) {
                        const userData = {
                            id: userLogin._id,
                            firstName: userLogin.firstName,
                            lastName: userLogin.lastName,
                            email: userLogin.email,
                            from: from,
                        }
                        await userLogin.save()
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
            res.redirect("http://localhost:3000/")
        }
        else {
            res.json({
                success: false,
                message: `This email has not account yet!`
            })
        }
    }

}

module.exports = userControllers