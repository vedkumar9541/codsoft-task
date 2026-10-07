import cron from 'node-cron';
import { Server } from 'socket.io';
import { prisma } from '../prisma';
import { randomFloat, randomInt } from '../utils/helpers';

export const startSimulator = (io: Server) => {
  console.log('Starting real-time data simulator...');

  cron.schedule('*/30 * * * * *', async () => {
    try {
      // 1. Update Junction Congestion
      const junctions = await prisma.junction.findMany();
      const hour = new Date().getHours();
      let baseCongestion = 0.3; // default
      
      // Rush hours
      if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)) {
        baseCongestion = 0.7;
      } else if (hour >= 23 || hour <= 5) {
        baseCongestion = 0.1; // Night
      }

      for (const junction of junctions) {
        const variation = randomFloat(-0.15, 0.15);
        let newCongestion = baseCongestion + variation;
        newCongestion = Math.max(0, Math.min(1, newCongestion)); // clamp 0-1

        const updatedJunction = await prisma.junction.update({
          where: { id: junction.id },
          data: {
            congestionLevel: newCongestion,
            avgSpeed: Math.max(10, 60 - (newCongestion * 50)), // higher congestion = lower speed
            aqi: 100 + (newCongestion * 200) + randomFloat(-20, 20) // AQI correlated with traffic
          }
        });

        // Emit update
        io.emit('traffic:update', {
          junctionId: junction.id,
          congestion: updatedJunction.congestionLevel,
          speed: updatedJunction.avgSpeed,
          aqi: updatedJunction.aqi
        });
      }

      // Generate random incident occasionally (Poisson-like)
      if (Math.random() < 0.1) {
        const types = ['accident', 'fire', 'medical', 'traffic_jam'];
        const randomJunction = junctions[Math.floor(Math.random() * junctions.length)];
        
        const incident = await prisma.emergencyIncident.create({
          data: {
            type: types[Math.floor(Math.random() * types.length)],
            severity: Math.random() > 0.8 ? 'high' : 'medium',
            lat: randomJunction.lat,
            lng: randomJunction.lng,
            description: 'Simulated incident at ' + randomJunction.name,
            status: 'reported'
          }
        });

        io.emit('incidents:update', incident);
      }

      // City state broadast
      io.emit('city:state', { timestamp: new Date().toISOString(), message: 'State updated' });

    } catch (error) {
      console.error('Simulator error:', error);
    }
  });
};
