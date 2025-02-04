"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminProtect = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        return res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
exports.default = { adminProtect };
