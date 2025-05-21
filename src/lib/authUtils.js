// "use client";

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';

// // Hook to protect client-side routes
// export function useAuth(requiredRole = null) {
//   const router = useRouter();

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');

//     if (!userData) {
//       toast.error('Please login to access this page');
//       router.push('/');
//       return;
//     }

//     try {
//       const user = JSON.parse(userData);
//       if (requiredRole && user.group !== requiredRole) {
//         toast.error('You do not have permission to access this page');
//         router.push('/');
//         return;
//       }

//       // Add token to cookie for middleware
//       document.cookie = `userData=${userData}; path=/; max-age=86400`;

//     } catch (error) {
//       // Invalid user data, clear and redirect
//       console.error('Invalid user data:', error);
//       localStorage.removeItem('userData');
//       toast.error('Session expired. Please login again');
//       router.push('/');
//     }
//   }, [router, requiredRole]);
// }

// // Function to get current user
// export function getCurrentUser() {
//   if (typeof window === 'undefined') {
//     return null;
//   }

//   try {
//     const userData = localStorage.getItem('userData');
//     return userData ? JSON.parse(userData) : null;
//   } catch (error) {
//     console.error('Error getting current user:', error);
//     return null;
//   }
// }

// // Function to logout
// export function logout(router) {
//     console.log('ss')
//   localStorage.removeItem('userData');
//   document.cookie = 'userData=; path=/; max-age=0';
//   toast.success('Logged out successfully');
//   router.push('/');
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

/**
 * Hook to protect client-side routes based on authentication and roles
 * @param {string|array} requiredRole - Role(s) required to access the page (optional)
 */
export function useAuth(requiredRole = null) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const userData = localStorage.getItem("userData");

    if (!userData) {
      // No user data found, redirect to login
      //   toast.error('Please login to access this page');
      router.push("/");
      return;
    }

    try {
      const user = JSON.parse(userData);

      // Check if the user has the required role
      if (requiredRole) {
        // Handle both single role and array of roles
        const requiredRoles = Array.isArray(requiredRole)
          ? requiredRole
          : [requiredRole];

        if (!requiredRoles.includes(user.group)) {
          //   toast.error('You do not have permission to access this page');
          router.push("/home"); // Redirect to Dashboard instead of homepage
          return;
        }
      }

      // Add token to cookie for middleware
      document.cookie = `userData=${userData}; path=/; max-age=86400`;
    } catch (error) {
      // Invalid user data, clear and redirect
      console.error("Invalid user data:", error);
      localStorage.removeItem("userData");
      toast.error("Session expired. Please login again");
      router.push("/");
    }
  }, [router, requiredRole]);
}

/**
 * Check if current user has specific role
 * @param {string|array} roles - Role or array of roles to check against
 * @returns {boolean} - Whether user has the required role
 */
export function hasRole(roles) {
  const user = getCurrentUser();

  if (!user) return false;

  const rolesToCheck = Array.isArray(roles) ? roles : [roles];
  return rolesToCheck.includes(user.group);
}

/**
 * Get the current logged in user
 * @returns {object|null} - User data or null if not logged in
 */
export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Log out the current user
 * @param {object} router - Next.js router object
 */
export async function logout(router) {
  localStorage.removeItem("userData");
  document.cookie = "userData=; path=/; max-age=0";
  toast.success("Logged out successfully", {
    position: "top-center",
    autoClose: 3000,
  });
  setTimeout(async () => {
    await router.push("/");
  }, 3000);
}
