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
const zod_1 = require("zod");
const JWT_SECRET_KEY = "randomilovekiara";
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
    try {
        const { username, password } = req.body;
        const user = yield db_1.UserModel.findOne({ username });
        if (!user || !user.password || !password) {
            return res.status(403).json({ message: user ? "Enter password" : "No such user found" });
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(403).json({ message: "Wrong password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, JWT_SECRET_KEY);
        return res.status(200).json({ message: "Signed in successfully!", token });
    }
    catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}));
app.post("/api/post/content", (req, res) => {
});
app.get("/api/get/content", (req, res) => {
});
app.delete("/api/delete/content", (req, res) => {
});
app.listen(3000);
