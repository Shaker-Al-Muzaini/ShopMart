



export default function Blog() {
 return (
     <div className="bg-gray-50 py-12">
         <div className="container mx-auto px-4">
             <div className="flex justify-between items-center mb-8">
                 <h2 className="text-black text-2xl font-bold">Latest Blog Posts</h2>
                 <a href="#" className="text-indigo-600 hover:text-indigo-800">View All</a>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                     <img
                         src="/images/blog-1.jpg"
                         alt="Blog"
                         className="w-full h-48 object-cover"
                     />
                     <div className="p-6">
                         <div className="flex items-center text-gray-500 text-sm mb-3">
                             <i className="far fa-calendar-alt mr-2"></i>
                             <span>April 12, 2025</span>
                             <span className="mx-2">|</span>
                             <i className="far fa-user mr-2"></i>
                             <span>Admin</span>
                         </div>
                         <h3 className="font-semibold text-lg mb-2">
                             10 Must-Have Tech Gadgets for 2025
                         </h3>
                         <p className="text-gray-600 mb-4">
                             Discover the latest tech innovations that are changing the game
                             in 2025 and beyond.
                         </p>
                         <a
                             href="#"
                             className="text-indigo-600 hover:text-indigo-800 font-medium"
                         >Read More →</a
                         >
                     </div>
                 </div>

                 <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                     <img
                         src="/images/blog-2.jpg"
                         alt="Blog"
                         className="w-full h-48 object-cover"
                     />
                     <div className="p-6">
                         <div className="flex items-center text-gray-500 text-sm mb-3">
                             <i className="far fa-calendar-alt mr-2"></i>
                             <span>April 10, 2025</span>
                             <span className="mx-2">|</span>
                             <i className="far fa-user mr-2"></i>
                             <span>Admin</span>
                         </div>
                         <h3 className="font-semibold text-lg mb-2">
                             How to Choose the Perfect Headphones
                         </h3>
                         <p className="text-gray-600 mb-4">
                             A comprehensive guide to finding headphones that match your
                             lifestyle and preferences.
                         </p>
                         <a
                             href="#"
                             className="text-indigo-600 hover:text-indigo-800 font-medium"
                         >Read More →</a
                         >
                     </div>
                 </div>

                 <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                     <img
                         src="/images/blog-3.jpg"
                         alt="Blog"
                         className="w-full h-48 object-cover"
                     />
                     <div className="p-6">
                         <div className="flex items-center text-gray-500 text-sm mb-3">
                             <i className="far fa-calendar-alt mr-2"></i>
                             <span>April 8, 2025</span>
                             <span className="mx-2">|</span>
                             <i className="far fa-user mr-2"></i>
                             <span>Admin</span>
                         </div>
                         <h3 className="font-semibold text-lg mb-2">
                             The Rise of Smart Home Devices
                         </h3>
                         <p className="text-gray-600 mb-4">
                             Explore how smart home technology is transforming the way we
                             live and interact with our spaces.
                         </p>
                         <a
                             href="#"
                             className="text-indigo-600 hover:text-indigo-800 font-medium"
                         >Read More →</a
                         >
                     </div>
                 </div>
             </div>
         </div>
     </div>

 );
}
