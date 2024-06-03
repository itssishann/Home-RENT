import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-full h-screen w-screen place-items-center bg-zinc-900 px-6 py-24 sm:py-32 text-zinc-100 lg:px-8">
      <div className="text-center">
        <p className="text-base text-[5rem] mb-8 font-semibold text-red-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-zinc-300">Sorry, we couldn’t find the page you’re looking for.</p>
        <div onClick={() => navigate(-1)} className="mt-10 flex items-center justify-center gap-x-6">
          <button className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Go back home
          </button>
          <a Link="" onClick={()=>{
            Swal.fire({
              title:"Admin Details",
              text:"Contact Via Whatsapp"
            })
          }} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
