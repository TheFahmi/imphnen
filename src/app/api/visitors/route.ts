import { NextRequest, NextResponse } from 'next/server';
import { countVisitor, getVisitorStats, updateVisitorStatus } from '@/lib/visitorUtils.server';

// Ensure countVisitor is an async function if it returns a promise

// API endpoint untuk mendapatkan jumlah pengunjung
export async function GET() {
  try {
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

// API endpoint untuk menambah atau memperbarui pengunjung
export async function POST(request: NextRequest) {
  try {
    const { visitorId, action } = await request.json();

    if (!visitorId) {
      return NextResponse.json(
        { error: 'Visitor ID is required' },
        { status: 400 }
      );
    }

    // Jika action adalah 'count', hitung pengunjung baru
    if (action === 'count') {
      const count = countVisitor(visitorId);
      return NextResponse.json({
        count,
        success: true
      });
    }

    if (action === 'update') {
      const success = updateVisitorStatus(visitorId);
      return NextResponse.json({
        success
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing visitor:', error);
    return NextResponse.json(
      { error: 'Failed to process visitor' },
      { status: 500 }
    );
  }
}
