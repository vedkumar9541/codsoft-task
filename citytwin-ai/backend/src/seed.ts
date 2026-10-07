import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const landmarks = [
  { name: 'ITO Junction', lat: 28.6289, lng: 77.2406, type: 'signal' },
  { name: 'Connaught Place', lat: 28.6315, lng: 77.2167, type: 'roundabout' },
  { name: 'India Gate', lat: 28.6129, lng: 77.2295, type: 'roundabout' },
  { name: 'Red Fort', lat: 28.6562, lng: 77.2410, type: 'signal' },
  { name: 'Chandni Chowk', lat: 28.6506, lng: 77.2301, type: 'intersection' },
  { name: 'Kashmere Gate', lat: 28.6678, lng: 77.2284, type: 'signal' },
  { name: 'AIIMS Flyover', lat: 28.5672, lng: 77.2100, type: 'flyover' },
  { name: 'Hauz Khas', lat: 28.5494, lng: 77.2001, type: 'signal' },
  { name: 'Saket', lat: 28.5245, lng: 77.2066, type: 'signal' },
  { name: 'Dwarka Sector 21', lat: 28.5823, lng: 77.0500, type: 'signal' },
  { name: 'Rohini Sector 3', lat: 28.7325, lng: 77.1143, type: 'signal' },
  { name: 'Pitampura', lat: 28.6960, lng: 77.1314, type: 'intersection' },
  { name: 'Rajouri Garden', lat: 28.6468, lng: 77.1218, type: 'signal' },
  { name: 'Karol Bagh', lat: 28.6519, lng: 77.1907, type: 'intersection' },
  { name: 'Patel Nagar', lat: 28.6415, lng: 77.1650, type: 'signal' },
  { name: 'Nehru Place', lat: 28.5491, lng: 77.2533, type: 'signal' },
  { name: 'Lajpat Nagar', lat: 28.5700, lng: 77.2432, type: 'signal' },
  { name: 'Defence Colony', lat: 28.5747, lng: 77.2315, type: 'intersection' },
  { name: 'Moolchand', lat: 28.5689, lng: 77.2385, type: 'flyover' },
  { name: 'Pragati Maidan', lat: 28.6176, lng: 77.2495, type: 'signal' },
  { name: 'Akshardham', lat: 28.6127, lng: 77.2773, type: 'signal' },
  { name: 'Noida Mor', lat: 28.5805, lng: 77.3266, type: 'flyover' },
  { name: 'Mayur Vihar Phase 1', lat: 28.5937, lng: 77.2951, type: 'signal' },
  { name: 'Anand Vihar ISBT', lat: 28.6474, lng: 77.3157, type: 'signal' },
  { name: 'Dilshad Garden', lat: 28.6799, lng: 77.3171, type: 'intersection' },
  { name: 'Janakpuri West', lat: 28.6219, lng: 77.0867, type: 'signal' },
  { name: 'Vikaspuri', lat: 28.6389, lng: 77.0684, type: 'intersection' },
  { name: 'Mundka', lat: 28.6826, lng: 77.0286, type: 'signal' },
  { name: 'Narela', lat: 28.8526, lng: 77.0928, type: 'intersection' },
  { name: 'Burari Chowk', lat: 28.7606, lng: 77.1971, type: 'signal' },
  { name: 'GTB Nagar', lat: 28.6893, lng: 77.2094, type: 'signal' },
  { name: 'Model Town', lat: 28.7080, lng: 77.1903, type: 'intersection' },
  { name: 'Civil Lines', lat: 28.6775, lng: 77.2254, type: 'signal' },
  { name: 'Rajghat', lat: 28.6413, lng: 77.2496, type: 'intersection' },
  { name: 'Nizamuddin', lat: 28.5891, lng: 77.2468, type: 'signal' },
  { name: 'Sarai Kale Khan', lat: 28.5871, lng: 77.2566, type: 'flyover' },
  { name: 'Ashram Chowk', lat: 28.5685, lng: 77.2580, type: 'signal' },
  { name: 'Laxmi Nagar', lat: 28.6304, lng: 77.2775, type: 'signal' },
  { name: 'Preet Vihar', lat: 28.6369, lng: 77.2953, type: 'intersection' },
  { name: 'IP Extension', lat: 28.6260, lng: 77.3092, type: 'signal' },
  { name: 'Vasant Kunj', lat: 28.5197, lng: 77.1589, type: 'intersection' },
  { name: 'Mehrauli', lat: 28.5177, lng: 77.1758, type: 'signal' },
  { name: 'Qutub Minar', lat: 28.5245, lng: 77.1855, type: 'intersection' },
  { name: 'Green Park', lat: 28.5599, lng: 77.2072, type: 'signal' },
  { name: 'Safdarjung Enclave', lat: 28.5685, lng: 77.2085, type: 'intersection' },
  { name: 'RK Puram Sector 12', lat: 28.5636, lng: 77.1762, type: 'signal' },
  { name: 'Dhaula Kuan', lat: 28.5911, lng: 77.1659, type: 'flyover' },
  { name: 'Delhi Cantt', lat: 28.5915, lng: 77.1415, type: 'signal' },
  { name: 'Palam Flyover', lat: 28.5834, lng: 77.1009, type: 'flyover' },
  { name: 'IGI Airport T3', lat: 28.5562, lng: 77.0870, type: 'signal' },
  { name: 'Okhla Industrial', lat: 28.5303, lng: 77.2713, type: 'signal' },
  { name: 'Tughlakabad', lat: 28.5126, lng: 77.2617, type: 'intersection' },
  { name: 'Badarpur Border', lat: 28.5063, lng: 77.3024, type: 'signal' },
  { name: 'Faridabad Border', lat: 28.4982, lng: 77.3118, type: 'signal' },
  { name: 'Wazirabad', lat: 28.7152, lng: 77.2294, type: 'intersection' },
  { name: 'Shalimar Bagh', lat: 28.7150, lng: 77.1606, type: 'signal' },
  { name: 'Azadpur Mandi', lat: 28.7042, lng: 77.1775, type: 'signal' },
  { name: 'Mukherjee Nagar', lat: 28.7051, lng: 77.2098, type: 'intersection' },
  { name: 'Kingsway Camp', lat: 28.6951, lng: 77.2095, type: 'signal' },
  { name: 'Shastri Park', lat: 28.6710, lng: 77.2546, type: 'signal' },
  { name: 'Seelampur', lat: 28.6615, lng: 77.2665, type: 'intersection' },
  { name: 'Welcome Chowk', lat: 28.6534, lng: 77.2788, type: 'signal' },
  { name: 'Shahdara', lat: 28.6596, lng: 77.2882, type: 'signal' },
  { name: 'Vivek Vihar', lat: 28.6700, lng: 77.3102, type: 'intersection' },
  { name: 'Tri Nagar', lat: 28.6802, lng: 77.1642, type: 'intersection' },
  { name: 'Netaji Subhash Place', lat: 28.6913, lng: 77.1504, type: 'signal' },
  { name: 'Wazirpur Industrial', lat: 28.6975, lng: 77.1622, type: 'intersection' },
  { name: 'Peeragarhi Chowk', lat: 28.6688, lng: 77.0802, type: 'signal' },
  { name: 'Paschim Vihar', lat: 28.6626, lng: 77.0946, type: 'intersection' },
  { name: 'Punjabi Bagh', lat: 28.6614, lng: 77.1220, type: 'signal' },
  { name: 'Kirti Nagar', lat: 28.6512, lng: 77.1452, type: 'intersection' },
  { name: 'Moti Nagar', lat: 28.6505, lng: 77.1489, type: 'signal' },
  { name: 'Tilak Nagar', lat: 28.6390, lng: 77.0919, type: 'intersection' },
  { name: 'Uttam Nagar', lat: 28.6194, lng: 77.0576, type: 'signal' },
  { name: 'Najafgarh', lat: 28.6100, lng: 77.0160, type: 'intersection' },
  { name: 'Mahipalpur', lat: 28.5487, lng: 77.1130, type: 'signal' },
  // Additional interpolated junctions
  { name: 'Mandi House', lat: 28.6256, lng: 77.2340, type: 'roundabout' },
  { name: 'Barakhamba Road', lat: 28.6316, lng: 77.2276, type: 'signal' },
  { name: 'Janpath', lat: 28.6246, lng: 77.2184, type: 'signal' },
  { name: 'Panchsheel Park', lat: 28.5396, lng: 77.2162, type: 'intersection' },
  { name: 'Greater Kailash', lat: 28.5484, lng: 77.2408, type: 'signal' },
  { name: 'Kalkaji', lat: 28.5376, lng: 77.2565, type: 'signal' },
  { name: 'Govindpuri', lat: 28.5394, lng: 77.2657, type: 'intersection' },
  { name: 'Jangpura', lat: 28.5823, lng: 77.2433, type: 'signal' },
  { name: 'Khan Market', lat: 28.6005, lng: 77.2272, type: 'signal' },
  { name: 'Lodhi Garden', lat: 28.5933, lng: 77.2195, type: 'intersection' },
  { name: 'Race Course', lat: 28.6056, lng: 77.2106, type: 'roundabout' },
  { name: 'Rajpath', lat: 28.6147, lng: 77.2112, type: 'intersection' },
  { name: 'Sadar Bazaar', lat: 28.6593, lng: 77.2115, type: 'intersection' },
  { name: 'Paharganj', lat: 28.6437, lng: 77.2120, type: 'signal' },
  { name: 'New Delhi Railway Station', lat: 28.6432, lng: 77.2221, type: 'signal' },
  { name: 'Old Delhi Station', lat: 28.6618, lng: 77.2285, type: 'signal' },
  { name: 'Jama Masjid', lat: 28.6507, lng: 77.2334, type: 'intersection' },
  { name: 'Daryaganj', lat: 28.6465, lng: 77.2417, type: 'signal' },
  { name: 'Delhi Gate', lat: 28.6395, lng: 77.2411, type: 'roundabout' },
  { name: 'Turkman Gate', lat: 28.6442, lng: 77.2333, type: 'intersection' },
  { name: 'Ajmeri Gate', lat: 28.6499, lng: 77.2210, type: 'signal' },
  { name: 'Yamuna Bank', lat: 28.6225, lng: 77.2680, type: 'signal' },
  { name: 'Geeta Colony', lat: 28.6525, lng: 77.2705, type: 'intersection' },
  { name: 'Patparganj', lat: 28.6190, lng: 77.3010, type: 'signal' },
  { name: 'Vasundhara Enclave', lat: 28.6073, lng: 77.3243, type: 'intersection' },
  { name: 'Sarita Vihar', lat: 28.5304, lng: 77.2895, type: 'signal' },
  { name: 'Jasola', lat: 28.5404, lng: 77.2813, type: 'signal' },
  { name: 'Kalindi Kunj', lat: 28.5230, lng: 77.3050, type: 'signal' },
  { name: 'Dwarka Sector 9', lat: 28.5789, lng: 77.0621, type: 'signal' },
  { name: 'Dwarka Mor', lat: 28.6196, lng: 77.0446, type: 'signal' },
  { name: 'Nangloi', lat: 28.6816, lng: 77.0580, type: 'intersection' },
  { name: 'Mangolpuri', lat: 28.6972, lng: 77.0858, type: 'intersection' },
  { name: 'Sultanpuri', lat: 28.7026, lng: 77.0730, type: 'intersection' },
  { name: 'Jahangirpuri', lat: 28.7280, lng: 77.1735, type: 'signal' },
  { name: 'Badli', lat: 28.7380, lng: 77.1341, type: 'intersection' },
  { name: 'Bawana', lat: 28.7910, lng: 77.0542, type: 'intersection' },
  { name: 'Samaypur Badli', lat: 28.7413, lng: 77.1387, type: 'signal' },
  { name: 'Rithala', lat: 28.7193, lng: 77.1152, type: 'signal' },
  { name: 'Rohini Sector 18', lat: 28.7391, lng: 77.1380, type: 'intersection' },
  { name: 'Rani Bagh', lat: 28.6836, lng: 77.1145, type: 'intersection' },
  { name: 'Shakti Nagar', lat: 28.6747, lng: 77.2032, type: 'signal' },
  { name: 'Kamla Nagar', lat: 28.6830, lng: 77.2089, type: 'intersection' },
  { name: 'Mall Road', lat: 28.6780, lng: 77.2117, type: 'signal' },
  { name: 'Majnu Ka Tilla', lat: 28.6924, lng: 77.2271, type: 'intersection' },
  { name: 'ISBT Kashmere Gate', lat: 28.6668, lng: 77.2287, type: 'signal' },
  { name: 'Minto Bridge', lat: 28.6330, lng: 77.2292, type: 'signal' },
  { name: 'Bhikaji Cama Place', lat: 28.5711, lng: 77.1869, type: 'flyover' },
  { name: 'Sarojini Nagar', lat: 28.5772, lng: 77.1963, type: 'signal' },
  { name: 'South Extension', lat: 28.5714, lng: 77.2222, type: 'signal' },
  { name: 'Andrews Ganj', lat: 28.5686, lng: 77.2287, type: 'intersection' },
  { name: 'East of Kailash', lat: 28.5553, lng: 77.2495, type: 'signal' },
  { name: 'Chittaranjan Park', lat: 28.5398, lng: 77.2457, type: 'intersection' },
  { name: 'Malviya Nagar', lat: 28.5318, lng: 77.2115, type: 'signal' },
  { name: 'Lado Sarai', lat: 28.5185, lng: 77.1914, type: 'intersection' },
  { name: 'Chattarpur', lat: 28.5047, lng: 77.1746, type: 'signal' },
  { name: 'Sultanpur', lat: 28.4947, lng: 77.1596, type: 'intersection' },
  { name: 'Ghitorni', lat: 28.4903, lng: 77.1494, type: 'signal' },
];

const hospitals = [
  { name: 'AIIMS Hospital', lat: 28.5672, lng: 77.2100, beds: 2478, emergency: 150, specialties: 'Multi-Specialty, Trauma, Cardiology' },
  { name: 'Safdarjung Hospital', lat: 28.5689, lng: 77.2058, beds: 1531, emergency: 100, specialties: 'General, Surgery, Orthopedics' },
  { name: 'Ram Manohar Lohia Hospital', lat: 28.6256, lng: 77.2008, beds: 1400, emergency: 80, specialties: 'General, Burns, Neurology' },
  { name: 'GTB Hospital', lat: 28.6824, lng: 77.3023, beds: 1800, emergency: 120, specialties: 'General, Trauma, Pediatrics' },
  { name: 'Lok Nayak Hospital', lat: 28.6375, lng: 77.2395, beds: 2000, emergency: 130, specialties: 'Multi-Specialty, Infectious Disease' },
  { name: 'Max Super Speciality Saket', lat: 28.5271, lng: 77.2115, beds: 500, emergency: 50, specialties: 'Cardiology, Oncology, Neurology' },
  { name: 'Fortis Escorts Heart', lat: 28.5590, lng: 77.2126, beds: 310, emergency: 40, specialties: 'Cardiology, Cardiac Surgery' },
  { name: 'Apollo Hospital', lat: 28.5576, lng: 77.2839, beds: 710, emergency: 60, specialties: 'Multi-Specialty, Transplant' },
  { name: 'Sir Ganga Ram Hospital', lat: 28.6406, lng: 77.1917, beds: 675, emergency: 55, specialties: 'General, Liver, Kidney' },
  { name: 'Maulana Azad Medical College', lat: 28.6346, lng: 77.2378, beds: 1600, emergency: 100, specialties: 'General, Teaching Hospital' },
  { name: 'Hindu Rao Hospital', lat: 28.6775, lng: 77.2097, beds: 900, emergency: 60, specialties: 'General, Orthopedics' },
  { name: 'DDU Hospital', lat: 28.6421, lng: 77.2130, beds: 700, emergency: 55, specialties: 'General, Emergency Medicine' },
  { name: 'BLK Super Speciality', lat: 28.6430, lng: 77.1848, beds: 700, emergency: 50, specialties: 'Oncology, BMT, Liver' },
  { name: 'Rajiv Gandhi Super Speciality', lat: 28.6925, lng: 77.3097, beds: 650, emergency: 60, specialties: 'Cardiology, Neurology, Nephrology' },
  { name: 'Jaipur Golden Hospital', lat: 28.6988, lng: 77.1522, beds: 400, emergency: 35, specialties: 'General, Orthopedics, Pediatrics' },
  { name: 'Batra Hospital', lat: 28.5410, lng: 77.2598, beds: 400, emergency: 40, specialties: 'General, Oncology' },
  { name: 'Holy Family Hospital', lat: 28.5331, lng: 77.2723, beds: 350, emergency: 35, specialties: 'General, Maternity' },
  { name: 'Max Hospital Patparganj', lat: 28.6261, lng: 77.3076, beds: 300, emergency: 30, specialties: 'General, Orthopedics' },
  { name: 'Venkateshwar Hospital', lat: 28.5811, lng: 77.0549, beds: 350, emergency: 35, specialties: 'General, Cardiology' },
  { name: 'Fortis Hospital Shalimar Bagh', lat: 28.7097, lng: 77.1585, beds: 262, emergency: 30, specialties: 'Multi-Specialty' },
];

const roadNames = [
  'Ring Road', 'Outer Ring Road', 'Mathura Road', 'GT Road', 'NH-44',
  'NH-48', 'Vikas Marg', 'IP Marg', 'Lala Lajpat Rai Marg', 'Aurobindo Marg',
  'Mehrauli-Badarpur Road', 'Nelson Mandela Marg', 'Sardar Patel Marg',
  'Shanti Path', 'Rajesh Pilot Marg', 'Lodhi Road', 'Mathura Road Extension',
  'MG Road', 'NH-24', 'GT Karnal Road', 'Rohtak Road', 'Najafgarh Road',
  'Pusa Road', 'Link Road', 'Pankha Road', 'Dwarka Expressway',
];

const incidentTypes = ['accident', 'fire', 'medical', 'crime', 'flood', 'building_collapse'];
const severities = ['low', 'medium', 'high', 'critical'];
const conditions = ['clear', 'cloudy', 'rain', 'haze', 'fog'];
const sensorTypes = ['traffic_camera', 'air_quality', 'weather', 'speed_radar'];

function assignZone(lat: number, lng: number): string {
  if (lat > 28.72) return 'North';
  if (lat > 28.65 && lng > 77.22) return 'North-East';
  if (lat > 28.65 && lng < 77.12) return 'North-West';
  if (lat < 28.54 && lng > 77.20) return 'South';
  if (lat < 28.54 && lng < 77.20) return 'South-West';
  if (lng > 77.27) return 'East';
  if (lng < 77.10) return 'West';
  return 'Central';
}

function getCongestionForHour(hour: number): number {
  if (hour >= 8 && hour <= 10) return randomFloat(0.65, 0.95);
  if (hour >= 17 && hour <= 20) return randomFloat(0.6, 0.9);
  if (hour >= 12 && hour <= 14) return randomFloat(0.4, 0.6);
  if (hour >= 23 || hour <= 5) return randomFloat(0.05, 0.2);
  return randomFloat(0.25, 0.5);
}

async function main() {
  console.log('🏙️ CityTwin AI — Seeding Delhi Database...\n');

  // Clear existing data
  console.log('  Clearing existing data...');
  await prisma.trafficReading.deleteMany();
  await prisma.weatherReading.deleteMany();
  await prisma.aQIReading.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.road.deleteMany();
  await prisma.emergencyIncident.deleteMany();
  await prisma.prediction.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.junction.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.user.deleteMany();

  // 1. USERS
  console.log('  👤 Creating users...');
  const hashedAdmin = await bcrypt.hash('admin123', 10);
  const hashedTraffic = await bcrypt.hash('traffic123', 10);
  const hashedEmergency = await bcrypt.hash('emergency123', 10);
  const hashedAnalyst = await bcrypt.hash('analyst123', 10);

  await prisma.user.createMany({
    data: [
      { email: 'admin@citytwin.ai', password: hashedAdmin, name: 'Rajesh Kumar', role: 'ADMIN' },
      { email: 'traffic@citytwin.ai', password: hashedTraffic, name: 'Priya Sharma', role: 'TRAFFIC_OFFICER' },
      { email: 'emergency@citytwin.ai', password: hashedEmergency, name: 'Amit Singh', role: 'EMERGENCY_OPERATOR' },
      { email: 'analyst@citytwin.ai', password: hashedAnalyst, name: 'Neha Gupta', role: 'ANALYST' },
    ],
  });

  // 2. JUNCTIONS
  console.log('  🔀 Creating junctions...');
  const junctionMap = new Map<number, string>();

  for (let i = 0; i < landmarks.length; i++) {
    const l = landmarks[i];
    const now = new Date();
    const hour = now.getHours();
    const congestion = getCongestionForHour(hour);
    const j = await prisma.junction.create({
      data: {
        name: l.name,
        lat: l.lat,
        lng: l.lng,
        type: l.type,
        zone: assignZone(l.lat, l.lng),
        congestionLevel: congestion,
        avgSpeed: Math.max(5, 60 * (1 - congestion) + randomFloat(-5, 5)),
        aqi: randomInt(80, 350),
        temperature: randomFloat(30, 38),
        accidents: randomInt(0, 3),
      },
    });
    junctionMap.set(i, j.id);
  }
  console.log(`    Created ${landmarks.length} junctions`);

  // 3. ROADS (connect nearby junctions)
  console.log('  🛣️ Creating roads...');
  let roadCount = 0;

  // Helper to calculate distance between two junctions
  function dist(i: number, j: number): number {
    const a = landmarks[i], b = landmarks[j];
    return Math.sqrt((a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2);
  }

  // Connect each junction to its 3-5 nearest neighbors
  for (let i = 0; i < landmarks.length; i++) {
    const distances: { idx: number; d: number }[] = [];
    for (let j = 0; j < landmarks.length; j++) {
      if (i !== j) distances.push({ idx: j, d: dist(i, j) });
    }
    distances.sort((a, b) => a.d - b.d);
    const connectCount = randomInt(2, 4);
    
    for (let k = 0; k < Math.min(connectCount, distances.length); k++) {
      const j = distances[k].idx;
      const length = distances[k].d * 111; // ~111km per degree
      const congestion = randomFloat(0.1, 0.8);
      
      try {
        await prisma.road.create({
          data: {
            name: `${pick(roadNames)} Seg-${roadCount}`,
            fromJunctionId: junctionMap.get(i)!,
            toJunctionId: junctionMap.get(j)!,
            length: Math.round(length * 100) / 100,
            lanes: pick([2, 4, 6, 8]),
            speedLimit: pick([40, 50, 60, 80]),
            condition: pick(['good', 'good', 'good', 'fair', 'poor']),
            congestion,
            currentSpeed: Math.max(5, pick([40, 50, 60]) * (1 - congestion)),
          },
        });
        roadCount++;
      } catch {
        // Skip duplicates silently
      }
    }
  }
  console.log(`    Created ${roadCount} roads`);

  // 4. HOSPITALS
  console.log('  🏥 Creating hospitals...');
  for (const h of hospitals) {
    await prisma.hospital.create({
      data: {
        name: h.name,
        lat: h.lat,
        lng: h.lng,
        totalBeds: h.beds,
        availableBeds: randomInt(Math.floor(h.beds * 0.05), Math.floor(h.beds * 0.3)),
        emergencyCapacity: h.emergency,
        currentLoad: randomFloat(0.5, 0.95),
        specialties: h.specialties,
        phone: `011-${randomInt(2000, 9999)}${randomInt(1000, 9999)}`,
      },
    });
  }
  console.log(`    Created ${hospitals.length} hospitals`);

  // 5. SENSORS
  console.log('  📡 Creating sensors...');
  const junctionIds = Array.from(junctionMap.values());
  let sensorCount = 0;
  
  for (const jId of junctionIds) {
    const junction = landmarks[junctionIds.indexOf(jId)];
    if (!junction) continue;
    
    // Each junction gets 1-3 sensors
    const numSensors = randomInt(1, 3);
    for (let s = 0; s < numSensors; s++) {
      await prisma.sensor.create({
        data: {
          type: pick(sensorTypes),
          lat: junction.lat + randomFloat(-0.001, 0.001),
          lng: junction.lng + randomFloat(-0.001, 0.001),
          junctionId: jId,
          status: Math.random() > 0.1 ? 'active' : pick(['inactive', 'maintenance']),
        },
      });
      sensorCount++;
    }
  }
  console.log(`    Created ${sensorCount} sensors`);

  // 6. TRAFFIC READINGS (24 hours of data, every hour, for 30 key junctions)
  console.log('  🚗 Creating traffic readings (24h history)...');
  const keyJunctions = junctionIds.slice(0, 30);
  let trafficCount = 0;
  const now = new Date();

  for (const jId of keyJunctions) {
    for (let h = 0; h < 24; h++) {
      const timestamp = new Date(now.getTime() - (24 - h) * 3600000);
      const congestion = getCongestionForHour(h);
      const vehicleCount = Math.floor(congestion * randomInt(800, 2000));
      
      await prisma.trafficReading.create({
        data: {
          junctionId: jId,
          timestamp,
          vehicleCount,
          avgSpeed: Math.max(5, 60 * (1 - congestion) + randomFloat(-10, 10)),
          congestion,
          carCount: Math.floor(vehicleCount * 0.5),
          bikeCount: Math.floor(vehicleCount * 0.3),
          busCount: Math.floor(vehicleCount * 0.1),
          truckCount: Math.floor(vehicleCount * 0.1),
        },
      });
      trafficCount++;
    }
  }
  console.log(`    Created ${trafficCount} traffic readings`);

  // 7. WEATHER READINGS (24 hours)
  console.log('  🌤️ Creating weather readings (24h)...');
  for (let h = 0; h < 24; h++) {
    const timestamp = new Date(now.getTime() - (24 - h) * 3600000);
    const hour = timestamp.getHours();
    const isDay = hour >= 6 && hour <= 18;
    
    await prisma.weatherReading.create({
      data: {
        timestamp,
        lat: 28.6139,
        lng: 77.2090,
        temperature: isDay ? randomFloat(32, 38) : randomFloat(27, 32),
        humidity: randomFloat(55, 85),
        rainfall: Math.random() > 0.7 ? randomFloat(0, 15) : 0,
        windSpeed: randomFloat(5, 25),
        windDir: pick(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']),
        condition: pick(conditions),
        visibility: randomFloat(2, 10),
      },
    });
  }
  console.log('    Created 24 weather readings');

  // 8. AQI READINGS (24 hours at multiple locations)
  console.log('  💨 Creating AQI readings (24h)...');
  const aqiLocations = landmarks.slice(0, 15);
  let aqiCount = 0;
  
  for (const loc of aqiLocations) {
    for (let h = 0; h < 24; h++) {
      const timestamp = new Date(now.getTime() - (24 - h) * 3600000);
      const hour = timestamp.getHours();
      const trafficFactor = getCongestionForHour(hour);
      const baseAQI = randomFloat(80, 250);
      const aqi = baseAQI + trafficFactor * 100;

      await prisma.aQIReading.create({
        data: {
          timestamp,
          lat: loc.lat,
          lng: loc.lng,
          pm25: randomFloat(30, 150),
          pm10: randomFloat(50, 250),
          no2: randomFloat(20, 80),
          so2: randomFloat(5, 30),
          co: randomFloat(0.5, 3),
          o3: randomFloat(20, 60),
          aqi: Math.min(500, Math.round(aqi)),
          category: aqi < 100 ? 'moderate' : aqi < 200 ? 'unhealthy_sensitive' : aqi < 300 ? 'unhealthy' : 'very_unhealthy',
        },
      });
      aqiCount++;
    }
  }
  console.log(`    Created ${aqiCount} AQI readings`);

  // 9. EMERGENCY INCIDENTS (30 recent incidents)
  console.log('  🚨 Creating emergency incidents...');
  for (let i = 0; i < 30; i++) {
    const loc = pick(landmarks);
    const hoursAgo = randomInt(0, 48);
    const severity = pick(severities);
    const type = pick(incidentTypes);
    const isResolved = hoursAgo > 6 && Math.random() > 0.3;
    
    await prisma.emergencyIncident.create({
      data: {
        type,
        severity,
        lat: loc.lat + randomFloat(-0.005, 0.005),
        lng: loc.lng + randomFloat(-0.005, 0.005),
        description: getIncidentDescription(type, loc.name),
        status: isResolved ? 'resolved' : pick(['reported', 'dispatched', 'responding']),
        responseTime: isResolved ? randomFloat(5, 25) : null,
        reportedAt: new Date(now.getTime() - hoursAgo * 3600000),
        resolvedAt: isResolved ? new Date(now.getTime() - (hoursAgo - randomInt(1, 3)) * 3600000) : null,
        assignedTo: isResolved || Math.random() > 0.5 ? pick(['Unit A-12', 'Unit B-7', 'Unit C-3', 'Unit D-15', 'Unit E-9']) : '',
      },
    });
  }
  console.log('    Created 30 emergency incidents');

  // 10. PREDICTIONS
  console.log('  🔮 Creating predictions...');
  const predTypes = ['traffic', 'aqi', 'accident', 'travel_time', 'emergency_demand'];
  const horizons = ['1h', '6h', '12h', '24h'];
  const models = ['GraphSAGE', 'LSTM', 'XGBoost', 'Ensemble', 'TFT'];

  for (let i = 0; i < 60; i++) {
    const jIdx = randomInt(0, Math.min(30, junctionIds.length - 1));
    const jName = landmarks[jIdx]?.name || 'Unknown';
    const type = pick(predTypes);
    
    await prisma.prediction.create({
      data: {
        type,
        targetId: junctionIds[jIdx],
        targetName: jName,
        timestamp: new Date(now.getTime() + randomInt(1, 24) * 3600000),
        predictedValue: type === 'traffic' ? randomFloat(0.2, 0.95) : type === 'aqi' ? randomFloat(80, 400) : randomFloat(0, 1),
        confidence: randomFloat(0.65, 0.98),
        horizon: pick(horizons),
        model: pick(models),
      },
    });
  }
  console.log('    Created 60 predictions');

  // 11. ALERTS
  console.log('  ⚠️ Creating alerts...');
  const alertData = [
    { type: 'traffic', severity: 'critical', title: 'Severe Congestion on Ring Road', message: 'Ring Road near Ashram Chowk experiencing gridlock. Average speed dropped to 5 km/h. Consider alternate routes.' },
    { type: 'aqi', severity: 'critical', title: 'Hazardous AQI near Anand Vihar', message: 'AQI has crossed 400 near Anand Vihar. Advise citizens to avoid outdoor activities.' },
    { type: 'weather', severity: 'warning', title: 'Heavy Rainfall Expected', message: 'IMD predicts heavy rainfall in next 2 hours. Waterlogging expected at Minto Bridge and ITO.' },
    { type: 'emergency', severity: 'critical', title: 'Multi-Vehicle Collision on NH-44', message: '5-vehicle pileup near GTB Nagar. 3 ambulances dispatched. Traffic diverted.' },
    { type: 'traffic', severity: 'warning', title: 'VIP Movement - Rajpath', message: 'VIP movement expected on Rajpath from 3 PM to 5 PM. Traffic diversions in place.' },
    { type: 'aqi', severity: 'warning', title: 'Rising PM2.5 Levels', message: 'PM2.5 levels rising across South Delhi. Predicted to reach unhealthy levels by evening.' },
    { type: 'traffic', severity: 'info', title: 'Construction on MG Road', message: 'Lane closure on MG Road near CP for metro construction. Expect delays until August.' },
    { type: 'weather', severity: 'info', title: 'Temperature Advisory', message: 'Maximum temperature expected to reach 42°C tomorrow. Heat wave warning in effect.' },
    { type: 'emergency', severity: 'warning', title: 'Fire Reported in Chandni Chowk', message: 'Fire in commercial building near Chandni Chowk. 2 fire tenders dispatched.' },
    { type: 'system', severity: 'info', title: 'Sensor Maintenance', message: '12 traffic sensors in North Delhi zone scheduled for maintenance tonight 11 PM - 2 AM.' },
    { type: 'traffic', severity: 'warning', title: 'Waterlogging at Minto Bridge', message: 'Road partially submerged at Minto Bridge underpass. Only one lane operational.' },
    { type: 'aqi', severity: 'critical', title: 'Stubble Burning Impact', message: 'Satellite imagery shows active crop burning in Punjab/Haryana. Delhi AQI expected to worsen.' },
    { type: 'emergency', severity: 'info', title: 'Ambulance Response Improved', message: 'Average ambulance response time reduced to 8.5 minutes this week. 15% improvement.' },
    { type: 'traffic', severity: 'info', title: 'New Signal Timing Active', message: 'AI-optimized signal timing activated at 15 junctions in Central Delhi zone.' },
    { type: 'weather', severity: 'warning', title: 'Fog Advisory', message: 'Dense fog expected tomorrow morning. Visibility may drop below 200m in North Delhi.' },
  ];

  for (let i = 0; i < alertData.length; i++) {
    const a = alertData[i];
    const loc = pick(landmarks);
    await prisma.alert.create({
      data: {
        type: a.type,
        severity: a.severity,
        title: a.title,
        message: a.message,
        lat: loc.lat,
        lng: loc.lng,
        acknowledged: i > 8, // older ones acknowledged
        createdAt: new Date(now.getTime() - i * randomInt(1800000, 7200000)),
      },
    });
  }
  console.log(`    Created ${alertData.length} alerts`);

  console.log('\n✅ Seeding complete!');
  console.log(`   📊 Summary:`);
  console.log(`   - 4 users`);
  console.log(`   - ${landmarks.length} junctions`);
  console.log(`   - ${roadCount} roads`);
  console.log(`   - ${hospitals.length} hospitals`);
  console.log(`   - ${sensorCount} sensors`);
  console.log(`   - ${trafficCount} traffic readings`);
  console.log(`   - 24 weather readings`);
  console.log(`   - ${aqiCount} AQI readings`);
  console.log(`   - 30 emergency incidents`);
  console.log(`   - 60 predictions`);
  console.log(`   - ${alertData.length} alerts`);
}

function getIncidentDescription(type: string, location: string): string {
  const descriptions: Record<string, string[]> = {
    accident: [
      `Two-wheeler collision near ${location}. Minor injuries reported.`,
      `Rear-end collision between bus and car at ${location}. Traffic disrupted.`,
      `Truck overturned near ${location}. Diesel spill on road.`,
    ],
    fire: [
      `Fire reported in commercial establishment near ${location}.`,
      `Short circuit caused fire in residential building at ${location}.`,
      `Small fire in electrical transformer near ${location}. DTC bus rerouted.`,
    ],
    medical: [
      `Person collapsed near ${location}. Ambulance requested.`,
      `Heat stroke case reported near ${location}. Paramedics en route.`,
      `Pregnant woman in labor near ${location}. Emergency transport needed.`,
    ],
    crime: [
      `Chain snatching reported near ${location}. PCR van dispatched.`,
      `Altercation between two groups near ${location}. Police responding.`,
      `Theft reported from parked vehicle at ${location}.`,
    ],
    flood: [
      `Waterlogging reported near ${location} after heavy rain.`,
      `Road submerged at ${location}. Vehicles stranded.`,
    ],
    building_collapse: [
      `Partial wall collapse in old structure near ${location}.`,
      `Under-construction building shows cracks near ${location}. Area cordoned.`,
    ],
  };
  return pick(descriptions[type] || [`Incident reported near ${location}.`]);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
