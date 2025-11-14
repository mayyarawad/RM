import React, { useState } from "react";

function AddUserModal({ modalType, handleAddUser }) {
  const [profilePreview, setProfilePreview] = useState(null);
  const [idPreview, setIdPreview] = useState(null);

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  if (modalType !== "add") return null;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleAddUser(formData);
      }}
    >
      {/* First Name */}
      <input
        name="first_name"
        placeholder="First Name"
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Last Name */}
      <input
        name="last_name"
        placeholder="Last Name"
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Username */}
      <input
        name="username"
        placeholder="Username"
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Password */}
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Phone */}
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Mobile */}
      <input
        name="mobile"
        type="tel"
        placeholder="Mobile"
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Email */}
      <input
        name="email"
        placeholder="Email"
        type="email"
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Address */}
      <input
        name="address"
        placeholder="Address"
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* ID Number */}
      <input
        name="id_number"
        type="text"
        placeholder="ID Number"
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Role */}
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

      {/* Status */}
      <select
        name="status"
        className="w-full px-3 py-2 border rounded-lg"
        defaultValue={1}
      >
        <option value={1}>Active</option>
        <option value={0}>Disabled</option>
      </select>

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Picture
        </label>
        <input
          type="file"
          name="profile_picture"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setProfilePreview)}
          className="w-full border rounded-lg px-3 py-2"
        />
        {profilePreview && (
          <img
            src={profilePreview}
            alt="Profile Preview"
            className="mt-2 w-24 h-24 rounded-lg object-cover border"
          />
        )}
      </div>

      {/* ID Picture */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ID Picture
        </label>
        <input
          type="file"
          name="id_picture"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setIdPreview)}
          className="w-full border rounded-lg px-3 py-2"
        />
        {idPreview && (
          <img
            src={idPreview}
            alt="ID Preview"
            className="mt-2 w-24 h-24 rounded-lg object-cover border"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900"
      >
        Create
      </button>
    </form>
  );
}

export default AddUserModal;
