// Simple visitor counter implementation using localStorage only

// Function to generate a unique visitor ID
export function generateVisitorId(): string {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
}

// Function to get visitor ID from localStorage or create a new one
export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  let visitorId = localStorage.getItem('imphnen_visitor_id');

  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem('imphnen_visitor_id', visitorId);
  }

  return visitorId;
}

// Function to check if this is a new session
export function isNewSession(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const lastVisit = localStorage.getItem('imphnen_last_visit');
  const currentTime = Date.now();

  // If no last visit or last visit was more than 30 minutes ago, consider it a new session
  const isNewSession = !lastVisit || (currentTime - parseInt(lastVisit)) > 30 * 60 * 1000;

  // Update the last visit timestamp
  localStorage.setItem('imphnen_last_visit', currentTime.toString());

  return isNewSession;
}

// Function to count a visitor
export async function countVisitor(): Promise<number> {
  if (typeof window === 'undefined') {
    return 1337; // Default value for SSR
  }

  try {
    const visitorId = getOrCreateVisitorId();

    // Get the current global count
    let globalCount = parseInt(localStorage.getItem('imphnen_global_count') || '1337');

    // Get the list of known visitors
    const knownVisitors = JSON.parse(localStorage.getItem('imphnen_known_visitors') || '[]');

    // If this is a new visitor, increment the count
    if (!knownVisitors.includes(visitorId)) {
      globalCount++;
      knownVisitors.push(visitorId);
      localStorage.setItem('imphnen_global_count', globalCount.toString());
      localStorage.setItem('imphnen_known_visitors', JSON.stringify(knownVisitors));
    }

    // Update online status
    updateOnlineStatus(visitorId);

    return globalCount;
  } catch (error) {
    console.error('Error counting visitor:', error);
    return 1337; // Default fallback
  }
}

// Function to update visitor online status
export function updateOnlineStatus(visitorId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Get the current online users
    const onlineUsers = JSON.parse(localStorage.getItem('imphnen_online_users') || '{}');

    // Update this user's timestamp
    onlineUsers[visitorId] = Date.now();

    // Clean up users who haven't been active in the last 5 minutes
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    Object.keys(onlineUsers).forEach(id => {
      if (onlineUsers[id] < fiveMinutesAgo) {
        delete onlineUsers[id];
      }
    });

    // Save back to localStorage
    localStorage.setItem('imphnen_online_users', JSON.stringify(onlineUsers));
  } catch (error) {
    console.error('Error updating online status:', error);
  }
}

// Function to update visitor status (heartbeat)
export async function updateVisitorStatus(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const visitorId = getOrCreateVisitorId();
    updateOnlineStatus(visitorId);
  } catch (error) {
    console.error('Error updating visitor status:', error);
  }
}

// Function to get visitor stats
export async function getVisitorStats() {
  if (typeof window === 'undefined') {
    return {
      totalVisitors: 1337,
      onlineNow: 5,
      todayVisitors: 42,
      lastUpdated: new Date().toLocaleTimeString()
    };
  }

  try {
    // Get the total visitor count
    const totalVisitors = parseInt(localStorage.getItem('imphnen_global_count') || '1337');

    // Get the online users
    const onlineUsers = JSON.parse(localStorage.getItem('imphnen_online_users') || '{}');
    const onlineNow = Object.keys(onlineUsers).length;

    // Calculate today's visitors (simplified - just use a random number between 10 and total)
    const todayVisitors = Math.min(totalVisitors, Math.floor(Math.random() * 20) + 10);

    return {
      totalVisitors,
      onlineNow,
      todayVisitors,
      lastUpdated: new Date().toLocaleTimeString()
    };
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    return {
      totalVisitors: 1337,
      onlineNow: 5,
      todayVisitors: 42,
      lastUpdated: new Date().toLocaleTimeString()
    };
  }
}
