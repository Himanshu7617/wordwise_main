
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
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
userRoutes.post('/signup', async(c ) => { 
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }
        }
        
    }).$extends(withAccelerate());

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
        data: { email, name, password : hashed },
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
    
    }).$extends(withAccelerate());

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
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return c.json({ message: 'Invalid password' }, 400);
    }

    //generate JWT token
    const token = await sign({ userId: existingUser.id, userEmail: existingUser.email }, c.env.JWT_SECRET);

    return c.json({ token, user: { id: existingUser.id, email: existingUser.email, name: existingUser.name }, message: "User logged in successfully" }, 200);

});

userRoutes.get('/getUserByEmail/:email', async(c) => {
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }, 
        }}).$extends(withAccelerate());
    const email = c.req.param('email');
    
    if(!email) { 
        return c.json({ message: 'Email query parameter is required' }, 400);
    }
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true }
    });
    if (!user) {
        return c.json({ message: 'User not found' }, 404);
    }
    const token = await sign({ userId: user.id, userEmail: user.email }, c.env.JWT_SECRET);

    return c.json({ token, user: { id: user.id, email: user.email, name: user.name }, message: "User does exists" }, 200);
})

export default userRoutes;
