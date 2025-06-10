import axios from "axios";
import { useEffect, useState } from "react";

const Showbooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const [searchInput, setsearchInput] = useState("");
  useEffect(() => {
    axios
      .get("https://banquet-seven.vercel.app/api/user/getbookings")
      .then((response) => {
        setAllBookings(response.data.data);
        setBookings(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);
  const searchbookings = () => {
    const filteredBookings = allBookings.filter((booking) => {
      return (
        booking.hall_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        booking.guest_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        booking.rate_plan.toLowerCase().includes(searchInput.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setBookings(filteredBookings);
  };
  

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-[#5e0d14] mb-8 text-center">
        Banquet Hall Bookings
      </h1>
      <h2 className="mb-5">
          <div className="text-center text-xl font-bold">
            <input 
              type="text" 
              placeholder="Search within the orders" 
              value={searchInput} 
              onChange={(e) => setsearchInput(e.target.value)}
              className="px-3 py-2 border rounded-l-md focus:outline-none"
            />
            <button 
              className="bg-[#991e1e] text-white px-4 py-2 rounded-r-md hover:bg-[#5e0d14]" 
              onClick={searchbookings}
            >
              Search
            </button>
           {searchInput && (
              <button
                className="bg-[#991e1e] text-white px-4 py-2 rounded-r-md hover:bg-[#5e0d14]"
                onClick={() => {
                  setsearchInput("");
                  setBookings(allBookings);
                }}
              >
                Reset
              </button>
            )}
            
          </div>
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#991e1e]">
                  {booking.hall_name}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                    }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Guest:</strong> {booking.guest_name}
                </p>
                <p>
                  <strong>Mobile:</strong> {booking.mobile_no}
                </p>
                <p>
                  <strong>Rate Plan:</strong> {booking.rate_plan}
                </p>
                <p>
                  <strong>Veg/Non-Veg:</strong> {booking.veg_non_veg}
                </p>
                <p>
                  <strong>Guests:</strong> {booking.no_of_packs}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{booking.total_payment} (
                  <span className="text-green-600">Advance: ₹{booking.advance_payment}</span>,{" "}
                  <span className="text-red-600">Due: ₹{booking.balance}</span>)
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Menu:</strong>{" "}
                  {
                    booking.menu_item && (
                      <button 
                        onClick={() => setVisibleItems(prev => ({
                          ...prev, 
                          [index]: !prev[index]
                        }))} 
                        className="text-[#991e1e]"
                      >
                        {visibleItems[index] ? "Hide Items" : "Show Items"}
                      </button>
                    )}
                  {visibleItems[index] &&
                    <span className="block text-gray-600 text-xs">
                      {booking.menu_item}
                    </span>
                  }
                </p>
                {booking.notes && (
                  <p className="italic text-gray-500">Note: {booking.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Showbooking;
