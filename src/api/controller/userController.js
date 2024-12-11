const UserService = require('../../services/user-service')
const service = new UserService();

class UserController{
    async GetUser(req, res, next){
        try {
            const user = req.user;

            const { data } = await service.GetUserData(user._id)
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController