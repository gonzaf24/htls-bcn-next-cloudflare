import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createUser } from '@/lib/actions';
import { RegisterUser } from '@/lib/interfaces';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  theme: {
    logo: '/htsl-logo.png',
    colorScheme: 'auto',
  },
  providers: [Google],
  callbacks: {
    /*  authorized({ request, auth }) {
      console.log("authorized ----> ", auth);
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      console.log("jwt ----> ", token, " trigger ----> ", trigger, " session ----> ", session);
      if (trigger === "update") token.name = session.user.name
      return token
    }, */
    async signIn({ user, account, profile, email, credentials }) {
      const userAttempt = {
        name: user.name || '',
        email: user.email || '',
        image: user.image || '',
      };

      // Intentar registrar al usuario en la base de datos
      const response = await createUser(userAttempt as RegisterUser);

      // Si se registró correctamente y se devolvió información del usuario
      if (response.success) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token, user }) {
      /* try {
        const cachedUserData = getUserFromCache(session.user.email);
        if (cachedUserData) {
          session.user.id = cachedUserData.id;
          console.log('THERE is a user in cache');
        } else if (session.user.email) {
          console.log(' ####### ---Searching user in BD--- ######## ');
          const userDataFromDB = await fetchUser(session.user.email);
          cacheUser(session.user.email, userDataFromDB);
          session.user.id = userDataFromDB.id;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } */
      return session;
    },
  },
});
