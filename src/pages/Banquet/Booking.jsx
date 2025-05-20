import React, { useState } from "react";


import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';  
import axios from 'axios';   







const Booking = () => {



  const menuItems = [
  { id: 1,url:"https://cdn.mygingergarlickitchen.com/images_webp/800px/800px-restaurant-style-paneer-butter-masala-recipe-1.webp",name: "Paneer Butter Masala ", price: 300 },
  { id: 2,url:"https://i.ytimg.com/vi/csfIOfMnRGg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6GPMx72TdT-BQh86wkTA3VKBRpQ",name: "Chole Bhature", price: 500 },
  { id: 3,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_I8R5TXGoabQURaYGUMiLe7d1GIcdpLdTLQ&s",name: "Palak Paneer", price: 300},
  { id: 4,url:"https://www.cubesnjuliennes.com/wp-content/uploads/2020/06/Authentic-Punjabi-Rajma-Recipe.jpg",name: "Rajma Masala", price: 500 },
  { id: 5,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLAvEjf0i2_LLV283xbzTblkByfIPVuzoVwQ&s",name: "Aloo Gobi", price: 300 },
  { id: 6,url:"https://artofpalate.com/wp-content/uploads/2020/06/mutton-biryani.jpg",name: "Hyderabadi Mutton Biryani ", price: 500 },
  { id: 7,url:"https://maayeka.com/wp-content/uploads/2012/12/baigan-bharta-1.jpg",name: "Baingan Bharta", price: 300 },
  { id: 8,url:"https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Vegetable-Biryani-With-Green-Raita-159c15d.jpg?quality=90&resize=556,505",name: "Vegetable Biryani", price: 500 },
  { id: 9,url:"https://www.shemins.com/wp-content/uploads/2017/05/Shemins-Butter-Chicken-LR.jpg",name: "Butter Chicken", price: 500 },
  { id: 10,url:"https://allwaysdelicious.com/wp-content/uploads/2023/05/chicken-biryani-vert-1.jpg",name: "Chicken Biryani", price: 300 },
  { id: 11,url:"https://headbangerskitchen.com/wp-content/uploads/2024/08/ROGANJOSH-H2.jpg",name: "Mutton Rogan Josh", price: 500 },
  { id: 12,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE_jxW7GIhqQ5V_bI-IGjkGeFhIBjHOsPuUg&s",name: "Chicken Tikka Masala", price: 300 },
  { id: 13,url:"https://www.licious.in/blog/wp-content/uploads/2022/03/shutterstock_1891229335-min.jpg",name: "Fish Curry", price: 500 },
   { id: 14,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0Z0p1dWKj_Ltu3e_kEqMHAGy7HalMdX8oQ&s",name: "Prawn Masala", price: 500 },
  { id: 15,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0Z0p1dWKj_Ltu3e_kEqMHAGy7HalMdX8oQ&s",name: "Egg Curry", price: 300 },
  { id: 16,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpSWuX15EBWpTCmP0iLJ1ab8n4l8uC2AqYQ&s",name: "Chicken 65", price: 500 },
  { id: 17,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTi22kauexqXvmMg4GQC5dpFto-19Mz52Gcg&s",name: "Tandoori Chicken", price: 300 },
  
  ];

   
   const [vegNonvegPlan, setVegNonveg] = useState('veg/Non veg');
   const [selectedMenu, setSelectedMenu] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [advance, setAdvance] = useState('');
   const [total, setTotal] = useState('');
   const balance = ((total) || 0) - ((advance) || 0);

   const [guestName, setGuestName] = useState("");
const [email, setEmail] = useState("");
const [whatsappNo, setWhatsappNo] = useState("");
const [mobileNo, setMobileNo] = useState("");
const [noOfPacks, setNoOfPacks] = useState("");
const [ratePlan, setRatePlan] = useState("Rate Plan");
const [vegNonVeg, setVegNonVeg] = useState("");
const [notes, setNotes] = useState("");


      const filteredMenuItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

      const toggleSelect = (id) =>{
        const selectedItem = menuItems.find(item => item.id === id);
          setSelectedMenu((prevSelected) => {
          const isalredySelected = prevSelected.some(item => item.id === id);
          if (isalredySelected){
             return prevSelected.filter(item => item.id !== id);
          }
          else{
            return [...prevSelected, selectedItem];
          }
        });

      };


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
    
    menu_item: selectedMenu.map(item => item.name), // Or `item.id` if backend needs ID
    notes,
   
  };
     
     
   

    const res = await axios.post('http://localhost:5000/api/bookings', dataToSend);
    console.log("Success:", res);
    console.log("Response:", res.data);
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
      defaultValue="Rate Plan"
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
      value={vegNonvegPlan}
      onChange={(e) => setVegNonveg(e.target.value)}
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
      onClick={() => document.getElementById('my_modal_3').showModal()}
    >
      Open Menu Modal
    </button>

    <dialog id="my_modal_3" className="modal">
  <div className="modal-box relative h-[90%] w-full max-w-3xl z-50 pt-0">
    <div className="sticky top-0 left-0 w-full px-4 py-2 bg-white z-10">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 className="font-bold text-lg text-center pb-2">Menu Items</h3>
      <label className="text-sm font-medium text-gray-700 mb-1 block">Search Menu</label>
      <label className="input w-full border border-gray-300 rounded-md text-center py-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-[#991e1e]">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow text-center text-black placeholder-black focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
        />
      </label>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-[42px]">
      {filteredMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => toggleSelect(item.id)}
          className={`rounded-md p-4 flex flex-col cursor-pointer ${
            selectedMenu.some((selected) => selected.id === item.id)
              ? "border-2 border-[#991e1e] shadow-md"
              : "border border-gray-300 shadow-xl hover:bg-gray-100 hover:drop-shadow-[0_4px_6px_rgba(153,30,30,0.4)]"
          }`}
        >
          <div className="flex justify-center items-center mb-2">
            <img className="w-full h-[10rem] object-cover rounded-md" src={item.url} alt="" />
          </div>
          <p className="font-semibold text-center">{item.name}</p>
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
