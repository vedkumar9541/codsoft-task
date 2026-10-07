import { prisma } from '../prisma';
import { calculateDistance } from '../utils/helpers';

interface GraphNode {
  id: string;
  edges: { to: string; weight: number }[];
}

export class CityGraph {
  private adjacencyList: Map<string, GraphNode> = new Map();

  async buildGraph() {
    this.adjacencyList.clear();
    
    const junctions = await prisma.junction.findMany();
    const roads = await prisma.road.findMany();

    junctions.forEach(j => {
      this.adjacencyList.set(j.id, { id: j.id, edges: [] });
    });

    roads.forEach(road => {
      const fromNode = this.adjacencyList.get(road.fromJunctionId);
      const toNode = this.adjacencyList.get(road.toJunctionId);
      
      if (fromNode && toNode) {
        // Weight based on length and current speed/congestion
        const timeToTravel = road.length / Math.max(10, road.currentSpeed); // hours
        
        fromNode.edges.push({ to: road.toJunctionId, weight: timeToTravel });
        // Assuming two-way roads for simplicity if not strictly directed
        toNode.edges.push({ to: road.fromJunctionId, weight: timeToTravel });
      }
    });
  }

  getShortestPath(startId: string, endId: string) {
    // Basic Dijkstra's implementation
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();

    this.adjacencyList.forEach((_, id) => {
      distances.set(id, Infinity);
      previous.set(id, null);
      unvisited.add(id);
    });

    distances.set(startId, 0);

    while (unvisited.size > 0) {
      let currentId: string | null = null;
      let minDistance = Infinity;

      unvisited.forEach(id => {
        const dist = distances.get(id)!;
        if (dist < minDistance) {
          minDistance = dist;
          currentId = id;
        }
      });

      if (currentId === null || currentId === endId) break;

      unvisited.delete(currentId);
      const node = this.adjacencyList.get(currentId)!;

      node.edges.forEach(edge => {
        if (!unvisited.has(edge.to)) return;

        const alt = distances.get(currentId)! + edge.weight;
        if (alt < distances.get(edge.to)!) {
          distances.set(edge.to, alt);
          previous.set(edge.to, currentId);
        }
      });
    }

    const path: string[] = [];
    let curr: string | null = endId;
    while (curr !== null) {
      path.unshift(curr);
      curr = previous.get(curr)!;
    }

    return path.length > 1 ? { path, time: distances.get(endId) } : null;
  }

  async getEmergencyRoute(lat: number, lng: number) {
    // Find nearest junction to incident
    const junctions = await prisma.junction.findMany();
    let nearestJunction = junctions[0];
    let minJunctionDist = Infinity;
    
    junctions.forEach(j => {
      const d = calculateDistance(lat, lng, j.lat, j.lng);
      if (d < minJunctionDist) {
        minJunctionDist = d;
        nearestJunction = j;
      }
    });

    // Find nearest hospital with available beds
    const hospitals = await prisma.hospital.findMany({
      where: { availableBeds: { gt: 0 } }
    });
    
    if (hospitals.length === 0) return null;

    let nearestHospital = hospitals[0];
    let minHospDist = Infinity;

    hospitals.forEach(h => {
      const d = calculateDistance(lat, lng, h.lat, h.lng);
      if (d < minHospDist) {
        minHospDist = d;
        nearestHospital = h;
      }
    });

    // Find nearest junction to hospital
    let hospitalJunction = junctions[0];
    let minHospJunctionDist = Infinity;
    junctions.forEach(j => {
      const d = calculateDistance(nearestHospital.lat, nearestHospital.lng, j.lat, j.lng);
      if (d < minHospJunctionDist) {
        minHospJunctionDist = d;
        hospitalJunction = j;
      }
    });

    // Calculate route
    const route = this.getShortestPath(nearestJunction.id, hospitalJunction.id);
    
    return {
      hospital: nearestHospital,
      route
    };
  }
}

export const cityGraph = new CityGraph();
