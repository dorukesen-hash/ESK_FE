import {NextResponse} from "next/server";

export function middleware(request) {
	const {pathname} = request.nextUrl;

	// const accessToken = request.cookies.get("accessToken")?.value;
	// const isAdmin = request.cookies.get("isAdmin")?.value;


	const accessToken = "lösamdasda"
	const isAdmin = "admin"


	// Sayfalar
	const protectedRoutes = [
		"/cart",
		"/cart/payment",
		"/cart/shipping",
		"/cart/success",
		"/auth/my-account",
	];


	// Admin panel koruması
	if (pathname.startsWith("/admin")) {
		if (isAdmin !== "admin") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	// Giriş yapmamış kullanıcı koruması (login zorunlu sayfalar)
	if (!accessToken && protectedRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}



	return NextResponse.next();
}
