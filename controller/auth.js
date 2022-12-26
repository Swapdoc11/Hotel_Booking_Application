import User from '../model/users.js'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createError } from '../util/error.js'
export const register = async (req, res, next) => {
    try {

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) next(err)
            const newUser = new User({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                isAdmin: req.body.isAdmin
            })
            await newUser.save()
            res.status(200).json({ msg: 'User Registered Successfully' })
        })

    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        if (!req.body.username) return next(createError(401, "Provide Username"))

        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(401, "User Not Found"))

        const isValidUser = await bcrypt.compareSync(req.body.password, user.password)
        if (!isValidUser) return next(createError(401, "Password Incorrect"))

        const token = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS)

        console.log(token);
        const { password, isAdmin, ...otherdetails } = user._doc;
        res.cookie("access_token", token,
            { httpOnly: true })
            .status(200)
            .json({ ...otherdetails })

    } catch (error) {
        next(error)
    }

}
