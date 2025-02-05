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
const db_1 = require("./db");
const db_2 = require("./db");
const zod_1 = require("zod");
// import { userMiddleware } from "./middleware";
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON request bodies.
app.use((0, cors_1.default)()); // Middleware to allow cross-origin requests.
// Zod schema for validation
const signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(10),
    password: zod_1.z.string().min(7).max(15).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[@,?,!,$,%,&,*]/)
});
app.post("/api/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = signUpSchema.parse(req.body);
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
        if (error instanceof zod_1.z.ZodError) {
            return res.status(411).json({
                message: "Invalid input"
            });
        }
        console.log("Server error", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
app.post("/api/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Ensure that verifyUsername is of type IUser
        const verifyUsername = yield db_1.UserModel.findOne({ username });
        // If user exists
        if (verifyUsername) {
            // Compare the provided password with the stored hashed password
            const verifyPass = yield bcrypt_1.default.compare(password, verifyUsername.password);
            // If passwords match, generate a JWT token and send it back
            if (verifyPass) {
                const token = jsonwebtoken_1.default.sign({ id: verifyUsername._id }, config_1.JWT_SECRET_KEY);
                res.status(200).json({ token });
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
    const { title, link } = req.body;
    yield db_2.ContentModel.create({
        title,
        link,
        userId: req.userId,
        tags: [],
    });
    res.status(200).json({ message: "Content Added!" });
}));
app.get("/api/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    // from contentModel return content w/ this userId
    try {
        const resp = yield db_2.ContentModel.find({ userId: userId }).populate("userId", "username");
        if (resp.length != 0) {
            res.status(200).json({ resp });
        }
        else {
            res.status(404).json({ message: "you have added nothing yet" });
        }
    }
    catch (e) {
        console.log("server error " + e);
    }
}));
app.delete("/api/delete/content", (req, res) => {
});
app.listen(3000);
