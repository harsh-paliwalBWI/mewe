import React from "react";
import Image from "next/image";
import invitebannerbg from "../../../images/invite banner-image.svg";

const InviteBanner = () => {
  return (
    <div>
      <div className="h-auto w-full">
        <Image
          src={invitebannerbg}
          alt="image"
          width={1000}
          height={100}
          layout="responsive"
          className="object-fill w-full h-full"
        />
      </div>
    </div>
  );
};

export default InviteBanner;
