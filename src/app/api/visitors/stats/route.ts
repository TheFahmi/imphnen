import { NextResponse } from 'next/server';
import { getVisitorStats } from '@/lib/visitorUtils';

// GET handler - returns visitor statistics
export async function GET() {
  try {
    // Use the reusable function to get visitor stats
    const stats = getVisitorStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    return NextResponse.json(
      { error: 'Failed to get visitor stats' },
      { status: 500 }
    );
  }
}
