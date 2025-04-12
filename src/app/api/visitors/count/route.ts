import { NextRequest, NextResponse } from 'next/server';
import { readVisitorData, countVisitor } from '@/lib/visitorUtils';

// GET handler - returns the current visitor count
export async function GET() {
  const data = readVisitorData();

  return NextResponse.json({
    count: data.count,
    success: true
  });
}

// POST handler - increments the visitor count for new visitors
export async function POST(request: NextRequest) {
  try {
    const { visitorId } = await request.json();

    if (!visitorId) {
      return NextResponse.json(
        { error: 'Visitor ID is required' },
        { status: 400 }
      );
    }

    const count = countVisitor(visitorId);

    return NextResponse.json({
      count,
      success: true
    });
  } catch (error) {
    console.error('Error processing visitor:', error);
    return NextResponse.json(
      { error: 'Failed to process visitor' },
      { status: 500 }
    );
  }
}
