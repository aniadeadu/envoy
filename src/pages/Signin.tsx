import envoy from "../assets/logos/envoy.png";
import applelogo from "../assets/logos/apple-logo.png";
import googlelogo from "../assets/logos/google-logo.png";
import phone from "../assets/images/phone.png";
import { BtnUI } from "../components/ui/Btn";
import "../config/firebase.js";
import { useContext } from "react";
import { AuthContext } from "../contexts/UserProvider";
export const Signin = () => {
   const { 
      user, 
      setUser, 
      signInWithGoogle
   }:any = useContext(AuthContext);

   return (
      <div className="h-full w-[100vw] relative   bg-[#fffff8]">

<div className="absolute  top-0 left-0">
        <div className=" flex flex-col space-y-1">
         <div className=" flex ">
         {/* <svg width="170" height="170" viewBox="0 0 200 200" fill="#" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_221_21)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H100C44.7715 0 0 44.7715 0 100V0ZM100 200H0V100C0 155.228 44.7715 200 100 200ZM200 100V200H100C155.228 200 200 155.228 200 100ZM200 100V0H100C155.228 0 200 44.7715 200 100ZM100 111C106.075 111 111 106.075 111 100C111 93.9249 106.075 89 100 89C93.9249 89 89 93.9249 89 100C89 106.075 93.9249 111 100 111Z"/> </g> <defs> <clipPath id="clip0_221_21"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg> */}
         {/* <svg width="170" height="170" viewBox="0 0 200 200" fill="#ffffba"  xmlns="http://www.w3.org/2000/svg" }>
             <path fill-rule="#FFFAA0" clip-rule="evenodd" d="M200 2.62268e-06V60L200 200H140V130.033C139.982 168.678 108.649 200 70 200C31.3401 200 0 168.66 0 130C0 91.3401 31.3401 60 70 60C108.649 60 139.982 91.3222 140 129.967V60H70H0V2.62268e-06L140 0L200 2.62268e-06Z"/>  <defs>  <rect width="200" height="200" fill="FFFAA0"/>  </defs> </svg> */}
<svg width="200" height="200" viewBox="0 0 200 200" fill="#fad9b6" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_221_21)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H100C44.7715 0 0 44.7715 0 100V0ZM100 200H0V100C0 155.228 44.7715 200 100 200ZM200 100V200H100C155.228 200 200 155.228 200 100ZM200 100V0H100C155.228 0 200 44.7715 200 100ZM100 111C106.075 111 111 106.075 111 100C111 93.9249 106.075 89 100 89C93.9249 89 89 93.9249 89 100C89 106.075 93.9249 111 100 111Z"/> </g> <defs> <clipPath id="clip0_221_21"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>
<svg width="200" height="200" fill="#ffff00"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="xMaxYMax slice"><g transform="scale(0.35842293906810035)"><rect x="0" y="0" width="558" height="558" fill="#000000"/><rect x="0" y="0" width="558" height="558" fill="#fffff5"/><path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0" fill="#ffffc5"/></g></svg>
             
             </div>
             <div className=" flex ">
             <svg width="200" height="200"  xmlns="http://www.w3.org/2000/svg" fill="#bae1ff" viewBox="0 0 200 200" preserveAspectRatio="xMaxYMax slice" style={{transform: "rotate(-180deg)"}}><g transform="scale(0.35842293906810035)"><rect x="0" y="0" width="558" height="558" fill="#ffffff"/><rect x="0" y="0" width="558" height="558" fill="#fffff5"/><path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0" fill="#bae1ff"/></g></svg>
<svg width="225" height="225"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"  preserveAspectRatio="xMaxYMax slice"><g transform="scale(1.7921146953405018)"><circle cx="50" cy="50" r="50" fill="#baffc9"/></g></svg>
             
             </div>
             </div> 
             </div>
             <div className="absolute  bottom-0 -right-0">
             <div className=" flex flex-col -space-y-6">
        <div className=" flex -space-x-6 gap-1">
        
<svg width="225" height="225"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"  preserveAspectRatio="xMaxYMax slice"><g transform="scale(1.7921146953405018)"><circle cx="50" cy="50" r="50" fill="#ffffc5"/></g></svg>
<svg width="200" height="200"  xmlns="http://www.w3.org/2000/svg" fill="#fad9b6" viewBox="0 0 200 200" preserveAspectRatio="xMaxYMax slice" style={{transform: "rotate(-90deg)"}}><g transform="scale(0.35842293906810035)"><rect x="0" y="0" width="558" height="558" fill="#ffffff"/><rect x="0" y="0" width="558" height="558" fill="#fffff5"/><path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0" fill="#fad9b6"/></g></svg>
             
             </div>
         <div className=" flex ">
         {/* <svg width="170" height="170" viewBox="0 0 200 200" fill="#" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_221_21)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H100C44.7715 0 0 44.7715 0 100V0ZM100 200H0V100C0 155.228 44.7715 200 100 200ZM200 100V200H100C155.228 200 200 155.228 200 100ZM200 100V0H100C155.228 0 200 44.7715 200 100ZM100 111C106.075 111 111 106.075 111 100C111 93.9249 106.075 89 100 89C93.9249 89 89 93.9249 89 100C89 106.075 93.9249 111 100 111Z"/> </g> <defs> <clipPath id="clip0_221_21"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg> */}
         {/* <svg width="170" height="170" viewBox="0 0 200 200" fill="#ffffba"  xmlns="http://www.w3.org/2000/svg" }>
   
   <path fill-rule="#FFFAA0" clip-rule="evenodd" d="M200 2.62268e-06V60L200 200H140V130.033C139.982 168.678 108.649 200 70 200C31.3401 200 0 168.66 0 130C0 91.3401 31.3401 60 70 60C108.649 60 139.982 91.3222 140 129.967V60H70H0V2.62268e-06L140 0L200 2.62268e-06Z"/>  <defs>  <rect width="200" height="200" fill="FFFAA0"/>  </defs> </svg> */}
<svg width="200" height="200"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 200 200" preserveAspectRatio="xMaxYMax slice" style={{transform: "rotate(180deg)"}}><g transform="scale(0.35842293906810035)"><rect x="0" y="0" width="558" height="558" fill="#000000"/><rect x="0" y="0" width="558" height="558" fill="#fffff5"/><path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0"  fill="#bae1ff"/></g></svg>

<svg width="200" height="200" viewBox="0 0 200 200" fill="#90EE90" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_221_21)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H100C44.7715 0 0 44.7715 0 100V0ZM100 200H0V100C0 155.228 44.7715 200 100 200ZM200 100V200H100C155.228 200 200 155.228 200 100ZM200 100V0H100C155.228 0 200 44.7715 200 100ZM100 111C106.075 111 111 106.075 111 100C111 93.9249 106.075 89 100 89C93.9249 89 89 93.9249 89 100C89 106.075 93.9249 111 100 111Z"/> </g> <defs> <clipPath id="clip0_221_21"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>
             
             </div>
             </div>
             
             </div>
         {/* <header className="w-full py-3 px-7 bg-[#fffff8] border-b">
            <div >
               <img 
                  src={envoy} 
                  alt="envoy logo" 
                  className="w-20"
               />
            </div>
         </header> */}

         <div className="w-full ">
            <div className="space-y-16 bg-[#fffff8] shadow-[0_20px_25px_-10px_rgba(0,0,0,0.15),_15px_0px_30px_-10px_rgba(0,0,0,0.15)] rounded-lg py-10  absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
               <div className="w-full ">
                  <h1 
                     className="text-[2rem] w-full leading-tight text-center font-semibold px-8 text-[#111111da]"
                  >
                        Welcome to a cozy space to private message friends and family! 
                  </h1>
                  {/* <h4 className="text-[1rem] text-center w-full  text-[#3c3c3cf4] px-10">
                     Enjoy seamlessly private messaging and calling loved ones from within and across globe. Feel close to important ones and never miss out on a moment.
                  </h4> */}
               </div>
               <div className="w-full space-y-5 ">
                  <div className="text-center text-[1.4rem] w-full font-semibold text-[#111111]">Come aboard</div>
               
               <div className='space-y-5 w-[14rem] justify-center mx-auto flex flex-col'>
                  {/* <BtnUI
                     title = {"facebook" }
                     onClick={() => {}}
                     type={ "secondary" }
                     color={'text-[#A7C7E7]'}
                     icon = { <img src={applelogo} /> }
                  /> */}
                  <BtnUI
                     title={ "google" }
                     onClick={() => {signInWithGoogle()}}
                     type={ "secondary" }
                     color={'text-[#FDFD96]'}
                     icon={ <img src={googlelogo}/> }
                  />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}