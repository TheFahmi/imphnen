import { NextRequest, NextResponse } from 'next/server';
import { updateVisitorStatus } from '@/lib/visitorUtils';

// POST handler - updates the last visit time for a visitor
export async function POST(request: NextRequest) {
  try {
    const { visitorId } = await request.json();

    if (!visitorId) {
      return NextResponse.json(
        { error: 'Visitor ID is required' },
        { status: 400 }
      );
    }
    
    const success = updateVisitorStatus(visitorId);

    return NextResponse.json({
      success
    });
  } catch (error) {
    console.error('Error updating visitor status:', error);
    return NextResponse.json(
      { error: 'Failed to update visitor status' },
      { status: 500 }
    );
  }
}
