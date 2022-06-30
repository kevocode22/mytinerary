const User = require('../models/user')
const bcryptjs = require('bcryptjs')


const userControllers = {
    signUpUser: async (req, res) => {
        let { firstName, lastName, photoUser, email, password, from } = req.body.userData
        try {
            const userExists = await User.findOne({ email })
            if (userExists) {
                if (userExists.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from: 'signup',
                        message: 'This email is already registered, please Sign In'
                    })
                } else {
                    const hashedPassword = bcryptjs.hashSync(password, 10)

                    userExists.from.push(from)
                    userExists.password.push(hashedPassword)
                    res.json({
                        success: true,
                        from: 'signup',
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
                    password: [hashedPassword],
                    from: [from]
                })
                if (from !== 'form-SignUp') {
                    await newUser.save()
                    res.json({
                        success: true,
                        from: 'signup',
                        message: 'Congratulations. User created with ' + from
                    })
                } else {
                    await newUser.save()
                    res.json({
                        success: true,
                        from: 'signup',
                        message: 'We send you and email verification, please check your mailbox'
                    })
                }
            }
        } catch (error) {
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes'})
        }
    },


    signInUser: async (req, res) => {
        const { email, password, from } = req.body.logedUser
        try {
            const userLogin = await User.findOne({ email })
            const indexpass = userLogin.from.indexOf(from)
            if (!userLogin) {
                res.json({
                    success: false,
                    from: "no from",
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

}

module.exports = userControllers