// // import { NextResponse } from "next/server";

// // export function middleware(request) {
// //   // Get path name
// //   const path = request.nextUrl.pathname;

// //   // Define public paths that don't require authentication
// //   const isPublicPath =
// //     path === "/" ||
// //     path === "/NormalLogin" ||
// //     path === "/AdminLogin" ||
// //     path === "/SuperAdminLogin" ||
// //     path === "/Signup";

// //   // Get token from localStorage (only works client-side)
// //   // For middleware, we need to use cookies instead
// //   const token = request.cookies.get("userData")?.value;

// //   // Redirect logic
// //   // If trying to access protected page without being logged in
// //   if (!isPublicPath && !token) {
// //     return NextResponse.redirect(new URL("/", request.url));
// //   }

// //   // If trying to access login/signup pages while already logged in
// //   if (isPublicPath && token) {
// //     // Parse the token to get user data
// //     try {
// //       const userData = JSON.parse(token);

// //       // Redirect based on user group
// //       if (userData.group === "user") {
// //         return NextResponse.redirect(new URL("/Dashboard", request.url));
// //       }
// //       // Add other redirects for admin, superadmin if implemented
// //     } catch (error) {
// //       // If token parsing fails, clear the invalid cookie
// //       const response = NextResponse.redirect(new URL("/", request.url));
// //       response.cookies.delete("userData");
// //       return response;
// //     }
// //   }

// //   return NextResponse.next();
// // }

// // // Configure paths that the middleware should run on
// // export const config = {
// //   matcher: [
// //     "/",
// //     "/NormalLogin",
// //     "/AdminLogin",
// //     "/SuperAdminLogin",
// //     "/Signup",
// //     "/home",
// //     "/SponsorPage",
// //     "/UserApproval",
// //   ],
// // };

// //hdhdh

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // Get path name
//   const path = request.nextUrl.pathname;

//   // Define public paths that don't require authentication
//   const isPublicPath =
//     path === "/" ||
//     path === "/NormalLogin" ||
//     path === "/AdminLogin" ||
//     path === "/SuperAdminLogin" ||
//     path === "/Signup";

//   // Define role-based access paths
//   const adminOnlyPaths = ["/UserApproval","/TexttoSpeech"]; // Add more paths as needed
//   const superAdminOnlyPaths = ["/UserApproval","/TexttoSpeech"]; // Add more paths as needed
  
//   // Check if the current path is restricted to admin or superadmin
//   const isAdminPath = adminOnlyPaths.includes(path);
//   const isSuperAdminPath = superAdminOnlyPaths.includes(path);

//   // Get token from cookies
//   const token = request.cookies.get("userData")?.value;

//   // CASE 1: If trying to access protected page without being logged in at all
//   if (isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // CASE 2: If user is logged in, check role-based access
//   if (token) {
//     try {
//       const userData = JSON.parse(token);
//       const userRole = userData.group;

//       // If already logged in user tries to access login/signup pages
//       if (isPublicPath) {
//         // Redirect based on user group
//         if (userRole === "user") {
//           return NextResponse.redirect(new URL("/Dashboard", request.url));
//         } else if (userRole === "admin") {
//           return NextResponse.redirect(new URL("/Dashboard", request.url)); 
//         } else if (userRole === "superadmin") {
//           return NextResponse.redirect(new URL("/Dashboard", request.url)); 
//         }
//       }

//       // If normal user tries to access admin-only paths
//       if ((isAdminPath || isSuperAdminPath) && userRole === "user") {
//         return NextResponse.redirect(new URL("/Dashboard", request.url));
//       }

//       // If admin tries to access superadmin-only paths
//       if (isSuperAdminPath && userRole === "admin" && !adminOnlyPaths.includes(path)) {
//         return NextResponse.redirect(new URL("/Dashboard", request.url));
//       }

//     } catch (error) {
//       // If token parsing fails, clear the invalid cookie
//       const response = NextResponse.redirect(new URL("/", request.url));
//       response.cookies.delete("userData");
//       return response;
//     }
//   }

//   return NextResponse.next();
// }

// // Configure paths that the middleware should run on
// export const config = {
//   matcher: [
//     "/",
//     "/NormalLogin",
//     "/AdminLogin",
//     "/SuperAdminLogin",
//     "/Signup",
//     "/Dashboard",
//     "/SponsorPage",
//     "/UserApproval",
//     "/TexttoSpeech"
//   ],
// };


import { NextResponse } from "next/server";

export function middleware(request) {
  // Get path name
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/NormalLogin" ||
    path === "/AdminLogin" ||
    path === "/SuperAdminLogin" ||
    path === "/Signup";

  // Define protected paths (require any kind of login)
  const protectedPaths = ["/Dashboard", "/SponsorPage", "/UserApproval", "/TexttoSpeech"];
  
  // Define role-based access paths
  const adminOnlyPaths = ["/UserApproval", "/TexttoSpeech"]; // Paths for admin and superadmin
  const superAdminOnlyPaths = []; // Paths exclusively for superadmin
  
  // Check if the current path is restricted
  const isProtectedPath = protectedPaths.includes(path);
  const isAdminPath = adminOnlyPaths.includes(path);
  const isSuperAdminPath = superAdminOnlyPaths.includes(path);

  // Get token from cookies
  const token = request.cookies.get("userData")?.value;
  
  // Debug logging (only during development)
  console.log("Path:", path);
  console.log("Is Protected:", isProtectedPath);
  console.log("Has Token:", !!token);

  // CASE 1: If trying to access protected page without being logged in
  if (isProtectedPath && !token) {
    console.log("Redirecting unauthenticated user from protected path:", path);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // CASE 2: If trying to access login/signup pages while logged in
  if (isPublicPath && token) {
    try {
      const userData = JSON.parse(token);
      const userRole = userData.group;

      // Redirect based on user group - all logged-in users go to Dashboard
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    } catch (error) {
      // If token parsing fails, clear the invalid cookie
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("userData");
      return response;
    }
  }

  // CASE 3: Role-based access control for specific paths
  if (token) {
    try {
      const userData = JSON.parse(token);
      const userRole = userData.group;

      // If normal user tries to access admin-only paths
      if (isAdminPath && userRole === "user") {
        return NextResponse.redirect(new URL("/Dashboard", request.url));
      }

      // If admin tries to access superadmin-only paths
      if (isSuperAdminPath && userRole !== "superadmin") {
        return NextResponse.redirect(new URL("/Dashboard", request.url));
      }
    } catch (error) {
      // If token parsing fails, clear the invalid cookie
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("userData");
      return response;
    }
  }

  return NextResponse.next();
}

// Configure paths that the middleware should run on
export const config = {
  matcher: [
    // Public paths
    "/",
    "/NormalLogin",
    "/AdminLogin",
    "/SuperAdminLogin",
    "/Signup",
    
    // Protected paths
    "/Dashboard",
    "/SponsorPage",
    "/UserApproval",
    "/TexttoSpeech"
  ],
};