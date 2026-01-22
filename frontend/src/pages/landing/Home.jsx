// import { Link } from "react-router-dom";
// import PublicLayout from "../../layouts/PublicLayout";


// const Home = () => {
//   return (
//     <PublicLayout>
//       {/* ================= HERO SECTION ================= */}
//       <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-fixhub-bgDark via-fixhub-bgMain to-fixhub-bgWhite">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

//           {/* Left Content */}
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
//               Fast & Reliable Electronics Repair <br />
//               <span className="text-fixhub-mint">At Your Doorstep</span>
//             </h1>

//             <p className="mt-5 text-lg text-fixhub-light">
//               AC, Fridge, Laptop, Mobile & Home Appliances —
//               Book trusted technicians with ease.
//             </p>

//             <div className="mt-8 flex gap-4">
//               <Link
//                 to="/login"
//                 className="px-6 py-3 bg-fixhub-primary text-white rounded-lg font-medium hover:bg-fixhub-dark transition"
//               >
//                 Book a Repair
//               </Link>

//               <Link
//                 to="/signup"
//                 className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-fixhub-textDark transition"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>

//           {/* Right Illustration Placeholder */}
//           <div className="hidden md:block">
//             <div className="w-full h-80 bg-fixhub-bgCard rounded-xl shadow-lg flex items-center justify-center">
//               <span className="text-fixhub-textMuted">
//                 Illustration / Image
//               </span>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ================= SERVICES SECTION ================= */}
//       <section className="py-20 bg-fixhub-bgWhite">
//         <div className="max-w-7xl mx-auto px-6">

//           <h2 className="text-3xl font-semibold text-center text-fixhub-textDark">
//             Our Repair Services
//           </h2>

//           <p className="text-center text-fixhub-textMuted mt-3">
//             We repair all major electronic and home appliances
//           </p>

//           <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               "AC Repair",
//               "Refrigerator",
//               "Laptop",
//               "Mobile",
//               "Fan",
//               "Cooler",
//               "Washing Machine",
//               "Toaster",
//             ].map((service) => (
//               <div
//                 key={service}
//                 className="bg-fixhub-bgCard rounded-xl p-6 text-center shadow hover:shadow-md transition"
//               >
//                 <div className="text-4xl mb-3">🔧</div>
//                 <h3 className="font-medium text-fixhub-textDark">
//                   {service}
//                 </h3>
//                 <p className="text-sm text-fixhub-textMuted mt-2">
//                   Quick diagnosis & expert repair
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* ================= HOW IT WORKS ================= */}
//       <section className="py-20 bg-fixhub-bgCard">
//         <div className="max-w-7xl mx-auto px-6">

//           <h2 className="text-3xl font-semibold text-center text-fixhub-textDark">
//             How FixHub Works
//           </h2>

//           <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
//             {[
//               "Choose Service",
//               "Book Technician",
//               "Get Repair Done",
//               "Pay After Service",
//             ].map((step, index) => (
//               <div key={step}>
//                 <div className="w-12 h-12 mx-auto rounded-full bg-fixhub-primary text-white flex items-center justify-center font-bold">
//                   {index + 1}
//                 </div>
//                 <h4 className="mt-4 font-medium text-fixhub-textDark">
//                   {step}
//                 </h4>
//                 <p className="text-sm text-fixhub-textMuted mt-2">
//                   Simple and hassle-free process
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* ================= CTA SECTION ================= */}
//       <section className="py-20 bg-fixhub-bgDark text-center">
//         <h2 className="text-3xl font-semibold text-white">
//           Ready to Fix Your Device?
//         </h2>

//         <p className="mt-4 text-fixhub-light">
//           Book a repair in just a few clicks
//         </p>

//         <div className="mt-8">
//           <Link
//             to="/login"
//             className="px-8 py-3 bg-fixhub-primary text-white rounded-lg font-medium hover:bg-fixhub-dark transition"
//           >
//             Book Repair Now
//           </Link>
//         </div>
//       </section>
//     </PublicLayout>
//   );
// };

// export default Home;
