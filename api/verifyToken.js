import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(403).send("Token not valid!");
      }

      req.user = decoded;
      next();
    });
  } else {
    res.status(403).send("You are not authanticated!");
  }
};

export default verify;

// The decoded constant will contain the payload of the JWT (JSON Web Token) after it has been successfully verified and decoded. The payload is the middle part of the JWT, which contains the claims or the data encoded in the token.

// In the jwt.verify command line there are 3 parameters first is the token that we want to verify, 2nd is the secrect key and the 3rd one is a callback function which returns err is something wents wrong and a decoded payload which we have sent into accessToken while loggingIn. This is how it works.

// It is also not required to store the payload data always into the req.user, we can store that decoded data from the token into any other property that we want to, req.user is just a convention used, we can use whatever property that makes sense with our application. Like an example,
// jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//   if (err) {
//     res.status(403).send("Token not valid!");
//   }

//   req.decodedPayload = decoded;
//   next();
// });

// const username = req.decodedPayload.username;
// This is how it is done.
