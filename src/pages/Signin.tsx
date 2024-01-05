import envoy from "../assets/logos/envoy.png";
import applelogo from "../assets/logos/apple-logo.png";
import googlelogo from "../assets/logos/google-logo.png";
import phone from "../assets/images/phone.png";
import { BtnUI } from "../components/ui/Btn";
import "../config/firebase.js";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle }: any = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate("/chat");
  });

  return (
    <div className="h-full w-[100vw] relative   bg-[#fffff8]">
      <div className="absolute  top-0 left-0">
        <div className=" flex flex-col space-y-1">
          <div className=" flex ">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="#fad9b6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0H100C44.7715 0 0 44.7715 0 100V0ZM100 200H0V100C0 155.228 44.7715 200 100 200ZM200 100V200H100C155.228 200 200 155.228 200 100ZM200 100V0H100C155.228 0 200 44.7715 200 100ZM100 111C106.075 111 111 106.075 111 100C111 93.9249 106.075 89 100 89C93.9249 89 89 93.9249 89 100C89 106.075 93.9249 111 100 111Z"
              />
            </svg>
            <svg
              width="200"
              height="200"
              fill="#ffff00"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              preserveAspectRatio="xMaxYMax slice"
            >
              <g transform="scale(0.35842293906810035)">
                <rect x="0" y="0" width="558" height="558" fill="#000000" />
                <rect x="0" y="0" width="558" height="558" fill="#fffff5" />
                <path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0" fill="#ffffc5" />
              </g>
            </svg>
          </div>
          <div className=" flex ">
            <svg
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
              fill="#bae1ff"
              viewBox="0 0 200 200"
              preserveAspectRatio="xMaxYMax slice"
              style={{ transform: "rotate(-180deg)" }}
            >
              <g transform="scale(0.35842293906810035)">
                <rect x="0" y="0" width="558" height="558" fill="#ffffff" />
                <rect x="0" y="0" width="558" height="558" fill="#fffff5" />
                <path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0" fill="#bae1ff" />
              </g>
            </svg>
            <svg
              width="225"
              height="225"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              preserveAspectRatio="xMaxYMax slice"
            >
              <g transform="scale(1.7921146953405018)">
                <circle cx="50" cy="50" r="50" fill="#baffc9" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute  bottom-0 -right-0">
        <div className=" flex flex-col -space-y-6">
          <div className=" flex -space-x-6 gap-1">
            <svg
              width="225"
              height="225"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              preserveAspectRatio="xMaxYMax slice"
            >
              <g transform="scale(1.7921146953405018)">
                <circle cx="50" cy="50" r="50" fill="#ffffc5" />
              </g>
            </svg>
            <svg
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fad9b6"
              viewBox="0 0 200 200"
              preserveAspectRatio="xMaxYMax slice"
              style={{ transform: "rotate(-90deg)" }}
            >
              <g transform="scale(0.35842293906810035)">
                <rect x="0" y="0" width="558" height="558" fill="#ffffff" />
                <rect x="0" y="0" width="558" height="558" fill="#fffff5" />
                <path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0" fill="#fad9b6" />
              </g>
            </svg>
          </div>
          <div className=" flex ">
            <svg
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              preserveAspectRatio="xMaxYMax slice"
              style={{ transform: "rotate(180deg)" }}
            >
              <g transform="scale(0.35842293906810035)">
                <rect x="0" y="0" width="558" height="558" fill="#000000" />
                <rect x="0" y="0" width="558" height="558" fill="#fffff5" />
                <path d="M 0 558 A 558 558 0 0 0 558 0 L 0 0" fill="#bae1ff" />
              </g>
            </svg>
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="#90EE90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0H100C44.7715 0 0 44.7715 0 100V0ZM100 200H0V100C0 155.228 44.7715 200 100 200ZM200 100V200H100C155.228 200 200 155.228 200 100ZM200 100V0H100C155.228 0 200 44.7715 200 100ZM100 111C106.075 111 111 106.075 111 100C111 93.9249 106.075 89 100 89C93.9249 89 89 93.9249 89 100C89 106.075 93.9249 111 100 111Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-[80%] md:w-[65%] lg:w-[50%] space-y-16 bg-[#fffff8] shadow-[0_20px_25px_-10px_rgba(0,0,0,0.15),_15px_0px_30px_-10px_rgba(0,0,0,0.15)] rounded-lg py-12  absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="w-full space-y-6 ">
          <h1 className="sm:text-[1.5rem] text-[1.2rem] md:text-[1.8rem] lg:text-[2rem] w-full leading-tight text-center font-semibold px-8 text-[#111111da]">
            Welcome to a cozy space to chat with friends and family!
          </h1>
          <div className="w-full space-y-5 ">
            <div className="text-center text-[1.1rem] lg:text-[1.4rem] italic w-full font-medium text-[#0f0f0fce]">
              Come aboard by signing in.
            </div>
            <div className="space-y-5 w-[8.5rem] md:w-[10.5rem] justify-center mx-auto flex flex-col">
              {/* <BtnUI
                        title = {"facebook" }
                        onClick={() => {}}
                        type={ "secondary" }
                        color={'text-[#A7C7E7]'}
                        icon = { <img src={applelogo} /> }
                     /> */}
              <BtnUI
                title={"google"}
                onClick={() => {
                  signInWithGoogle();
                }}
                type={"secondary"}
                color={"text-[#bae1ff]"}
                icon={<img src={googlelogo} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
