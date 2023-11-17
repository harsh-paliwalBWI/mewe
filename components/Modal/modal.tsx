"use client";
import React, { useEffect,FC } from "react";
import OutsideClickHandler from "../../utils/OutsideClickHandler";


interface Props{
    isOpen:any,
    children:any,
    setOpen:any
}
const Modal:FC<Props> = ({ isOpen, children, setOpen }) => {
  if (!isOpen) {
    return <></>;
  }

 

  return (
    <div className="fixed z-50  flex justify-center items-center top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.5)] overscroll-none">
      <OutsideClickHandler
        onClick={() => {
          setOpen(false);
          document.body.classList.remove('no-scroll')
        }}
      >
        {children}
      </OutsideClickHandler>
    </div>
  );
};

export default Modal;
