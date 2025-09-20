/**
 * user tasks 
 * authentication 
 * get user by email
 * create user
 * update user 
 * delete user 
 * get all users
 * get user by id
 * 
 */

/**
 * user sign in  -> /auth/signin -> sends email, name, password -> return JWT token and user data + if have account with email then return error
 * user login -> /auth/login -> sends email, password -> return JWT token and user data + if no account with email then return error
 * 
 * 
 */


import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';


const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL : string, 
        JWT_SECRET : string
    }, 
    Variables: {
        userId : string, 
        email : string, 
    }
}>();


// authentication routes
userRoutes.post('/singup', async(c ) => { 
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }, 
        },
        extensions: [withAccelerate()],
    });

    //get data from request body
    const { email, name, password } = await c.req.json();

    //check if user with email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return c.json({ message: 'User with this email already exists' }, 400);
    }

    //create new user
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: { email, name, hashed },
    });

    //generate JWT token
    const token = await sign({ userId : newUser.id, userEmail : newUser.email}, c.env.JWT_SECRET);

    return c.json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name } , message : "User created successfully"}, 201);

})

userRoutes.post('/login', async(c) => { 

    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }, 
        },
        extensions: [withAccelerate()],
    });

    //get data from request body
    const { email, password } = await c.req.json();

    //check if user with email exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        return c.json({ message: 'No user with this email exists' }, 400);
    }

    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.hashed);
    if (!isPasswordValid) {
        return c.json({ message: 'Invalid password' }, 400);
    }

    //generate JWT token
    const token = await sign({ userId: existingUser.id, userEmail: existingUser.email }, c.env.JWT_SECRET);

    return c.json({ token, user: { id: existingUser.id, email: existingUser.email, name: existingUser.name }, message: "User logged in successfully" }, 200);

});


export default userRoutes;
