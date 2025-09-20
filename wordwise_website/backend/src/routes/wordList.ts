/**
 * authenticate user token - middleware
 * getallWords of that user - given an user -> return a list of all words
 * create new word for that user
 * 
 */
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify as verifyToken } from 'hono/jwt';



const wordListRoutes = new Hono<{
    Bindings: { 
        DATABASE_URL : string, 
        JWT_SECRET : string
    },  
    Variables: {
        userId : string,    
    }
}>();

//middleware to authenticate user token
wordListRoutes.use(async (c, next) => {
    const authHeader = c.req.header('Authorization') || '';

    if (!authHeader) {
        return c.json({ message: 'Authorization header missing' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return c.json({ message: 'Invalid authorization header format' }, 401);
    }

    try {
        const payload = await verifyToken(token, c.env.JWT_SECRET);
        if(payload.id) { 
            
            c.set('userId', payload.id as string);
        }

    } catch (error) {
        return c.json({ message: 'Invalid or expired token' }, 401);
    }

    await next();
});

//create a new word for that user 
wordListRoutes.post('/addnewword', async(c) => { 
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }, 
        },
        extensions: [withAccelerate()],
    });

    const { word, meaning, exampleSentence } = await c.req.json();

    const userId = c.get('userId');
    if(!userId) { 
        return c.json({ message: 'User not authenticated' }, 401);
    }

    // check if word already exists for that user
    const existingWord = await prisma.word.findFirst({
        where: { word, userId },
    });

    if (existingWord) {
        return c.json({ message: 'Word already exists' }, 400);
    }
    const newWord = await prisma.word.create({
        data: { word, meaning, exampleSentence, userId },
    });

    return c.json({ word: newWord, message: 'Word added successfully' }, 201);

});
// get all words of that user
wordListRoutes.get('/allwords', async(c) => {
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }, 
        },
        extensions: [withAccelerate()],
    });

    const userId = c.get('userId');
    if(!userId) { 
        return c.json({ message: 'User not authenticated' }, 401);
    }

    const words = await prisma.word.findMany({
        where: { userId },
    });
    return c.json({ words });

});


export default wordListRoutes;