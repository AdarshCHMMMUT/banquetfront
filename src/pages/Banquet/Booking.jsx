 
 import { useState, useEffect } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const Booking = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});
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
  const [allLimits, setAllLimits] = useState(null); // Store the full limits document
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const [isLoadingLimits, setIsLoadingLimits] = useState(false);
  const balance = (parseFloat(total) || 0) - (parseFloat(advance) || 0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let startDate = queryParams.get('start');
  let endDate = queryParams.get('end');
  const date = queryParams.get('date');
  if (!startDate && !endDate && date) {
    startDate = date;
    endDate = date;
  }

  const safeStartDate = startDate || "";
  const safeEndDate = endDate || "";

  // Fetch the full limits document from the API
  useEffect(() => {
    async function fetchAllLimits() {
      setIsLoadingLimits(true);
      try {
        const response = await fetch('https://banquet-seven.vercel.app/api/user/getlimits');
        if (!response.ok) throw new Error(`Failed to fetch limits: ${response.statusText}`);
        const result = await response.json();
        console.log("Fetched All Limits:", result);
        if (result.success && result.data) {
          setAllLimits(result.data); // Store the full limits document
        } else {
          console.error("Failed to fetch limits: No valid data in response", result);
          setAllLimits(null);
        }
      } catch (error) {
        console.error("Error fetching all limits:", error.message);
        setAllLimits(null);
      } finally {
        setIsLoadingLimits(false);
      }
    }
    fetchAllLimits();
  }, []); // Fetch only once on component mount

  // Fetch menu items from API, but only after limits are fetched
  useEffect(() => {
    async function fetchMenu() {
      if (!vegNonVeg || ratePlan === "Rate Plan") {
        setMenuItems([]);
        return;
      }

      if (isLoadingLimits) {
        console.log("Waiting for limits to load before fetching menu...");
        return;
      }

      setIsLoadingMenu(true);
      try {
        const endpoint = vegNonVeg === "Veg"
          ? 'https://banquet-seven.vercel.app/api/user/vegmenu'
          : vegNonVeg === "Non-Veg"
          ? 'https://banquet-seven.vercel.app/api/user/nonvegmenu'
          : null;

        if (!endpoint) {
          setMenuItems([]);
          setIsLoadingMenu(false);
          return;
        }

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch menu: ${response.statusText}`);
        const data = await response.json();
        console.log(`${vegNonVeg} Menu Items Response:`, data);
        const fetchedMenuItems = (vegNonVeg === "Veg" ? data.vegMenu : data.nonvegMenu) || [];

        const filteredMenuItems = fetchedMenuItems.filter(categoryBlock => {
          const limit = getSelectionLimits(categoryBlock.category);
          console.log(`Category: ${categoryBlock.category}, Limit: ${limit}`);
          return limit > 0;
        });

        console.log("Filtered Menu Items:", filteredMenuItems);
        setMenuItems(filteredMenuItems);
        setSelectedMenu({});
      } catch (error) {
        console.error(`Error fetching ${vegNonVeg} menu:`, error.message);
        setMenuItems([]);
      } finally {
        setIsLoadingMenu(false);
      }
    }
    fetchMenu();
  }, [vegNonVeg, ratePlan, isLoadingLimits]);

  // Define selection limits based on the full limits document
  const getSelectionLimits = (category) => {
    if (!allLimits || !ratePlan || ratePlan === "Rate Plan" || !vegNonVeg) {
      console.log(`No limits available. allLimits: ${allLimits}, ratePlan: ${ratePlan}, vegNonVeg: ${vegNonVeg}`);
      return 0;
    }

    // Find the matching limits for the current ratePlan and vegNonVeg
    const matchingLimit = allLimits.find(
      limit => limit.ratePlan === ratePlan && limit.vegNonVeg === vegNonVeg
    );

    if (!matchingLimit || !matchingLimit.limits) {
      console.log(`No matching limits found for ratePlan: ${ratePlan}, vegNonVeg: ${vegNonVeg}`);
      return 0;
    }

    const limits = matchingLimit.limits;
    console.log(`Checking limit for category: ${category}, Limits:`, limits);

    const categoryLower = category.toLowerCase().replace(/\s+/g, ' ').trim();

    if ((categoryLower.includes("veg") && categoryLower.includes("starter")) || categoryLower === "veg starters") {
      return limits["Starter Veg"] || 0;
    }
    if ((categoryLower.includes("non-veg") && categoryLower.includes("starter")) || categoryLower === "non-veg starters") {
      return limits["Starter Non-Veg"] || 0;
    }
    if ((categoryLower.includes("veg") && categoryLower.includes("soup")) || categoryLower === "veg soup") {
      return limits["Soup Veg"] || 0;
    }
    if ((categoryLower.includes("non-veg") && categoryLower.includes("soup")) || categoryLower === "non-veg soup") {
      return limits["Soup Non-Veg"] || 0;
    }
    if (categoryLower.includes("non-veg") && (categoryLower.includes("main") || categoryLower.includes("course"))) {
      return limits["Non-Veg Main Course"] || 0;
    }
    if (categoryLower.includes("paneer")) {
      return limits["Paneer"] || 0;
    }
    if (categoryLower.includes("vegetable") || categoryLower.includes("veg main")) {
      return limits["Vegetable"] || 0;
    }
    if (categoryLower.includes("bhaja")) {
      return limits["Bhaja"] || 0;
    }
    if (categoryLower.includes("lentil") || categoryLower.includes("dal")) {
      return limits["Lentil"] || 0;
    }
    if (categoryLower.includes("rice")) {
      return limits["Rice"] || 0;
    }
    if (categoryLower.includes("bread")) {
      return limits["Indian Breads"] || 0;
    }
    if (categoryLower.includes("salad")) {
      return limits["Salad"] || 0;
    }
    if (categoryLower.includes("curd")) {
      return limits["Curd"] || 0;
    }
    if (categoryLower.includes("dessert")) {
      return limits["Desserts"] || 0;
    }
    if (categoryLower.includes("ice cream")) {
      return limits["Ice Cream"] || 0;
    }

    console.log(`No matching limit found for category: ${category}`);
    return 0;
  };

  // Toggle selection with dynamic limits
  const toggleSelect = (category, itemName) => {
    setSelectedMenu(prev => {
      const current = prev[category] || [];
      const alreadySelected = current.includes(itemName);
      const maxSelections = getSelectionLimits(category);
      console.log(`Toggle Select - Category: ${category}, Item: ${itemName}, Current Selections: ${current.length}, Max Selections: ${maxSelections}`);

      if (alreadySelected) {
        return {
          ...prev,
          [category]: current.filter(name => name !== itemName),
        };
      } else {
        if (current.length >= maxSelections) {
          alert(`Only ${maxSelections} selection${maxSelections > 1 ? 's' : ''} allowed for ${category}.`);
          return prev;
        }
        return {
          ...prev,
          [category]: [...current, itemName],
        };
      }
    });
  };

  const handleSubmit = async () => {
    console.log("Submitting booking with data:");
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
        items: selectedMenu,
        notes,
        startDate,
        endDate
      };
      
      if (Object.values(dataToSend).some(value => value === null || value === undefined || value === '')) {
        console.error("Missing required data:", dataToSend);
        alert("Please fill in all required fields.");
        return;
      }
    
      console.log("Data to send:", dataToSend.items);
      const res = await axios.post('https://banquet-seven.vercel.app/api/user/bookhall', dataToSend);
      console.log("Booking success:", res.data);
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error.message, selectedMenu);
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
            required
            onChange={(e) => setGuestName(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Whatsapp Number</label>
          <input
            type="tel"
            value={whatsappNo}
            required
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
            required
            onChange={(e) => setNoOfPacks(e.target.value)}
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>
         
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={safeStartDate}
            readOnly
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={safeEndDate}
            readOnly
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
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
            required
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
            <option value="" disabled>Select</option>
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Menu Items</label>
          <button
            className="btn bg-gradient-to-r from-[#5e0d14] to-[#991e1e] text-white py-2"
            onClick={() => document.getElementById('my_modal_3').showModal()}
            disabled={!vegNonVeg || ratePlan === "Rate Plan"}
          >
            Open Menu Modal
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box relative h-[90%] w-full max-w-3xl z-50 pt-0">
              <div className="sticky top-0 left-0 w-full px-4 py-2 bg-white z-10">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center pb-2">{vegNonVeg} Menu Items</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 pt-[42px]">
                {isLoadingMenu || isLoadingLimits ? (
                  <div className="text-center text-gray-500">
                    Loading menu items...
                  </div>
                ) : menuItems.length > 0 ? (
                  menuItems.map((categoryBlock, index) => (
                    <div key={categoryBlock.category} className="border rounded-lg mb-4">
                      <div
                        className="bg-gray-200 p-4 cursor-pointer font-semibold flex justify-between items-center"
                        onClick={() =>
                          setExpandedCategory(expandedCategory === index ? null : index)
                        }
                      >
                        <span>{categoryBlock.category}</span>
                        <span>
                          ({selectedMenu[categoryBlock.category]?.length || 0}/{getSelectionLimits(categoryBlock.category)} selected)
                        </span>
                      </div>
                      {expandedCategory === index && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                          {categoryBlock.items.map((item, idx) => (
                            <div
                              key={`${item.name}-${idx}`}
                              onClick={() => toggleSelect(categoryBlock.category, item.name)}
                              className={`cursor-pointer border rounded-xl p-4 flex items-center space-x-4 transition ${selectedMenu[categoryBlock.category]?.includes(item.name)
                                  ? 'bg-blue-100 border-blue-500 shadow-md'
                                  : 'hover:bg-gray-100'
                                }`}
                            >
                              {item.image && (
                                <img
                                  src={item.image.trim()}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              )}
                              <span className="font-medium">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No menu items available. Please ensure a valid Rate Plan and Veg/Non-Veg option are selected.
                  </div>
                )}
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