import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRoutes from './routes/user';
import wordListRoutes from './routes/wordList';

const app = new Hono()

app.use("/*", cors());

app.route('/auth', userRoutes);
app.route('/wordlist', wordListRoutes);

app.get('/', (c) => {
    return c.json({ message: 'Welcome to WordWise API' });
});
export default app;



1