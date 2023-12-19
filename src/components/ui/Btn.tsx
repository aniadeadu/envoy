import { FC, ReactNode } from "react";

export const BtnUI: FC<{
   type:string, 
   icon:ReactNode, 
   title:string, 
   onClick:any, 
   color:string,  
}> = ({
   type, 
   icon, 
   title, 
   onClick, 
   color
}) => {

   const btnstyle =  type == "primary" ? 
                        "px-4 bg-black w-full py-2  text-white hover:bg-transparent hover:text-black border border-black":
                        " px-4 border-2 border-[#dadce0] bg-[#fdfdfa]  shadow-[0_1px_0_0_#dadce0]  rounded-xl transition-all hover:scale-110 py-2 ";
   const titlestyle =  type == "primary" ? "font-Kumbh font-medium text-lg md:text-xl  ":"font-Kumbh font-medium  text-lg md:text-xl ";

   return (
      <button onClick={onClick} className={btnstyle}>
         <div className="flex items-center gap-3 justify-center sha">
            { 
               icon ? <div className='w-[1.2rem] h-auto'>
                        {icon}
                     </div> 
                     : 
                     null
            }
            <div className={titlestyle + color }
            style={{ fontVariant: "small-caps"}}>
               {title}
            </div>
         </div>
      </button>
   )
}

