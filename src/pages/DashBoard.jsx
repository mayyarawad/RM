import { useEffect, useState } from "react";
import AdminDashboard from "../dashBoards/AdminDashboard";
import VendorDashboard from "../dashBoards/VendorDashboard";
import ManagerDashboard from "../dashBoards/ManagerDashboard";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const userRole = useSelector((state) => state.auth.user?.role);

  if (!userRole) return <p className="text-white p-10">Loading...</p>;

  if (userRole === 1) return <AdminDashboard />;
  if (userRole === 5) return <VendorDashboard />;
  if (userRole === 7) return <ManagerDashboard />;
  return <p className="text-white p-10">You don't have permission to view this page.</p>;
}
