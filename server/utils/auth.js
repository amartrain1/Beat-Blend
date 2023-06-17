const jwt = require("jsonwebtoken");
const secret = "secret";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    console.log(token, ' (ding!)');
    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data,'hello!')
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  }, 
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    console.log(payload);
    return jwt.sign({data:payload}, secret, { expiresIn: expiration })
  },
};
