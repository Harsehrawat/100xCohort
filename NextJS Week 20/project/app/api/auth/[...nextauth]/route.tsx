import NextAuth  from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";

console.log(process.env.NEXTAUTH_SECRET);

const handler = NextAuth( {
    providers : [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Sign in with credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "harsehrawat@gmail.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const username = credentials?.username;
              const password = credentials?.password;
              console.log(username);
              console.log(password);
              
              const user = {
                name : "Harsh",
                id : "1",
                username : "harsehrawat@gmail.com"
              }
        
              // If no error and we have user data, return it
              if(user){
                return user
              }else{
                return null;
              }
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET
} );

export {handler as GET, handler as POST};

