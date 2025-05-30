"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import from other files
const db_1 = require("./db");
const db_2 = require("./db");
const db_3 = require("./db");
const utils_1 = require("./utils");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON request bodies.
app.use((0, cors_1.default)()); // Middleware to allow cross-origin requests.
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    frameguard: { action: "deny" }
}));
// Zod schema for validation
const Joi = require("joi");
const inputValidation = Joi.object({
    username: Joi
        .string()
        .min(3)
        .max(15)
        .pattern(/^[a-z0-9]+$/)
        .messages({
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username can't be longer than 15 characters",
        "string.pattern.base": "Username can only contain lowercase letters and numbers"
    })
        .required(),
    password: Joi
        .string()
        .min(5)
        .max(15)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&]).*$/)
        .messages({
        "string.min": "Password must be at least 5 characters long",
        "string.max": "Password can't be longer than 15 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, &)"
    })
        .required()
});
app.post("/api/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = inputValidation.validate(req.body);
    if (error) {
        return res.status(403).json({ message: error.details[0].message });
    }
    try {
        console.log("inside /api/signup");
        const { username, password } = req.body;
        console.log("searching for :" + req.body.username + " ,password :" + req.body.password);
        // Check if user already exists
        const ifUserExists = yield db_1.UserModel.findOne({ username });
        if (ifUserExists) {
            return res.status(403).json({
                message: "Username already taken"
            });
        }
        // Hash password and create user
        const hashedPass = yield bcrypt_1.default.hash(password, 5);
        yield db_1.UserModel.create({
            username,
            password: hashedPass
        });
        res.status(200).json({
            message: "Signup successful"
        });
    }
    catch (error) {
        console.log("Server error at /signup BE :", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
app.post("/api/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const verifyUsername = yield db_1.UserModel.findOne({ username });
        // If user exists
        if (verifyUsername) {
            // Compare the provided password with the stored hashed password
            const verifyPass = yield bcrypt_1.default.compare(password, verifyUsername.password);
            // If passwords match,generate a JWT token and send it back
            if (verifyPass) {
                const token = jsonwebtoken_1.default.sign({ id: verifyUsername._id }, config_1.JWT_SECRET_KEY);
                res.status(200).json({ token, message: "Login Successfull" });
            }
            else {
                res.status(403).json({ message: "Incorrect password" });
            }
        }
        else {
            res.status(403).json({ message: "Username not found" });
        }
    }
    catch (error) {
        console.log("Server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.post("/api/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    try {
        if (title == null || link === null || type === null) {
            res.status(400).json({ message: "can't submit null entry" });
        }
        else {
            yield db_2.ContentModel.create({
                title,
                link,
                type,
                userId: req.userId,
                tags: [],
            });
            res.status(200).json({ message: "Content Added!" });
        }
    }
    catch (e) {
        console.log("server error in app.post(/api/content)" + e);
        res.status(500).json({ message: "server error" });
    }
}));
app.get("/api/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    // from content model return content w/ this user id
    try {
        const user = yield db_1.UserModel.findOne({ _id: userId }).select("username");
        const content = yield db_2.ContentModel.find({ userId: userId });
        if (content.length != 0)
            res.status(200).json({ content, username: user === null || user === void 0 ? void 0 : user.username });
        else
            res.status(200).json({ message: "you have added nothing yet", username: user === null || user === void 0 ? void 0 : user.username });
    }
    catch (e) {
        res.status(500).json({ message: "server error" });
        console.log("error in .get(/api/content)");
    }
}));
app.get("/api/content/:type", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { type } = req.params;
    // from contentModel return content w/ this userId
    try {
        // fetch username to always display regardless if any content added or not
        const user = yield db_1.UserModel.findOne({ _id: userId }).select("username");
        const content = yield db_2.ContentModel.find({ userId: userId }).populate("userId", "username");
        const contentType = content.filter((i) => i.type === type);
        if (content.length != 0) {
            res.status(200).json({ contentType, username: user === null || user === void 0 ? void 0 : user.username });
        }
        else {
            res.status(200).json({ message: "you have added nothing yet", username: user === null || user === void 0 ? void 0 : user.username });
        }
    }
    catch (e) {
        console.log("server error " + e);
    }
}));
app.delete("/api/delete/content/:contentId", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    // find and return 
    try {
        yield db_2.ContentModel.deleteMany({
            _id: contentId,
        });
        res.status(200).json({ message: "deleted successfully" });
    }
    catch (e) {
        console.log("server eror in content delete" + e);
        res.status(403).json({ message: e });
    }
}));
app.post("/api/share/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    try {
        if (share) {
            const existingLink = db_3.LinkModel.findOne({ userId: req.userId });
            if (!existingLink) {
                // create new and return
                const hash = (0, utils_1.random)(10);
                yield db_3.LinkModel.create({ userId: req.userId, hash });
                res.status(200).json({ message: `/api/share/${hash}` });
            }
            else {
                // delete existing link and return new to user and db
                yield db_3.LinkModel.deleteOne({ userId: req.userId });
                const hash = (0, utils_1.random)(10);
                yield db_3.LinkModel.create({ userId: req.userId, hash });
                res.status(200).json({ message: `/api/share/${hash}` });
            }
        }
        else {
            yield db_3.LinkModel.deleteOne({ userId: req.userId });
            res.status(200).json({ message: "link deleted" });
        }
    }
    catch (e) {
        console.log("error in /api/share/content :" + e);
        res.status(403).json({ message: "server error" });
    }
}));
app.get("/api/share/:sharableLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharableLink;
    // verify hash is associated w/ LinkModel
    const link = yield db_3.LinkModel.findOne({ hash });
    if (!link) {
        res.status(411).json({ message: "invalid link / no such link exists" });
        return;
    }
    // if such link found , return content and username
    const content = yield db_2.ContentModel.find({ userId: link.userId });
    // fetching userDetails from UserModel
    const user = yield db_1.UserModel.findOne({ _id: link.userId });
    const username = user === null || user === void 0 ? void 0 : user.username;
    if (!content) {
        res.status(404).json({ message: "empty link / no content added by user associated w/ this link", username });
    }
    // if content found , return content and username
    res.status(200).json({ username, content });
}));
app.listen(3000);
