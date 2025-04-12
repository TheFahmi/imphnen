import fs from 'fs';
import path from 'path';
import { Visitor, VisitorData } from './visitorUtils';

// Path to the visitor data file
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const dataFilePath = path.join(DATA_DIR, 'visitors.json');

// Default visitor data
const defaultData: VisitorData = {
  count: 0,
  visitors: {},
  lastUpdated: new Date().toISOString()
};

// Ensure the data directory exists
export function ensureDataDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read visitor data from file
export function readVisitorData(): VisitorData {
  ensureDataDirectory();
  
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading visitor data:', error);
    return defaultData;
  }
}

// Write visitor data to file
export function writeVisitorData(data: VisitorData): void {
  ensureDataDirectory();
  
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing visitor data:', error);
  }
}

// Count a new visitor
export function countVisitor(visitorId: string): number {
  const data = readVisitorData();
  
  // Check if this is a new visitor
  if (!data.visitors[visitorId]) {
    data.visitors[visitorId] = {
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1
    };
    
    // Increment the count for new visitors
    data.count++;
  } else {
    // Update existing visitor data
    data.visitors[visitorId].lastVisit = new Date().toISOString();
    data.visitors[visitorId].visitCount++;
  }
  
  data.lastUpdated = new Date().toISOString();
  
  // Save the updated data
  writeVisitorData(data);
  
  return data.count;
}

// Update visitor status (heartbeat)
export function updateVisitorStatus(visitorId: string): boolean {
  const data = readVisitorData();
  
  // Update the visitor's last visit time
  if (data.visitors[visitorId]) {
    data.visitors[visitorId].lastVisit = new Date().toISOString();
  } else {
    // If the visitor doesn't exist, add them
    data.visitors[visitorId] = {
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1
    };
  }
  
  data.lastUpdated = new Date().toISOString();
  
  // Save the updated data
  writeVisitorData(data);
  
  return true;
}

// Get visitor statistics
export function getVisitorStats() {
  const data = readVisitorData();
  const now = new Date();
  
  // Calculate online visitors (active in the last 5 minutes)
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
  const onlineVisitors = Object.values(data.visitors).filter((visitor: Visitor) => 
    visitor.lastVisit >= fiveMinutesAgo
  );
  
  // Calculate today's visitors
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const todayVisitors = Object.values(data.visitors).filter((visitor: Visitor) => 
    visitor.lastVisit >= startOfDay.toISOString()
  );
  
  return {
    totalVisitors: data.count,
    onlineNow: onlineVisitors.length,
    todayVisitors: todayVisitors.length,
    lastUpdated: new Date().toLocaleTimeString()
  };
}
