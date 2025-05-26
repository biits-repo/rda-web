"use client";
import React, { useState, useEffect } from "react";
import Radioailogo from "../assets/radioailogo.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPlus, FiUserX } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { MdCancel } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import axios, { all } from "axios";
import { RadioPOCAPI } from "@/app/BackendApi/RadiopocApi";
import { toast, ToastContainer } from "react-toastify";
import { useAuth, hasRole } from "@/lib/authUtils";

function UserApproval() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRolePanel, setShowRolePanel] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    role: "",
  });

  const [rolePanelPosition, setRolePanelPosition] = useState({
    top: 0,
    left: 0,
  });
  const [availableRoles] = useState(["Admin", "User"]);
  const [userRoles, setUserRoles] = useState({});
  const [modal, setModal] = useState(false);
  const itemsPerPage = 8;

  const [isLoading, setIsLoading] = useState(false);
  const [UserApprovalData, setUserApprovalData] = useState([]);

  useEffect(() => {
    allData();
  }, []);

  const allData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://expenseapp.creowiz.com/api/get_registered_users/"
      );
      if (response.status === 200) {
        const data = response?.data?.user_details;
        console.log("dd", data);
        setUserApprovalData(data.reverse());
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  // permisiion check

  // Restrict this page to admin and superadmin only
  useAuth(["admin", "superadmin"]);

  // Check permissions and handle loading state
  useEffect(() => {
    const checkPermission = async () => {
      // Short delay to ensure auth state is properly loaded
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!hasRole(["admin", "superadmin"])) {
        // toast.error("You don't have permission to access this page");
        router.push("/home");
      } else {
        setIsLoading(false);
      }
    };

    checkPermission();
  }, [router]);

  // Initialize userRoles state with data from UserApprovalData
  useEffect(() => {
    const initialRoles = {};
    UserApprovalData.forEach((user) => {
      initialRoles[user.id] = {};
      availableRoles.forEach((role) => {
        initialRoles[user.id][role] = user.role.includes(role);
      });
    });
    setUserRoles(initialRoles);
  }, []);

  // Restrict this page to admin and superadmin only
  useAuth(["admin", "superadmin"]);

  // Redirect regular users if they somehow bypass middleware
  useEffect(() => {
    if (!hasRole(["admin", "superadmin"])) {
      toast.error("You don't have permission to access this page");
      router.push("/Dashboard");
    }
  }, [router]);

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [modal]);

  // Handle role toggle
  const toggleRole = (userId, role) => {
    setUserRoles((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [role]: !prev[userId]?.[role],
      },
    }));

    // Update the actual UserApprovalData (in a real app, this would be an API call)
    const updatedUsers = UserApprovalData.map((user) => {
      if (user.id === userId) {
        // If role is being added
        if (
          !user.groups.includes(role) &&
          userRoles[userId]?.[role] === false
        ) {
          return {
            ...user,
            role: [...user.groups, role],
          };
        }
        // If role is being removed
        else if (
          user.groups.includes(role) &&
          userRoles[userId]?.[role] === true
        ) {
          return {
            ...user,
            role: user.groups.filter((r) => r !== groups),
          };
        }
      }
      return user;
    });
  };

  // Open role assignment panel
  const openRolePanel = (user, event) => {
    // Calculate position for the panel based on the button click
    const buttonRect = event.currentTarget.getBoundingClientRect();

    setRolePanelPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX - 150, // Offset to position panel better
    });

    setEditingUser(user);
    setShowRolePanel(true);
  };

  // Close role assignment panel
  const closeRolePanel = () => {
    setShowRolePanel(false);
    setEditingUser(null);
  };

  // Filter users based on search term
  const filteredUsers = UserApprovalData.filter((user) =>
    // user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination values
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination range
  const getPaginationRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleSubmit = async () => {
    const { username, email, firstname, lastname, password, role } = userdata;
    if (!username.trim()) {
      toast.error("username is required");
      return;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!firstname.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!lastname.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (!role.trim()) {
      toast.error("Role is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const res = await RadioPOCAPI.RegistrationApi(userdata);
      setTimeout(() => {
        toast.success("User added successfully");
      }, 500);
      setModal(false);
      setUserdata({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        role: "",
      });
      allData();
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundColor: "red" }}
      >
        <div className="absolute inset-0 bg-[white] opacity-90"></div>
        <div className="absolute top-5 left-5"></div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#145BAF] mb-4"></div>
          <p className="text-[#145BAF] font-medium">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] bg-white">
      {/* Logo Section */}
      <div>
        <img
          src={Radioailogo.src}
          className="pt-5 pl-10 w-[160px]"
          alt="Radio AI Logo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-2 bg-[white] p-4">
          <p className=""></p>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-10 bg-[#ECF2F9] p-4 rounded-tl-3xl">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex items-center mb-4 justify-between p-4">
              <div className="flex items-center">
                <div
                  onClick={() => router.back()}
                  className="bg-[#FFFFFFCC] p-2 rounded-[5px] shadow-sm border border-gray-300 cursor-pointer"
                >
                  <IoIosArrowRoundBack size={24} color="#1C1C1C" />
                </div>
                <h1 className="text-2xl font-semibold text-[#1C1C1C] ml-4">
                  User Management
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    placeholder="Search User"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <button
                  onClick={() => {
                    setModal(true);
                  }}
                  className="bg-[#FCCE60] px-4 py-2 rounded-md font-medium text-[#1B2B07] hover:bg-[#e9bc57] transition-colors flex items-center"
                >
                  <FiPlus className="mr-1" />
                  Add User
                </button>
              </div>
            </div>

            <div>
              <ToastContainer />
              {/* Table */}
              <div className="overflow-x-auto relative  ">
                <div className="px-8 py-3 text-sm text-gray-500 bg-[#F2F2F2]">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                  {filteredUsers.length} total Users
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="py-4 pl-2 text-black font-bold w-[5%]"></th>
                      <th className="py-4 pl-2 text-black font-bold w-[35%] ">
                        Name
                      </th>
                      <th className="py-4 text-black font-bold w-[20%] ">
                        User Role
                      </th>
                      <th className="py-4 text-black font-bold w-[40%] ">
                        User Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length === 0 ? (
                      <>
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center py-10 text-gray-500"
                          >
                            <div className="flex flex-col items-center justify-center space-y-2 h-[230px] w-[100%]">
                              <FiUserX size={32} className="text-gray-400" />
                              <span>No users found</span>
                            </div>
                          </td>
                        </tr>
                      </>
                    ) : (
                      currentUsers.map((user, index) => {
                        const name =
                          user.first_name || user.last_name
                            ? `${user.first_name ?? ""} ${
                                user.last_name ?? ""
                              }`.trim()
                            : user.username ?? user.email;
                        const roles = user.groups ?? [];
                        const imgSrc = `https://picsum.photos/200/300?random=${index}`;

                        return (
                          <tr
                            key={user.email}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="pl-8 py-4">
                              <input
                                type="checkbox"
                                className="rounded border-2 border-[#9747FF]"
                              />
                            </td>
                            <td className="py-4 pl-2">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                  <img
                                    src={imgSrc}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-800">
                                    {name}
                                  </div>
                                  <div className="text-gray-500 text-sm">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex flex-wrap gap-2">
                                {roles.map((role, i) => (
                                  <span
                                    key={i}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                      role === "Super Admin"
                                        ? "bg-[#FBCE61] text-[#1B2B07]"
                                        : role === "Admin"
                                        ? "bg-blue-100 text-[#1C1C1C]"
                                        : "bg-[#1D9051] text-white"
                                    }`}
                                  >
                                    {role}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 relative">
                              <div className="flex items-center space-x-4 gap-4">
                                <button
                                  onClick={(e) => openRolePanel(user, e)}
                                  className="flex items-center text-[#9EA6AB] hover:text-purple-600 font-medium text-sm  w-[36%]"
                                >
                                  <IoSettingsOutline
                                    className="mr-1"
                                    size={18}
                                  />
                                  {editingUser?.email === user.email &&
                                  showRolePanel
                                    ? "Assigning... Roles"
                                    : "Modify Roles"}
                                </button>
                                <button className="flex items-center text-[#9EA6AB] hover:text-red-500">
                                  <RiDeleteBin6Line size={18} />
                                  <span className="ml-1 text-[#9EA6AB]">
                                    Remove User
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Role Assignment Panel - Absolutely positioned */}
              {showRolePanel && editingUser && (
                <div
                  className="absolute bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-10 w-64"
                  style={{
                    top: `${rolePanelPosition.top}px`,
                    left: `${rolePanelPosition.left}px`,
                    maxHeight: "350px",
                  }}
                >
                  <div className="flex justify-end items-center mb-3">
                    {/* <h3 className="text-md font-semibold">Assign Roles</h3> */}
                    <button
                      onClick={closeRolePanel}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <AiOutlineClose size={18} />
                    </button>
                  </div>

                  {/* <div className="border-b border-gray-200 pb-3 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={editingUser.img}
                          alt={editingUser.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{editingUser.name}</div>
                        <div className="text-gray-500 text-sm">
                          {editingUser.email}
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="space-y-3">
                    {availableRoles.map((role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{role}</span>
                        <div
                          className={`w-10 h-5 rounded-full relative cursor-pointer ${
                            userRoles[editingUser.id]?.[role]
                              ? "bg-[#9746FE]"
                              : "bg-gray-300"
                          }`}
                          onClick={() => toggleRole(editingUser.id, role)}
                        >
                          <div
                            className={`absolute w-4 h-4 bg-white rounded-full top-0.5 shadow-sm transition-all duration-300 ${
                              userRoles[editingUser.id]?.[role]
                                ? "right-0.5"
                                : "left-0.5"
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* <div className="flex justify-end mt-4">
                    <button
                      onClick={closeRolePanel}
                      className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm shadow-sm hover:bg-purple-700"
                    >
                      Save Changes
                    </button>
                  </div> */}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-end p-4">
                <div className="flex items-center">
                  <div className="flex items-center text-sm text-gray-500 mr-2">
                    <IoSettingsOutline className="mr-1" size={16} />
                    displaying page
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => goToPage(1)}
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400"
                          : "hover:bg-gray-100"
                      }`}
                      disabled={currentPage === 1}
                    >
                      First
                    </button>
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400"
                          : "hover:bg-gray-100"
                      }`}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>

                    {getPaginationRange().map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === page
                            ? "bg-gray-800 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-2">...</span>
                    )}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400"
                          : "hover:bg-gray-100"
                      }`}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                    <button
                      onClick={() => goToPage(totalPages)}
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400"
                          : "hover:bg-gray-100"
                      }`}
                      disabled={currentPage === totalPages}
                    >
                      Last
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <>
          {/* Overlay (z-10) */}
          <div className="fixed inset-0 z-10 bg-black opacity-80 "></div>

          {/* Modal (z-20) */}
          <div className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden">
            <div className="bg-white w-[800px] h-[600px] rounded-lg shadow-lg p-6">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="font-bold text-[22px]">Add New User</h2>
                  <p className="text-[#979797] text-[14px] mt-3">
                    Create a brand new user and add them to this site
                  </p>
                </div>
                <div
                  onClick={() => {
                    setModal(false);
                    setUserdata({
                      username: "",
                      email: "",
                      firstname: "",
                      lastname: "",
                      password: "",
                      role: "",
                    });
                  }}
                >
                  <MdCancel color="red" size={26} />
                </div>
              </div>
              {/* username  */}
              <div className="grid grid-cols-12  gap-4 mt-5">
                <div className=" col-span-3 py-2">
                  <p className="text-[#000000] text-[16px] font-bold">
                    Username (required)
                  </p>
                </div>
                <div className="col-span-7">
                  <input
                    name="username"
                    value={userdata.username}
                    placeholder="Enter Username"
                    onChange={handleChange}
                    className="border border-[#979797] rounded-[5px] px-3 py-2 w-full"
                  />
                </div>
                <div className="col-span-2 py-2"></div>
              </div>
              {/* email  */}
              <div className="grid grid-cols-12  gap-4 mt-5">
                <div className=" col-span-3 py-2">
                  <p className="text-[#000000] text-[16px] font-bold">
                    Email (required)
                  </p>
                </div>
                <div className=" col-span-7 ">
                  <input
                    type="email"
                    name="email"
                    value={userdata.email}
                    placeholder="Enter Email"
                    onChange={handleChange}
                    className="border border-[#979797] rounded-[5px] px-3 py-2 w-full"
                  />
                </div>
                <div className="col-span-2 py-2"></div>
              </div>
              {/* First Name  */}
              <div className="grid grid-cols-12  gap-4 mt-5">
                <div className=" col-span-3 py-2">
                  <p className="text-[#000000] text-[16px] font-bold">
                    First Name
                  </p>
                </div>
                <div className=" col-span-7 ">
                  <input
                    type="text"
                    name="firstname"
                    value={userdata.firstname}
                    placeholder="Enter First Name"
                    onChange={handleChange}
                    className="border border-[#979797] rounded-[5px] px-3 py-2 w-full"
                  />
                </div>
                <div className="col-span-2 py-2"></div>
              </div>
              {/* last name  */}
              <div className="grid grid-cols-12  gap-4 mt-5">
                <div className=" col-span-3 py-2">
                  <p className="text-[#000000] text-[16px] font-bold">
                    Last Name
                  </p>
                </div>
                <div className=" col-span-7 ">
                  <input
                    type="text"
                    name="lastname"
                    value={userdata.lastname}
                    placeholder="Enter Last Name"
                    onChange={handleChange}
                    className="border border-[#979797] rounded-[5px] px-3 py-2 w-full"
                  />
                </div>
                <div className="col-span-2 py-2"></div>
              </div>
              {/* password  */}

              <div className="grid grid-cols-12 gap-4 mt-5">
                <div className="col-span-3 py-2">
                  <p className="text-[#000000] text-[16px] font-bold">
                    Password
                  </p>
                </div>
                <div className="col-span-7 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userdata.password}
                    placeholder="Enter Password"
                    onChange={handleChange}
                    className="border border-[#979797] rounded-[5px] px-3 py-2 pr-[100px] w-full"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </div>
                </div>
                <div className="col-span-2 py-2"></div>
              </div>
              {/* role  */}
              <div className="grid grid-cols-12 gap-4 mt-5">
                <div className="col-span-3 py-2">
                  <p className="text-[#000000] text-[16px] font-bold">Role</p>
                </div>
                <div className="col-span-7">
                  <select
                    name="role"
                    value={userdata.role}
                    onChange={handleChange}
                    className="border border-[#979797] rounded-[5px] px-2 py-2   w-[30%]"
                  >
                    <option value="">Choose</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-span-2 py-2"></div>
              </div>
              <div
                className="flex justify-end hover:cursor-pointer"
                onClick={HandleSubmit}
              >
                <p className="justify-end mt-5 mr-2.5 bg-gradient-to-l from-[#6FD8EB] to-[#4C35F3] px-3 py-2 text-[#FFFFFF] rounded-[5px]">
                  Add New User
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserApproval;
