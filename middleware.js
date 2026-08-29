import {NextResponse} from "next/server";

export function middleware(request) {
	const {pathname} = request.nextUrl;

	// NOTE: still hardcoded, not a real cookie read - deliberately left as-is here.
	// ESK_ADMIN's login-redirect bug (fixed by replacing server-side middleware auth
	// with a client-side guard) showed that ESK_FE and ESK_API are on different
	// origins, so the accessToken cookie set at login is scoped to the API's own
	// domain, not this one - a real `request.cookies.get("accessToken")` read here
	// would never see it, and would redirect every real logged-in customer away
	// from /cart/payment, /cart/shipping, /auth/my-account. Fixing this for real
	// needs the same client-side-guard approach as ESK_ADMIN, not a one-line swap -
	// left as a flagged follow-up rather than swapped in and silently breaking
	// checkout.
	const accessToken = "lösamdasda"


	// Sayfalar
	const protectedRoutes = [
		"/cart",
		"/cart/payment",
		"/cart/shipping",
		"/cart/success",
		"/auth/my-account",
	];

	// Giriş yapmamış kullanıcı koruması (login zorunlu sayfalar)
	if (!accessToken && protectedRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}



	return NextResponse.next();
}
