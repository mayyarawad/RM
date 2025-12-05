import { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaCamera } from "react-icons/fa";
import axios from "axios";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ color: "", minPrice: "", maxPrice: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCar, setNewCar] = useState({ Name: "", Number: "", Color: "", Price: "", Center_ID: "" });
  const [showUpload, setShowUpload] = useState(false);
  const [addedCarId, setAddedCarId] = useState(null);

  const fetchCars = async () => {
    const fake = [
      { ID: 1, Name: "Mercedes S-Class", Number: "A123", Color: "Black", Price: 250, Center_ID: 1 },
      { ID: 2, Name: "BMW 7 Series", Number: "B456", Color: "White", Price: 200, Center_ID: 1 },
      { ID: 3, Name: "Audi A8", Number: "C789", Color: "Silver", Price: 220, Center_ID: 2 },
      { ID: 4, Name: "Rolls-Royce Ghost", Number: "RR01", Color: "Gold", Price: 600, Center_ID: 3 },
      { ID: 5, Name: "Range Rover Vogue", Number: "R555", Color: "Black", Price: 300, Center_ID: 1 }
    ];
    setCars(fake);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.Name.toLowerCase().includes(search.toLowerCase()) ||
      car.Number.toString().includes(search.toLowerCase());

    const matchesColor = filters.color ? car.Color === filters.color : true;

    const matchesPrice =
      (filters.minPrice ? car.Price >= Number(filters.minPrice) : true) &&
      (filters.maxPrice ? car.Price <= Number(filters.maxPrice) : true);

    return matchesSearch && matchesColor && matchesPrice;
  });

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/AddCar", newCar);
      alert(response.data.message || "Car added successfully!");
      setShowAddForm(false);
      setAddedCarId(response.data.carId || 1); // تأكد من ID السيارة من الباكند
      setShowUpload(true);
      setNewCar({ Name: "", Number: "", Color: "", Price: "", Center_ID: "" });
      fetchCars();
    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء إضافة السيارة");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] p-10 pl-80">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-[#c99329]">Wedding Cars</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c99329] text-white font-bold shadow-lg hover:scale-105 transition-transform">
          <FaPlus /> {showAddForm ? "Cancel" : "Add New Car"}
        </button>
      </div>

      {/* ADD CAR FORM */}
      {showAddForm && (
        <form onSubmit={handleAddCar} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <input type="text" placeholder="Car Name" value={newCar.Name} onChange={(e) => setNewCar({ ...newCar, Name: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2" required />
          <input type="text" placeholder="Car Number" value={newCar.Number} onChange={(e) => setNewCar({ ...newCar, Number: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2" required />
          <input type="text" placeholder="Color" value={newCar.Color} onChange={(e) => setNewCar({ ...newCar, Color: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2" required />
          <input type="number" placeholder="Price" value={newCar.Price} onChange={(e) => setNewCar({ ...newCar, Price: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2" required />
          <input type="number" placeholder="Center ID" value={newCar.Center_ID} onChange={(e) => setNewCar({ ...newCar, Center_ID: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2" required />
          <div className="sm:col-span-2">
            <button type="submit" className="w-full bg-[#c99329] text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform">Submit Car</button>
          </div>
        </form>
      )}

      {/* PHOTO UPLOAD DESIGN */}
      {showUpload && addedCarId && (
        <div className="mb-10 flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#c99329] mb-3">Upload Car Photo</h2>
          <label className="w-64 h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#c99329] transition-all">
            <FaCamera className="text-3xl text-gray-400 mb-2" />
            <span className="text-gray-500 text-sm">Click to upload photo</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <div className="flex items-center w-full sm:w-auto flex-grow max-w-sm border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <FaSearch className="text-gray-400 mx-3" />
          <input type="text" placeholder="Search cars..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full py-2 pr-4 outline-none text-sm" />
        </div>

        <select value={filters.color} onChange={(e) => setFilters({ ...filters, color: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2 text-sm">
          <option value="">All Colors</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>

        <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2 text-sm" />
        <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="border border-gray-300 rounded-xl px-3 py-2 text-sm" />
      </div>

      {/* CARS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <div key={car.ID} className="bg-white rounded-2xl shadow border border-gray-300 hover:border-[#c99329] transition-all p-6">
            <div className="w-full h-44 rounded-xl mb-4" style={{ backgroundColor: car.Color.toLowerCase() }} />
            <h2 className="text-2xl font-bold text-[#c99329] mb-1">{car.Name}</h2>
            <p className="text-gray-800 text-sm">Number: {car.Number}</p>
            <p className="text-gray-800 text-sm">Color: {car.Color}</p>
            <p className="text-lg font-semibold text-[#c99329] mt-3">${car.Price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
