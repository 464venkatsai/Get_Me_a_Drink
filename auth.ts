import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import User from "./models/User";
import ConnectDb from "./db/ConnectDB";
export const { handlers, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        if(account?.provider=="github"){
            await ConnectDb()
            const currentUser = await User.findOne({email:user.email})
            console.log(currentUser)
            if(!currentUser){
                const newUser = new User({
                    username: user.name,
                    email: user.email,
                })
                console.log(newUser)
                newUser.save();
            }
        }
        return true;
    },
    async session({ session, user, token }) {
        const dbUser = await User.findOne({email:session.user.email})
        if(dbUser){
            session.user.name = dbUser.username;
        }
        return session
      },
  },
});