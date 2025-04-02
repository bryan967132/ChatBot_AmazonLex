import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/Chat.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', chatRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});