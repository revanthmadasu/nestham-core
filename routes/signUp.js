const { DB_NAMES, COLLECTION_NAMES } = require('../constants/db-collections.constants');
const { STATUS, STATUS_MESSAGES, STATUS_CODE } = require('../constants/util.constants');
const mongoClient = require('../helpers/mongoClient');
const { getFormattedResponse } = require('../helpers/response-format');

module.exports = {
    async createUser(req, res) {
        const reqBody = req.body;
        const user = {
            name: reqBody.name,
            user_name: reqBody.userName,
            password: reqBody.password,
            date_of_birth: reqBody.dateOfBirth,
            email: reqBody.email,
            contact_number: reqBody.contactNumber,
            address: reqBody.address || "",
            authType: reqBody.authType || "manual",
            followers: [],
            following: [],
            posts: []
        };
        if (!isValidPassword()) {
            res.send(getFormattedResponse(STATUS.ERROR, {message: "Password format is not proper"}, STATUS_MESSAGES.CLIENT_ERROR, STATUS_CODE.CLIENT_ERROR));
            return;
        }
        try {
            const result = await mongoClient.findOne(DB_NAMES.MAIN, COLLECTION_NAMES.USERS, {
                user_name: reqBody.userName
            });
            if (result) {
                console.log('User already exists');
                res.send(getFormattedResponse(STATUS.ERROR, {}, STATUS_MESSAGES.DATA_REDUNDANT_ERROR, STATUS_CODE.CLIENT_ERROR));
                return;
            }
        } catch (err) {
            console.error('Exception in checking whether user is there or not\n', err);
            res.send(getFormattedResponse(STATUS.ERROR, {}, STATUS_MESSAGES.INTERNAL_ERROR, STATUS_CODE.INTERNAL_ERROR));
            return;
        }
        try {
            const userId = await mongoClient.insertOne(DB_NAMES.MAIN, COLLECTION_NAMES.USERS, user);
            if (!userId) {
                console.log(`Cannot create user.`);
                res.send(getFormattedResponse(STATUS.ERROR, {}, STATUS_MESSAGES.INTERNAL_ERROR, STATUS_CODE.INTERNAL_ERROR))
            } else {
                console.log(`Successfully created. User Id is ${userId.insertedId || userId}`);
                res.send(getFormattedResponse(STATUS.SUCCESS, {
                    userId: userId.insertedId || userId
                }, STATUS_MESSAGES.SUCCESS, STATUS_CODE.SUCCESS));
            }
        } catch (err) {
            console.error('Exception in inserting user\n', err);
            res.send(getFormattedResponse(STATUS.ERROR, {}, STATUS_MESSAGES.INTERNAL_ERROR, STATUS_CODE.INTERNAL_ERROR));
            return;
        }
    },
    async login(req, res) {
        const reqBody = req.body;
        const {userName, password} = reqBody;
        try {
            const user = await mongoClient.findOne(DB_NAMES.MAIN, COLLECTION_NAMES.USERS,{user_name: userName});
            if (user) {
                if (user.password === password) {
                    res.send(getFormattedResponse(STATUS.SUCCESS, {message: "Login Successful"}, STATUS_MESSAGES.SUCCESS, STATUS_CODE.SUCCESS));
                } else {
                    console.log('Wrong password');
                    res.send(getFormattedResponse(STATUS.ERROR, undefined, "Wrong Password", STATUS_CODE.CLIENT_ERROR));
                }
            } else {
                console.log('User does not exist');
                res.send(getFormattedResponse(STATUS.ERROR, {}, STATUS_MESSAGES.DATA_ERROR, STATUS_CODE.DATA_ERROR));
            }
        } catch(e) {
            console.error(`Error in login method. Exception is ${e}`);
            res.send(getFormattedResponse(STATUS.ERROR, {}, STATUS_MESSAGES.INTERNAL_ERROR, STATUS_CODE.INTERNAL_ERROR));
        }
    }
}