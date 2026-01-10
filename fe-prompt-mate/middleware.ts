import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 쿠키에서 accessToken 확인
  const accessToken = request.cookies.get("accessToken");
  const isAuthenticated = !!accessToken?.value;

  // 보호된 페이지 경로
  const protectedPaths = ["/home", "/prompts", "/community", "/library", "/settings", "/mypage"];
  const { pathname } = request.nextUrl;

  // 로그인 성공 페이지는 인증 체크 제외
  if (pathname === "/login/success") {
    return NextResponse.next();
  }

  // 보호된 페이지에 접근하려고 할 때
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // if (!isAuthenticated) {
    //   // 로그인 페이지로 리다이렉트 (인터셉팅 라우트가 모달을 표시함)
    //   const loginUrl = new URL("/login", request.url);
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청 경로와 일치:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public 폴더의 파일들
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

