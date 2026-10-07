import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import { setupWebSocket } from './services/websocket';
import { startSimulator } from './services/simulator';

// Import Routes
import authRoutes from './routes/auth';
import cityRoutes from './routes/city';
import trafficRoutes from './routes/traffic';
import weatherRoutes from './routes/weather';
import aqiRoutes from './routes/aqi';
import incidentsRoutes from './routes/incidents';
import predictionsRoutes from './routes/predictions';
import alertsRoutes from './routes/alerts';
import analyticsRoutes from './routes/analytics';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.CORS_ORIGINS,
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: config.CORS_ORIGINS }));
app.use(helmet());
app.use(express.json());

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/traffic', trafficRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/aqi', aqiRoutes);
app.use('/api/incidents', incidentsRoutes);
app.use('/api/predictions', predictionsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Setup WebSockets
setupWebSocket(io);

// Start Simulator
startSimulator(io);

httpServer.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
