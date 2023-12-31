import jwt from "jsonwebtoken";
const JWT = process.env.JWT_SECRET;

const createToken = (payload: object) => {
    const token = jwt.sign(payload, JWT!, { expiresIn: process.env.JWT_LIFETIME });
    return token;
};

export const attachCookie = (res: Response | any, user: object | any) => {
    const token = createToken(user);

    const day = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + day),
        path: "/",
        samesite: "Lax",
        // secure: process.env.NODE_ENV === "production",
        // signed: true,
    });
};

export const isTokenValid = (token: any) => jwt.verify(token, JWT!);

export const createUserPayLoad = (user: object | any) => {
    return { username: user.username, userId: user._id, role: user.role };
};
