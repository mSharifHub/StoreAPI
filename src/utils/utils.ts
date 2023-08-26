import jwt from "jsonwebtoken";
const JWT = process.env.JWT_SECRET;

export const createToken = (payload: object) => {
    const token = jwt.sign(payload, JWT!, { expiresIn: process.env.JWT_LIFETIME });
    return token;
};

export const isTokenValid = (token: string | object | any) => jwt.verify(token, process.env.JWT_SECRET!);

