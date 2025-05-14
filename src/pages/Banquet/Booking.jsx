import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
// index.js or App.js
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // or any other PrimeReact theme
import 'primereact/resources/primereact.min.css';  
import { useNavigate } from "react-router-dom";    
         // core styles


const Booking = () => {
  // const [dates, setDates] = useState(null);
  // const navigate = useNavigate();
  // const [showForm, setShowForm] = useState(false);

  //  const isRangeSelected = dates && dates.length === 2 && dates[0] && dates[1];

  //  const handleBooking = () => {
   
  //  };

   const [selected, setSelected] = useState('Rate Plan');
      
     const handleSelect = (item) => {
        setSelected(item);
       
        document.getElementById('rate-dropdown').removeAttribute('open');
      };
    
    
        const [vegNonvegPlan, setVegNonveg] = useState('veg/Non veg');
      
     const handleFood = (item) => {
        setVegNonveg(item);
       
        document.getElementById('food-dropdown').removeAttribute('open');
      };
      const [advance, setAdvance] = useState('');
      const [total, setTotal] = useState('');
      const balance = ((total) || 0) - ((advance) || 0);

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
          
            <input type="text" placeholder="Guest Name" className="border border-gray-300 rounded-md text-center  py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
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

          

        </div>


        <div className="flex justify-center items-center mt-6">
<button className="bg-gradient-to-r from-sky-600 to-cyan-400 py-2 w-[20%] text-white ">Submit</button>
        </div>

   

        
    </>
        
    );
}

export default Booking;
