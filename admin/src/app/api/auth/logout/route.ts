import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

function clearSessionCookies(cookieStore: Awaited<ReturnType<typeof cookies>>): void {
  const secure = process.env.NODE_ENV === 'production';

  cookieStore.set('userId', '', {
    httpOnly: true,
    secure,
    maxAge: 0,
    path: '/',
  });

  cookieStore.set('userRole', '', {
    httpOnly: false,
    secure,
    maxAge: 0,
    path: '/',
  });
}

export async function POST(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    clearSessionCookies(cookieStore);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[auth/logout]', error);
    return NextResponse.json({ error: 'Could not log out. Please try again.' }, { status: 500 });
  }
}
