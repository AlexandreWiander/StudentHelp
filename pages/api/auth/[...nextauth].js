import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";

export const authOptions = {
  providers: [
    GoogleProvider({
      id: "GoogleProvider",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    Credentials({
      name: "Email",
      credentials: {
        mail: {
          label: "Email",
          type: "mail",
          placeholder: "exemple@gmail.com",
        },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {};

        const res = await fetch("http://localhost:3000/api/auth/connection", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        const token = response["token"];

        if (response.message == "L'utilisateur est connecté") {
          const decodedToken = jwt_decode(token);

          user.email =
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ];
          user.name =
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
          return user;
        } else {
          return error;
        }
      },
    }),
  ],
  callbacks: {
    async redirect() {
      return "/";
    },
  },
  pages: {
    signIn: "/connection/index",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
