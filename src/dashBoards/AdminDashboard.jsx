import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaBan, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

// Mock users (بدون Password)
const mockUsers = [
  {
    id: 1,
    First_Name: "John",
    Last_Name: "Smith",
    Username: "johnsmith1",
    Email: "johnsmith1@example.com",
    Role: 1,
    Status: 1,
  },
  {
    id: 2,
    First_Name: "Emily",
    Last_Name: "Brown",
    Username: "emilyb",
    Email: "emilyb@example.com",
    Role: 5,
    Status: 1,
  },
  {
    id: 3,
    First_Name: "Sophia",
    Last_Name: "Johnson",
    Username: "sophiaj",
    Email: "sophiaj@example.com",
    Role: 9,
    Status: 0,
  },
];

const roleLabels = {
  1: "Super Admin",
  2: "Service Admin",
  3: "Booking Manager",
  4: "Customer",
};

export default function UserDashboard() {
  const theToken = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState("");

  // الفلاتر الجديدة
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getUsers", {
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [theToken]);

  // تصفية المستخدمين
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      user.First_Name?.toLowerCase().includes(term) ||
      user.Last_Name?.toLowerCase().includes(term) ||
      user.Username?.toLowerCase().includes(term) ||
      user.Email?.toLowerCase().includes(term) ||
      roleLabels[user.Role]?.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.Status === 1) ||
      (statusFilter === "disabled" && user.Status === 0);

    const matchesRole =
      roleFilter === "all" || user.Role.toString() === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const openModal = (user = null, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType("");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  };

  return (
    <div className="w-[80%] absolute right-0 p-4 overflow-x-hidden bg-white min-h-screen text-[#1C1C1C] font-sans">
      <div className="flex items-center justify-between overflow-y-hidden mb-8">
        <h1 className="text-3xl font-bold text-[#c99329]">Users Dashboard</h1>
        <button
          onClick={() => openModal(null, "add")}
          className="flex items-center gap-2 text-black border border-black px-5 py-2 rounded-full shadow-md transition"
        >
          <FaPlus className="text-[#FFD700]" />
          <span className="text-sm font-semibold ">Add User</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-auto flex-grow max-w-sm border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <FaSearch className="text-gray-400 mx-3" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pr-4 outline-none text-sm"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
        >
          <option value="all">All Roles</option>
          <option value="1">Super Admin</option>
          <option value="2">Service Admin</option>
          <option value="3">Booking Manager</option>
          <option value="4">Customer</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#DDD] rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-[#F5F5F5] text-[#c99329]">
            <tr className="uppercase text-xs tracking-wider">
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-4 font-medium">
                    {user.First_Name} {user.Last_Name}
                  </td>
                  <td className="p-4">{user.Username}</td>
                  <td className="p-4">{user.Email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {roleLabels[user.Role] || "Guest"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        user.Status === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.Status === 1 ? "Active" : "inActive"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3 text-lg">
                    <button
                      onClick={() => openModal(user, "view")}
                      className="text-blue-600 hover:text-blue-400"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openModal(user, "edit")}
                      className="text-yellow-600 hover:text-yellow-400"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openModal(user, "disable")}
                      className="text-red-600 hover:text-red-400"
                    >
                      <FaBan />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No users found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <h2 className="text-lg font-bold mb-4 text-black capitalize">
              {modalType === "view" && "User Details"}
              {modalType === "edit" && "Edit User"}
              {modalType === "disable" && "Disable User"}
              {modalType === "add" && "Add New User"}
            </h2>

            {/* View Modal */}
            {modalType === "view" && (
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Name:</strong> {selectedUser.First_Name}{" "}
                  {selectedUser.Last_Name}
                </p>
                <p>
                  <strong>Username:</strong> {selectedUser.Username}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.Email}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  {roleLabels[selectedUser.Role] || "Guest"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedUser.Status === 1 ? "Active" : "Disabled"}
                </p>
              </div>
            )}

            {/* Edit Modal */}
            {modalType === "edit" && (
              <form className="space-y-4">
                <input
                  defaultValue={selectedUser.First_Name}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  defaultValue={selectedUser.Last_Name}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  defaultValue={selectedUser.Email}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900">
                  Save Changes
                </button>
              </form>
            )}

            {/* Disable Modal */}
            {modalType === "disable" && (
              <div className="space-y-4 text-gray-700">
                <p>
                  Are you sure you want to disable{" "}
                  <strong>{selectedUser.First_Name}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500">
                    Disable
                  </button>
                </div>
              </div>
            )}

            {/* Add Modal */}
            {modalType === "add" && (
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleAddUser}
              >
                <input
                  name="first_name"
                  placeholder="First Name"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="last_name"
                  placeholder="Last Name"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="username"
                  placeholder="Username"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="mobile"
                  type="tel"
                  placeholder="Mobile"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="address"
                  placeholder="Address"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="id_number"
                  type="text"
                  placeholder="ID Number"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <select
                  name="role"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value={5}>Service Admin</option>
                  <option value={7}>Booking Manager</option>
                  <option value={9}>Customer</option>
                </select>
                <select
                  name="status"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={1}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Disabled</option>
                </select>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Picture
                  </label>
                  <input
                    type="file"
                    name="id_picture"
                    accept="image/*"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
