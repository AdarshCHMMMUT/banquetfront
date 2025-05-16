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

  //  const isRangeSelected = dates && dates.length === 2 && dates[0] && dates[1];

  //  const handleBooking = () => {
   
  //  };



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

   const [selected, setSelected] = useState('Rate Plan');
   const [vegNonvegPlan, setVegNonveg] = useState('veg/Non veg');
   const [selectedMenu, setSelectedMenu] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   
      
    
      const [advance, setAdvance] = useState('');
      const [total, setTotal] = useState('');
      const balance = ((total) || 0) - ((advance) || 0);


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
                className="w-full "
            />

            <button
  className={`py-2 w-[20%] text-white ${
    isRangeSelected ? "bg-gradient-to-r from-sky-600 to-cyan-400" : "bg-gray-400"
  }`}
  disabled={!isRangeSelected} onClick={handleBooking}
>
  Book Now
</button>


        </div> */}

  



        <div className="grid grid-cols-2 grid-rows-6 md:grid-cols-3 md:grid-rows-4 gap-8 ">
          
            <input type="text" placeholder="Guest Name" className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]" />
            <input type="email" placeholder="Email" className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"/>
            <input type="tel" placeholder="Whatsapp Number" className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]" />
             <input type="tel" placeholder="Mobile Number" className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]" />
          <input type="number" placeholder="Number Of Packs" className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"/>
          
          <div>
        <select 
  defaultValue="Pick a color" 
  className=" focus:text-black w-full focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e] appearance-none"
>
  <option disabled>Rate Plan</option>
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
       className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
      />
      <input
        type="number"
        placeholder="Total Payment"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
      />
      <input
        type="number"
        placeholder="Balance"
        value={balance}
        readOnly
       className=" focus:text-black focus:placeholder-black border border-gray-300 rounded-md text-center py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
      />

  <select
  defaultValue="Pick a color"
  className="select bg-white text-center text-gray-700 focus:text-black focus:placeholder-black border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
>
  <option disabled>Veg /Non Veg</option>
  <option>Veg</option>
  <option>Non Veg</option>
</select>

<label htmlFor="my_modal_7" className="btn ">open modal</label>
<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal" role="dialog ">
  <div className="modal-box relative h-[90%] w-full max-w-3xl z-50">
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Menu Items</h2>

      <div className="sticky top-0 left-0 w-full px-4 py-2 bg-white z-10">
<label className=" input w-full border border-gray-300 rounded-md text-center py-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-[#991e1e]">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input
    type="search"
    className="grow text-center text-black placeholder-black focus:outline-none " 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search"
  />
</label>
      </div>






      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 pt-[42px]   ">
        {filteredMenuItems.map((item) => (<div key={item.id} onClick={() => toggleSelect(item.id)} className={`border border-gray-300 rounded-md p-4 flex flex-col  cursor-pointer   ${selectedMenu.some((selected) => selected.id === item.id)  ? "border-2 border-[#991e1e]  shadow-md"
        : " shadow-xl hover:bg-gray-100  hover:drop-shadow-[0_4px_6px_rgba(153,30,30,0.4)] "}`}>
          <div className="flex justify-center items-center mb-2">
          {/* <img className=" w-full h-[10rem]  aspect-3/2 object-cover rounded-md" src={item.url} alt="" /> */}
          </div>
         
          <p className="">{item.name}</p>
          
            
        </div> ))}

        {/* {selectedMenu.map(item => ( <div key={item.id}>
           {item.name} -{item.price}

        </div>
        ))} */}
        
      </div>
    </div>
  </div>
  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
</div>




</div>




<div className="flex justify-center items-center mt-6">
<button className="bg-gradient-to-r from-[#5e0d14] to-[#991e1e] py-2 w-[40%] md:w-[20%] text-white ">Submit</button>
        </div>

   

        
    </>
        
    );
}

export default Booking;
