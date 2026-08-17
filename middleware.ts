import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ['/prep', '/prep.html'] };

// Password-gates the interview prep page. Any username works; the password
// comes from the PREP_PASS env var, falling back to the default below.
export function middleware(req: NextRequest) {
  const expected = process.env.PREP_PASS || '1234';

  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    let pass = '';
    try {
      pass = atob(auth.slice(6)).split(':').slice(1).join(':');
    } catch {
      pass = '';
    }
    if (pass === expected) {
      let res: NextResponse;
      if (req.nextUrl.pathname === '/prep') {
        const url = req.nextUrl.clone();
        url.pathname = '/prep.html';
        res = NextResponse.rewrite(url);
      } else {
        res = NextResponse.next();
      }
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return res;
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="prep"' },
  });
}
