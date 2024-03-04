import Image from "next/image";
import Link from "next/link";
import verify from "../../../images/verify 2.svg";
import avatarimg from "../../../images/avatar.png";

function SearchTile(props: any) {
  const startup = props?.startup;
  console.log(startup, "rrrrrrrrrr");

  if (typeof startup.basic == "string") {
    startup.basic = JSON.parse(startup.basic);
  }

  if (typeof startup.slug == "string") {
    startup.slug = JSON.parse(startup.slug);
  }

  return (
    <>
      <Link
        href={startup?.slug?.name !== undefined ? `/startup/${startup?.slug?.name}` : "#"}
        onClick={() => {
          props.setSearchQuery("");
        }}
      >
        <div className="flex flex-row sm:flex-row w-full items-center gap-3 md:gap-2 lg:gap-3  bg-[#f6f9fd] rounded-[5px] p-[4%] ">
          <div className="relative    w-[30%] sm:w-[20%] md:w-[25%] lg:w-[30%] aspect-square">
            <Image
              src={startup?.basic?.coverPic?.url || avatarimg}
              alt=""
              height={1000}
              width={1000}
              className=" rounded-full w-[100%] h-[100%] object-fill"
            />
            {startup?.isVerified && (
              <div className="absolute w-3 h-3 sm:w-4 sm:h-4  md:w-6  md:h-6 lg:w-8 lg:h-8 top-0 right-0 transform -translate-y-0 md:-translate-y-1/3 ">
                <Image
                  src={verify}
                  alt=""
                  className="w-full h-full object-contain "
                />
              </div>
            )}
          </div>

          <div className="flex lg:flex-row md:flex-col sm:flex-row w-[65%] sm:w-[75%] md:w-[65%]  justify-between items-center gap-2 ">
            <div className="flex flex-col  gap-2 sm:gap-3  w-full ">
              <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-0 lg:gap-2  justify-center">
                <h2 className=" md:text-lg sm:text-base text-sm font-medium text-black ">
                  {startup?.name || "No Name Startup"}
                </h2>

                <p className="opacity-40 text-black  text-xs sm:text-sm md:text-[15px] font-normal">
                  {startup?.basic?.category?.name || "category not filled"}
                </p>
              </div>
              {/* <p className="opacity-40 text-black text-[10px] sm:text-xs md:text-sm font-normal ">
              {startup?.followers?.length || "No"} followers
            </p> */}
            </div>
            {/* <div className="w-[35%] md:w-[90%] lg:w-[40%] ">
            {isFollowed && isFollowed?.status === "pending" ? (
              <div
                onClick={onUnfollowButtonClick}
                className=" w-full flex   justify-center  items-center gap-0.5 sm:gap-0.5 md:gap-1 rounded-full px-2 sm:px-4 md:px-8 lg:px-12 py-0.5 sm:py-1 md:py-0.5 lg:py-2 border border-black cursor-pointer "
              >

                <div className=" text-black text-[10px] sm:text-xs md:text-sm lg:text-base font-medium ">
                  <button>Requested</button>
                </div>
              </div>
            ) : isFollowed?.status === "accepted" ? (
              <div
                onClick={onUnfollowButtonClick}
                className=" w-full flex   justify-center  items-center gap-0.5 sm:gap-0.5 md:gap-1 rounded-full px-2 sm:px-4 md:px-8 lg:px-12 py-0.5 sm:py-1 md:py-0.5 lg:py-2 border border-black cursor-pointer "
              >

                <div className=" text-black text-xs sm:text-sm md:text-base font-medium ">
                  <button>Following</button>
                </div>
              </div>
            ) : (
              <div
                onClick={onFollowButtonClick}
                className=" w-full flex  justify-center  items-center gap-0.5 sm:gap-1 md:gap-2 rounded-full px-4 sm:px-4 md:px-8 lg:px-12 py-0.5 sm:py-1 md:py-0.5 lg:py-2 border border-primary cursor-pointer "
              >
                <div className=" ">
                  <FlatIcon className="flaticon-add-user text-sm sm:text-lg md:text-2xl text-primary" />
                </div>
                <div className=" text-primary text-xs sm:text-sm md:text-base font-medium ">
                  <button>Follow</button>
                </div>
              </div>
            )}
          </div> */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default SearchTile;
