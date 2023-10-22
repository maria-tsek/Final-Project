import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Implement your user registration logic here
        const user = {
          name: credentials.username,
          email: credentials.username + "@example.com",
        };

        if (user) {
          // Return the user object if registration is successful
          return Promise.resolve(user);
        } else {
          // Return null if registration fails
          return Promise.resolve(null);
        }
      },
    }),
  ],
  // Other NextAuth configuration...
});
