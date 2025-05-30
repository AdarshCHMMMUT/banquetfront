import { useState, useEffect } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import axios from 'axios';

const Booking = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [advance, setAdvance] = useState('');
  const [total, setTotal] = useState('');
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [noOfPacks, setNoOfPacks] = useState("");
  const [ratePlan, setRatePlan] = useState("Rate Plan");
  const [vegNonVeg, setVegNonVeg] = useState("");
  const [notes, setNotes] = useState("");
    const [expandedCategory, setExpandedCategory] = useState(null);

  const balance = (parseFloat(total) || 0) - (parseFloat(advance) || 0);

  // 🟢 Async menu fetching using useEffect
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch('https://banquet-seven.vercel.app/api/user/vegmenu');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        console.log("Menu Items:", data.vegMenu);
        setMenuItems(data.vegMenu || []);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setMenuItems([]);
      }
    }

    fetchMenu();
  }, []);
  const toggleSelect = (category, itemName) => {
  setSelectedMenu(prev => {
    const current = prev[category] || [];
    const alreadySelected = current.includes(itemName);

    if (alreadySelected) {
      return {
        ...prev,
        [category]: current.filter(name => name !== itemName),
      };
    } else {
      if (current.length >= 3) {
        alert("Only 3 selections allowed per category.");
        return prev;
      }
      return {
        ...prev,
        [category]: [...current, itemName],
      };
    }
  });
};


  // 📨 Submit booking
  const handleSubmit = async () => {
    try {
      const dataToSend = {
        guest_name: guestName,
        email,
        whatsapp_no: whatsappNo,
        mobile_no: mobileNo,
        no_of_packs: parseInt(noOfPacks),
        rate_plan: ratePlan,
        veg_non_veg: vegNonVeg,
        advance_payment: parseFloat(advance),
        total_payment: parseFloat(total),
        balance: parseFloat(balance),
        menu_item: selectedMenu.map(item => item.name),
        notes,
      };

      const res = await axios.post('http://localhost:4000/api/bookings', dataToSend);
      console.log("Booking success:", res.data);
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking");
    }
  };





  return (

    <>
      <div className="grid grid-cols-2 grid-rows-6 md:grid-cols-3 md:grid-rows-4 gap-8 overflow-auto">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Guest Name</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Whatsapp Number</label>
          <input
            type="tel"
            value={whatsappNo}
            onChange={(e) => setWhatsappNo(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Number of Packs</label>
          <input
            type="number"
            value={noOfPacks}
            onChange={(e) => setNoOfPacks(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Rate Plan</label>
          <select
            value={ratePlan}
            onChange={(e) => setRatePlan(e.target.value)}
            className="focus:text-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e] appearance-none"
          >
            <option disabled>Rate Plan</option>
            <option>Silver Rate Plan</option>
            <option>Gold Rate Plan</option>
            <option>Platinum Rate Plan</option>
          </select>

        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Advance Payment</label>
          <input
            type="number"
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Total Payment</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Balance</label>
          <input
            type="number"
            value={balance}
            readOnly
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Veg / Non-Veg</label>
          <select
            value={vegNonVeg}
            onChange={(e) => setVegNonVeg(e.target.value)}
            className="bg-white text-center text-gray-700 focus:text-black border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          >
            <option disabled>Veg - Non Veg</option>
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Menu Items</label>
          <button
            className="btn bg-gradient-to-r from-[#5e0d14] to-[#991e1e] text-white py-2"
            onClick={() => document.getElementById('my_modal_3').showModal()}>
            Open Menu Modal
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box relative h-[90%] w-full max-w-3xl z-50 pt-0">
              <div className="sticky top-0 left-0 w-full px-4 py-2 bg-white z-10">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center pb-2">Menu Items</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 pt-[42px]">
            {menuItems.map((categoryBlock, index) => (
  <div key={categoryBlock.category} className="border rounded-lg mb-4">
    {/* Category Header */}
    <div
      className="bg-gray-200 p-4 cursor-pointer font-semibold flex justify-between items-center"
      onClick={() =>
        setExpandedCategory(expandedCategory === index ? null : index)
      }
    >
      <span>{categoryBlock.category}</span>
      <span>
        ({selectedMenu[categoryBlock.category]?.length || 0}/3 selected)
      </span>
    </div>

    {/* Items Grid */}
    {expandedCategory === index && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {categoryBlock.items.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`} // added idx to avoid duplicate key warning
            onClick={() => toggleSelect(categoryBlock.category, item.name)}
            className={`cursor-pointer border rounded-xl p-4 flex items-center space-x-4 transition ${
              selectedMenu[categoryBlock.category]?.includes(item.name)
                ? 'bg-blue-100 border-blue-500 shadow-md'
                : 'hover:bg-gray-100'
            }`}
          >
            {item.image && (
              <img
                src={item.image.trim()} // trim leading space
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
                onError={(e) =>
                  (e.target.src = 'https://via.placeholder.com/48')
                }
              />
            )}
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    )}
  </div>
))}


              </div>


              <form method="dialog" className="flex justify-center items-center mt-6">
                <button type="submit" className="btn bg-gradient-to-r from-[#5e0d14] to-[#991e1e] py-2 w-[40%] md:w-[20%] text-white">
                  Submit
                </button>
              </form>
            </div>
          </dialog>


        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex justify-center items-center mt-6">
        <button type="submit" className="bg-gradient-to-r from-[#5e0d14] to-[#991e1e] py-2 w-[40%] md:w-[20%] text-white">
          Submit
        </button>
      </form>
    </>

  );
}

export default Booking;
