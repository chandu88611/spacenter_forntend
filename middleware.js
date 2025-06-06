// middleware.js
export function middleware(request) {
  if (request.nextUrl.pathname.includes('.well-known/appspecific')) {
    return new Response('Not Found', { status: 404 });
  }
}