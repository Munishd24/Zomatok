const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");


async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies.token;
    
    console.log('[Auth Food Partner] Cookies received:', req.cookies);
    console.log('[Auth Food Partner] Token:', token ? 'Present' : 'Missing');

    if (!token) {
        console.log('[Auth Food Partner] No token found - 401');
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('[Auth Food Partner] Token decoded, partner ID:', decoded.id);

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        
        if (!foodPartner) {
            console.log('[Auth Food Partner] Food partner not found in DB - clearing invalid cookie');
            // Clear the invalid cookie
            res.clearCookie("token", { httpOnly: true, sameSite: 'Lax', path: '/' });
            return res.status(401).json({
                message: "Food partner account not found. Please login again.",
                clearCookie: true
            })
        }

        console.log('[Auth Food Partner] Authenticated:', foodPartner.email);
        req.foodPartner = foodPartner

        next()

    } catch (err) {
        console.log('[Auth Food Partner] Token verification failed:', err.message);
        // Clear invalid token
        res.clearCookie("token", { httpOnly: true, sameSite: 'Lax', path: '/' });
        return res.status(401).json({
            message: "Invalid or expired token. Please login again.",
            clearCookie: true
        })

    }

}

async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;
    
    console.log('[Auth User] Cookies received:', req.cookies);
    console.log('[Auth User] Token:', token ? 'Present' : 'Missing');

    if (!token) {
        console.log('[Auth User] No token found - 401');
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('[Auth User] Token decoded, user ID:', decoded.id);

        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            console.log('[Auth User] User not found in DB - clearing invalid cookie');
            // Clear the invalid cookie
            res.clearCookie("token", { httpOnly: true, sameSite: 'Lax', path: '/' });
            return res.status(401).json({
                message: "User account not found. Please login again.",
                clearCookie: true
            })
        }

        console.log('[Auth User] Authenticated:', user.email);
        req.user = user

        next()

    } catch (err) {
        console.log('[Auth User] Token verification failed:', err.message);
        // Clear invalid token
        res.clearCookie("token", { httpOnly: true, sameSite: 'Lax', path: '/' });
        return res.status(401).json({
            message: "Invalid or expired token. Please login again.",
            clearCookie: true
        })

    }

}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}