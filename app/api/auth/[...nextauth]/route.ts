import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DataStore } from 'aws-amplify';
import { User } from '@/src/models';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        let user = null;
        // try {
        //    user = await DataStore.save(
        //     new User({
        //       name: 'My First Post',
        //       role: 'admin'
        //     })
        //   )
        // } catch(e) {
        //   return null;
        // }
        user = { id: 8, name: 'eic' }

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name
        }
      }
    })
  ],
  pages: {
    // signIn: '/auth/signin'
  },
  callbacks: {
    session: ({ session, token }): any => {
      return {
        ...session,
        user: token.user
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          user: {
            id: u.id,
            name: u.name
          }
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
