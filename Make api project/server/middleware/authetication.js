const jwt = require("jsonwebtoken")
const Auth = (req, res, next) => {
    const { token } = req.headers;
    var accessToken = token?.split(" ")[1];
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, 'asasa');
            req.user = decoded
            next()
        } catch (error) {
            res.status(400).json({ message: error?.message })
        }
    }
}
module.exports = Auth 