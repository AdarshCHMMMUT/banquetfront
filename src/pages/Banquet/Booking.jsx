// import { useState, useEffect } from "react";
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';
// import axios from 'axios';
// import { useLocation } from "react-router-dom";

// const Booking = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState([]);
//   const [advance, setAdvance] = useState('');
//   const [total, setTotal] = useState('');
//   const [guestName, setGuestName] = useState("");
//   const [email, setEmail] = useState("");
//   const [whatsappNo, setWhatsappNo] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [noOfPacks, setNoOfPacks] = useState("");
//   const [ratePlan, setRatePlan] = useState("Rate Plan");
//   const [vegNonVeg, setVegNonVeg] = useState("");
//   const [notes, setNotes] = useState("");
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const balance = (parseFloat(total) || 0) - (parseFloat(advance) || 0);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
// let startDate = queryParams.get('start');
// let endDate = queryParams.get('end');
// const date = queryParams.get('date');
// if (!startDate && !endDate && date) {
//   startDate = date;
//   endDate = date;
// }


//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const response = await fetch('https://banquet-seven.vercel.app/api/user/vegmenu');
//         if (!response.ok) throw new Error('Network error');
//         const data = await response.json();
//         console.log("Menu Items:", data.vegMenu);
//         setMenuItems(data.vegMenu || []);
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//         setMenuItems([]);
//       }
//     }
//     fetchMenu();
//   }, []);
 
//   useEffect(() => {
//   async function fetchNonVegMenu() {
//     try {
//       const response = await fetch('https://banquet-seven.vercel.app/api/user/nonvegmenu');
//       if (!response.ok) throw new Error('Network error');
//       const data = await response.json();
//       console.log("Non-Veg Menu Items:", data.nonvegMenu);
//       setMenuItems(data.nonvegMenu || []);
//     } catch (error) {
//       console.error('Error fetching non-veg menu:', error);
//       setMenuItems([]);
//     }
//   }

//   fetchNonVegMenu();
// }, []);


//   const toggleSelect = (category, itemName) => {
//     setSelectedMenu(prev => {
//       const current = prev[category] || [];
//       const alreadySelected = current.includes(itemName);

//       if (alreadySelected) {
//         return {
//           ...prev,
//           [category]: current.filter(name => name !== itemName),
//         };
//       } else {
//         if (current.length >= 3) {
//           alert("Only 3 selections allowed per category.");
//           return prev;
//         }
//         return {
//           ...prev,
//           [category]: [...current, itemName],
//         };
//       }
//     });
//   };


//   const handleSubmit = async () => {
//     console.log("Submitting booking with data:")
//     try {
//       const dataToSend = {
//         guest_name: guestName,
//         email,
//         whatsapp_no: whatsappNo,
//         mobile_no: mobileNo,
//         no_of_packs: parseInt(noOfPacks),
//         rate_plan: ratePlan,
//         veg_non_veg: vegNonVeg,
//         advance_payment: parseFloat(advance),
//         total_payment: parseFloat(total),
//         balance: parseFloat(balance),
//         items: selectedMenu,
//         notes,
//         startDate,
//         endDate
//       };
//       console.log("Data to send:", dataToSend.items);
//       const res = await axios.post('https://banquet-seven.vercel.app/api/user/bookhall', dataToSend);
//       console.log("Booking success:", res.data);
//       alert("Booking submitted successfully!");
//     } catch (error) {
//       console.log(selectedMenu)
//       console.error("Error submitting booking:", error.message, selectedMenu);
//       alert("Failed to submit booking");
//     }
//   };

//   return (

//     <>
//       <div className="grid grid-cols-2 grid-rows-6 md:grid-cols-3 md:grid-rows-4 gap-8 overflow-auto">
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Guest Name</label>
//           <input
//             type="text"
//             value={guestName}
//             onChange={(e) => setGuestName(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Whatsapp Number</label>
//           <input
//             type="tel"
//             value={whatsappNo}
//             onChange={(e) => setWhatsappNo(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//           <input
//             type="tel"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Number of Packs</label>
//           <input
//             type="number"
//             value={noOfPacks}
//             onChange={(e) => setNoOfPacks(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>
         
//           <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Startdate</label>
//           <input
//             type="date"
//             value={startDate}
//             readOnly
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Enddate</label>
//           <input
//             type="date"
//             value={endDate}
//             readOnly
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

        
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Rate Plan</label>
//           <select
//             value={ratePlan}
//             onChange={(e) => setRatePlan(e.target.value)}
//             className="focus:text-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e] appearance-none"
//           >
//             <option disabled>Rate Plan</option>
//             <option>Silver Rate Plan</option>
//             <option>Gold Rate Plan</option>
//             <option>Platinum Rate Plan</option>
//           </select>

//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Advance Payment</label>
//           <input
//             type="number"
//             value={advance}
//             onChange={(e) => setAdvance(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Total Payment</label>
//           <input
//             type="number"
//             value={total}
//             onChange={(e) => setTotal(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Balance</label>
//           <input
//             type="number"
//             value={balance}
//             readOnly
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Veg / Non-Veg</label>
//           <select
//             value={vegNonVeg}
//             onChange={(e) => setVegNonVeg(e.target.value)}
//             className="bg-white text-center text-gray-700 focus:text-black border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           >
//             <option disabled>Veg - Non Veg</option>
//             <option>Veg</option>
//             <option>Non-Veg</option>
//           </select>
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Menu Items</label>
//           <button
//             className="btn bg-gradient-to-r from-[#5e0d14] to-[#991e1e] text-white py-2"
//             onClick={() => document.getElementById('my_modal_3').showModal()}>
//             Open Menu Modal
//           </button>

//           <dialog id="my_modal_3" className="modal">
//             <div className="modal-box relative h-[90%] w-full max-w-3xl z-50 pt-0">
//               <div className="sticky top-0 left-0 w-full px-4 py-2 bg-white z-10">
//                 <form method="dialog">
//                   <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                 </form>
//                 <h3 className="font-bold text-lg text-center pb-2">Menu Items</h3>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 pt-[42px]">
//                 {menuItems.map((categoryBlock, index) => (
//                   <div key={categoryBlock.category} className="border rounded-lg mb-4">
//                     <div
//                       className="bg-gray-200 p-4 cursor-pointer font-semibold flex justify-between items-center"
//                       onClick={() =>
//                         setExpandedCategory(expandedCategory === index ? null : index)
//                       }
//                     >
//                       <span>{categoryBlock.category}</span>
//                       <span>
//                         ({selectedMenu[categoryBlock.category]?.length || 0}/3 selected)
//                       </span>
//                     </div>
//                     {expandedCategory === index && (
//                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
//                         {categoryBlock.items.map((item, idx) => (
//                           <div
//                             key={`${item.name}-${idx}`}
//                             onClick={() => toggleSelect(categoryBlock.category, item.name)}
//                             className={`cursor-pointer border rounded-xl p-4 flex items-center space-x-4 transition ${selectedMenu[categoryBlock.category]?.includes(item.name)
//                                 ? 'bg-blue-100 border-blue-500 shadow-md'
//                                 : 'hover:bg-gray-100'
//                               }`}
//                           >
//                             {item.image && (
//                               <img
//                                 src={item.image.trim()}
//                                 alt={item.name}
//                                 className="w-12 h-12 object-cover rounded"
//                               />
//                             )}
//                             <span className="font-medium">{item.name}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}


//               </div>


//               <form method="dialog" className="flex justify-center items-center mt-6">
//                 <button type="submit" className="btn bg-gradient-to-r from-[#5e0d14] to-[#991e1e] py-2 w-[40%] md:w-[20%] text-white">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </dialog>


//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Notes</label>
//           <input
//             type="text"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
//           />
//         </div>
//       </div>
//       <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex justify-center items-center mt-6">
//         <button type="submit" className="bg-gradient-to-r from-[#5e0d14] to-[#991e1e] py-2 w-[40%] md:w-[20%] text-white">
//           Submit
//         </button>
//       </form>
//     </>

//   );
// }

// export default Booking;
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

  // Define selection limits based on rate plan and veg/non-veg
  const getSelectionLimits = (category) => {
    const limits = {
      "Silver Rate Plan": {
        "Starter Veg": vegNonVeg === "Veg" ? 3 : 2,
        "Starter Non-Veg": vegNonVeg === "Non-Veg" ? 1 : 0,
        "Soup Veg": 1,
        "Soup Non-Veg": 0,
        "Non-Veg Main Course": vegNonVeg === "Non-Veg" ? 1 : 0,
        "Paneer": 1,
        "Vegetable": 2,
        "Bhaja": 0,
        "Lentil": 1,
        "Rice": 1,
        "Indian Breads": 3,
        "Salad": 2,
        "Curd": 1,
        "Desserts": 1,
        "Ice Cream": 1,
      },
      "Gold Rate Plan": {
        "Starter Veg": vegNonVeg === "Veg" ? 4 : 3,
        "Starter Non-Veg": vegNonVeg === "Non-Veg" ? 2 : 0,
        "Soup Veg": vegNonVeg === "Veg" ? 2 : 1,
        "Soup Non-Veg": vegNonVeg === "Non-Veg" ? 1 : 0,
        "Non-Veg Main Course": vegNonVeg === "Non-Veg" ? 2 : 0,
        "Paneer": 1,
        "Vegetable": 2,
        "Bhaja": vegNonVeg === "Veg" ? 1 : 0,
        "Lentil": 1,
        "Rice": 1,
        "Indian Breads": 5,
        "Salad": 3,
        "Curd": 2,
        "Desserts": 2,
        "Ice Cream": 1,
      },
      "Platinum Rate Plan": {
        "Starter Veg": vegNonVeg === "Veg" ? 8 : 4,
        "Starter Non-Veg": vegNonVeg === "Non-Veg" ? 4 : 0,
        "Soup Veg": vegNonVeg === "Veg" ? 2 : 1,
        "Soup Non-Veg": vegNonVeg === "Non-Veg" ? 1 : 0,
        "Non-Veg Main Course": vegNonVeg === "Non-Veg" ? 3 : 0,
        "Paneer": 2,
        "Vegetable": 3,
        "Bhaja": vegNonVeg === "Veg" ? 1 : 0,
        "Lentil": 2,
        "Rice": 2,
        "Indian Breads": 6,
        "Salad": 5,
        "Curd": 2,
        "Desserts": 2,
        "Ice Cream": 2,
      },
    };

    // Map API category names to the defined categories (case-insensitive)
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("starter") && categoryLower.includes("veg")) return limits[ratePlan]?.["Starter Veg"] || 0;
    if (categoryLower.includes("starter") && categoryLower.includes("non-veg")) return limits[ratePlan]?.["Starter Non-Veg"] || 0;
    if (categoryLower.includes("soup") && categoryLower.includes("veg")) return limits[ratePlan]?.["Soup Veg"] || 0;
    if (categoryLower.includes("soup") && categoryLower.includes("non-veg")) return limits[ratePlan]?.["Soup Non-Veg"] || 0;
    if (categoryLower.includes("non-veg") && categoryLower.includes("main")) return limits[ratePlan]?.["Non-Veg Main Course"] || 0;
    if (categoryLower.includes("paneer")) return limits[ratePlan]?.["Paneer"] || 0;
    if (categoryLower.includes("vegetable") || categoryLower.includes("veg main")) return limits[ratePlan]?.["Vegetable"] || 0;
    if (categoryLower.includes("bhaja")) return limits[ratePlan]?.["Bhaja"] || 0;
    if (categoryLower.includes("lentil") || categoryLower.includes("dal")) return limits[ratePlan]?.["Lentil"] || 0;
    if (categoryLower.includes("rice")) return limits[ratePlan]?.["Rice"] || 0;
    if (categoryLower.includes("bread")) return limits[ratePlan]?.["Indian Breads"] || 0;
    if (categoryLower.includes("salad")) return limits[ratePlan]?.["Salad"] || 0;
    if (categoryLower.includes("curd")) return limits[ratePlan]?.["Curd"] || 0;
    if (categoryLower.includes("dessert")) return limits[ratePlan]?.["Desserts"] || 0;
    if (categoryLower.includes("ice cream")) return limits[ratePlan]?.["Ice Cream"] || 0;

    return 0; // Default to 0 if category doesn't match
  };

  // Fetch menu items from API
  useEffect(() => {
    async function fetchMenu() {
      try {
        const endpoint = vegNonVeg === "Veg"
          ? 'https://banquet-seven.vercel.app/api/user/vegmenu'
          : vegNonVeg === "Non-Veg"
          ? 'https://banquet-seven.vercel.app/api/user/nonvegmenu'
          : null;
        
        if (!endpoint) {
          setMenuItems([]);
          return;
        }

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        console.log(`${vegNonVeg} Menu Items:`, vegNonVeg === "Veg" ? data.vegMenu : data.nonvegMenu);
        const fetchedMenuItems = (vegNonVeg === "Veg" ? data.vegMenu : data.nonvegMenu) || [];

        // Filter categories based on selection limits (only include categories with non-zero limits)
        const filteredMenuItems = fetchedMenuItems.filter(categoryBlock => {
          const limit = getSelectionLimits(categoryBlock.category);
          return limit > 0; // Only include categories with a non-zero selection limit
        });

        // No longer slicing items to match the selection limit; show all items
        setMenuItems(filteredMenuItems);
        setSelectedMenu({});
      } catch (error) {
        console.error(`Error fetching ${vegNonVeg} menu:`, error);
        setMenuItems([]);
      }
    }
    fetchMenu();
  }, [vegNonVeg, ratePlan]); // Depend on both vegNonVeg and ratePlan

  // Toggle selection with dynamic limits
  const toggleSelect = (category, itemName) => {
    setSelectedMenu(prev => {
      const current = prev[category] || [];
      const alreadySelected = current.includes(itemName);
      const maxSelections = getSelectionLimits(category);

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
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            readOnly
            className="focus:text-black placeholder:text-gray-400 border border-gray-300 rounded-md text-center py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
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
            <option value="" disabled>Veg - Non Veg</option>
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
                {menuItems.length > 0 ? (
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
                    No menu items available. Please select Veg or Non-Veg and a Rate Plan.
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