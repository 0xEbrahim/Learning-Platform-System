"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const roles_1 = require("../../enums/roles");
const userSchema = new mongoose_1.Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    email_confirmed: {
        type: Boolean,
        default: false,
    },
    emailConfirmationToken: {
        type: String,
    },
    emailConfirmationTokenExpires: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
        // select: false
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetTokenExpires: {
        type: Date,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: roles_1.roles.STUDENT,
    },
    active: {
        type: Boolean,
        default: true,
    },
    twoStepAuth: {
        type: Boolean,
    },
    OTP: {
        type: String,
    },
    OTPExpires: {
        type: Date,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = bcrypt_1.default.hashSync(this.password, 12);
    next();
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
userSchema.methods.generateEmailConfirmationToken = function () {
    const token = crypto_1.default.randomBytes(64).toString("hex");
    const encoded = crypto_1.default.createHash("sha256").update(token).digest("hex");
    this.emailConfirmationToken = encoded;
    this.emailConfirmationTokenExpires = Date.now() + 10 * 60 * 1000;
    return token;
};
exports.User = mongoose_1.default.model("User", userSchema);
