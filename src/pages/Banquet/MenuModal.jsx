import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';  
import { useNavigate } from "react-router-dom";    

const Booking = () => {
  // const [dates, setDates] = useState(null);
  // const navigate = useNavigate();
  // const [showForm, setShowForm] = useState(false);
  // const isRangeSelected = dates && dates.length === 2 && dates[0] && dates[1];

  const menuItems = [
    { id: 1, name: "Paneer Curry", price: 300 },
    { id: 2, name: "Chapati Veg", price: 500 },
    { id: 3, name: "Salad", price: 300 },
    { id: 4, name: "Salad", price: 500 },
    { id: 5, name: "Paneer Curry", price: 300 },
    { id: 6, name: "Chapati Veg", price: 500 },
    { id: 7, name: "Paneer Curry", price: 300 },
    { id: 8, name: "Chapati Veg", price: 500 },
  ];

  const [selected, setSelected] = useState('Rate Plan');
  const [vegNonvegPlan, setVegNonveg] = useState('veg/Non veg');
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [advance, setAdvance] = useState('');
  const [total, setTotal] = useState('');

  const balance = (parseFloat(total) || 0) - (parseFloat(advance) || 0);

  const toggleSelect = (id) => {
    setSelectedMenu((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <>
      {/* <div className="flex flex-col items-center">
        <Calendar 
          value={dates}
          onChange={(e) => setDates(e.value)} 
          selectionMode="range" 
          inline 
          showWeek 
          readOnlyInput 
          className="w-full"
        />
        <button
          className={`py-2 w-[20%] text-white ${
            isRangeSelected ? "bg-gradient-to-r from-sky-600 to-cyan-400" : "bg-gray-400"
          }`}
          disabled={!isRangeSelected}
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div> */}

      <div className="grid grid-cols-2 grid-rows-6 md:grid-cols-3 md:grid-rows-4 gap-8">
        <input type="text" placeholder="Guest Name" className="border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <input type="email" placeholder="Email" className="border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"/>
        <input type="tel" placeholder="Whatsapp Number" className="border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <input type="tel" placeholder="Mobile Number" className="border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <input type="number" placeholder="Number Of Packs" className="border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"/>
        
        <div>
          <select defaultValue="Pick a color" className="select text-center">
            <option disabled={true}>Rate Plan</option>
            <option>Rate Plan 1</option>
            <option>Rate Plan 2</option>
            <option>Rate Plan 3</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Advanced Payment"
          value={advance}
          onChange={(e) => setAdvance(e.target.value)}
          className="border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <input
          type="number"
          placeholder="Total Payment"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          className="border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <input
          type="number"
          placeholder="Balance"
          value={balance}
          readOnly
          className="border border-gray-300 rounded-md text-center py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
        />

        <select defaultValue="Pick a color" className="select text-center">
          <option disabled={true}>Veg /Non Veg</option>
          <option>Veg</option>
          <option>Non Veg</option>
        </select>

        <label htmlFor="my_modal_7" className="btn">Open Modal</label>

        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box h-[90%] w-[90%]">
            <div className="p-4 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center">Menu Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelect(item.id)}
                    className={`cursor-pointer border rounded-xl p-4 flex justify-between items-center transition ${
                      selectedMenu.includes(item.id)
                        ? "bg-blue-100 border-blue-500 shadow-md"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6">
        <button className="bg-gradient-to-r from-sky-600 to-cyan-400 py-2 w-[40%] md:w-[20%] text-white">Submit</button>
      </div>
    </>
  );
};

export default Booking;
