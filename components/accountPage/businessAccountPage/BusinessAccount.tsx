"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import FlatIcon from "@/components/flatIcon/flatIcon";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  fetchBusinessAccountDetails,
  getStartUpData,
  isBusinessAccountExistOrNot,
} from "@/services/startupService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/loader/Loader";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { getCookie } from "cookies-next";
import Modal from "@/components/Modal/modal";
import { CircularProgress } from "@mui/material";
import { fetchAllCategories } from "@/services/categoriesService";

const dummyCompanySize = [
  { id: 2, name: "less than 10", unavailable: false },
  { id: 3, name: "10-50", unavailable: false },
  { id: 4, name: "50-100", unavailable: true },
  { id: 5, name: "100-500", unavailable: false },
  { id: 5, name: "more than 500", unavailable: false },
];

// const dummyCities = [
//   { id: 2, name: "city1", unavailable: false },
//   { id: 3, name: "city2", unavailable: false },
//   { id: 4, name: "city3", unavailable: true },
//   { id: 5, name: "city4", unavailable: false },
// ];

const dummyIndustry = [
  { id: 2, name: "Industry1", unavailable: false },
  { id: 3, name: "Industry2", unavailable: false },
  { id: 4, name: "Industry3", unavailable: true },
  { id: 5, name: "Industry4", unavailable: false },
];

// const dummyYearOfFormation = [
//   { id: 2, name: '1999', unavailable: false },
//   { id: 3, name: '1998', unavailable: false },
//   { id: 4, name: '1997', unavailable: true },
//   { id: 5, name: '1996', unavailable: false },

// ]

const resultArray: any = [];

const currentYear = new Date().getFullYear();

for (let year = currentYear; year >= 1900; year--) {
  const yearObject = {
    id: currentYear - year + 2,
    name: year.toString(),
  };

  resultArray.push(yearObject);
}

const rangeArray: any = [];

for (let startYear = currentYear - 1; startYear >= 1900; startYear--) {
  const endYear = startYear + 1;

  const yearRangeObject = {
    id: currentYear - startYear + 2,
    name: `${startYear}-${endYear}`,
  };

  rangeArray.push(yearRangeObject);
}

interface Product {
  name: string;
  profitPercentage: string;
}

const investmentTypes = [
  {
    id: 1,
    name: "Equity Investment",
    tooltip:
      "Buying stocks in a company for ownership and potential profit share.",
  },
  {
    id: 2,
    name: "Debt Investment",
    tooltip:
      "Providing loans or bonds to businesses for fixed income and priority repayment.",
  },
  {
    id: 3,
    name: "Convertible Securities",
    tooltip:
      "Blend of debt and equity where investors can convert to stocks for potential profit.",
  },
  {
    id: 4,
    name: "Venture Capital",
    tooltip:
      "Investing in high-growth startups for equity, often offering expertise.",
  },
  {
    id: 5,
    name: "Angel Investment",
    tooltip:
      "Individuals investing in startups for equity, often providing guidance.",
  },
  {
    id: 6,
    name: "Private Equity",
    tooltip:
      "Buying stakes in established companies, improving them, and selling for profit.",
  },
  {
    id: 7,
    name: "Strategic Investments",
    tooltip:
      "Partnering with other companies for mutual benefit, sometimes acquiring stakes.",
  },
  {
    id: 8,
    name: "Crowdfunding",
    tooltip:
      "Raising capital from many individuals, offering rewards or equity.",
  },
  {
    id: 9,
    name: "Strategic Partnerships and Joint Ventures",
    tooltip:
      "Collaborating with other businesses for shared goals, contributing resources.",
  },
  {
    id: 10,
    name: "Preferred Stock",
    tooltip:
      "Ownership shares with preferential treatment in dividends and liquidation.",
  },
  {
    id: 11,
    name: "Royalty Financing",
    tooltip:
      "Providing capital in exchange for a share of future product profits.",
  },
  {
    id: 12,
    name: "Revenue-Based Financing",
    tooltip:
      "Investing in a business in exchange for a percentage of future revenues without fixed repayments.",
  },
];

const borderStyle = "border border-[#C8C8C8] rounded-md relative";
const labelStyle =
  " lg:text-sm md:text-xs text-sm  text-[#868E97] font-medium  px-1  bg-white absolute top-[-10px] left-[10px]";
const inputStyle =
  "rounded-lg px-3 py-3 w-full outline-0 lg:text-sm md:text-xs text-sm";

const BusinessAccount = () => {
  const cookies = { value: getCookie("uid") };
  const [isClient, setIsClient] = useState(false);
  const [addbutton, setAddbutton] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [industry, setIndustry] = useState(dummyIndustry[0]);
  const pathName = usePathname();
  const router = useRouter();

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  const { data: businessAccountData } = useQuery({
    queryKey: ["businessAccountData"],
    queryFn: () => fetchBusinessAccountDetails(cookies),
  });

  const { data: existOrNot } = useQuery({
    queryKey: ["businessAccountExistOrNot"],
    queryFn: () => isBusinessAccountExistOrNot(cookies),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: () => fetchAllCategories(),
  });

  const [companySize, setCompanySize] = useState(
    businessAccountData
      ? { name: businessAccountData.companySize }
      : { name: "" }
  );
  // const [city, setCity] = useState(businessAccountData ? { name: businessAccountData.city } : { name: "" })
  const [yearOfFormation, setYearOfFormation] = useState(
    businessAccountData
      ? { name: businessAccountData.yearOfFormation }
      : { name: "" }
  );

  const [yearOfFinance1, setYearOfFinance1] = useState(
    businessAccountData
      ? { name: businessAccountData.yearOfFinance1 }
      : { name: "" }
  );

  const [yearOfFinance2, setYearOfFinance2] = useState(
    businessAccountData
      ? { name: businessAccountData.yearOfFinance2 }
      : { name: "" }
  );

  const [products, setProducts] = useState<Product[]>([
    { name: "", profitPercentage: "" },
  ]);

  const [typeOfInvestement, setTypeOfInvestment] = useState(
    businessAccountData
      ? { name: businessAccountData.typeOfInvestement }
      : { name: "" }
  );
  const [category, setCategory] = useState(
    businessAccountData
      ? {
          id: businessAccountData.category.id,
          name: businessAccountData.category.name,
        }
      : { id: "", name: "" }
  );
  const [equityPercentage, setEquityPercetnage] = useState(
    businessAccountData ? businessAccountData?.equityPercentage : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    startUpData?.phoneNo ? startUpData?.phoneNo : ""
  );
  const [email, setEmail] = useState(startUpData?.email);
  const [name, setName] = useState(startUpData?.name);

  const [state, setState] = useState({
    // name: startUpData?.name,
    founderName: businessAccountData ? businessAccountData?.founderName : "",
    city: businessAccountData ? businessAccountData.city : "",
    coFounderName: businessAccountData
      ? businessAccountData?.coFounderName
      : "",
    linkedInUrl: businessAccountData
      ? businessAccountData?.social?.linkedin
      : "",
    description: businessAccountData ? businessAccountData?.description : "",
    address: businessAccountData ? businessAccountData?.address?.line1 : "",
    currentFinancialIncome: businessAccountData
      ? businessAccountData?.currentFinancialIncome
      : "",

    financialyear1: businessAccountData
      ? businessAccountData?.financialyear1
      : "",

    financialyear2: businessAccountData
      ? businessAccountData?.financialyear2
      : "",

    typeOfInvestement: businessAccountData
      ? businessAccountData?.typeOfInvestement
      : "",

    qua1: businessAccountData?.year1?.qua1,
    qua2: businessAccountData?.year1?.qua2,
    qua3: businessAccountData?.year1?.qua3,
    qua4: businessAccountData?.year1?.qua4,
    qua5: businessAccountData?.year2?.qua1,
    qua6: businessAccountData?.year2?.qua2,
    qua7: businessAccountData?.year2?.qua3,
    qua8: businessAccountData?.year2?.qua4,

    currentValuation: businessAccountData
      ? businessAccountData?.currentValuation
      : "",
    amount: businessAccountData ? businessAccountData?.amount : "",

    panNo: businessAccountData ? businessAccountData?.panNo : "",
  });

  function restrictInput(event: any) {
    const input = event.target;
    // console.log(input, "vbn")
    const value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    input.value = value;
    setState({ ...state, panNo: value });
  }

  const addProduct = () => {
    setProducts([...products, { name: "", profitPercentage: "" }]);
  };

  const handleProductNameChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index].name = value;
    setProducts(updatedProducts);
  };

  const handleProfitPercentageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index].profitPercentage = value;
    setProducts(updatedProducts);
  };

  const addAdvanceDetails = async (
    advanceDetails: any,
    email: any,
    phoneNo: any
  ) => {
    // console.log(advanceDetails);
    const refDoc = doc(db, `startups/${startUpData?.id}/details/advance`);
    const refDoc2 = doc(db, `startups/${startUpData?.id}`);
    const details = {
      name: advanceDetails.name,
      email: email,
      phoneNo: phoneNo,
      basic: {
        name: advanceDetails.name,
        category: {
          id: advanceDetails.category.id,
          name: advanceDetails.category.name,
        },
      },
    };
    await setDoc(refDoc2, details, { merge: true });
    await setDoc(refDoc, advanceDetails, { merge: true });
  };
  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const accountInfo = {
        name: name,

        founderName: state.founderName ? state.founderName : "",
        coFounderName: state.coFounderName ? state.coFounderName : "",
        social: {
          linkedin: state.linkedInUrl ? state.linkedInUrl : "",
        },
        year1: {
          qua1: state?.qua1 ? state?.qua1 : "",
          qua2: state?.qua2 ? state?.qua2 : "",
          qua3: state?.qua3 ? state?.qua3 : "",
          qua4: state?.qua4 ? state?.qua4 : "",
        },
        year2: {
          qua1: state?.qua5 ? state?.qua5 : "",
          qua2: state?.qua6 ? state?.qua6 : "",
          qua3: state?.qua7 ? state?.qua7 : "",
          qua4: state?.qua8 ? state?.qua8 : "",
        },

        category: {
          id: category.id,
          name: category.name,
        },
        address: {
          line1: state.address ? state.address : "",
        },
        city: state.city ? state.city : "",
        companySize: companySize.name ? companySize.name : "",
        yearOfFormation: yearOfFormation.name ? +yearOfFormation.name : "",
        yearOfFinance1: yearOfFinance1.name ? yearOfFinance1.name : "",
        yearOfFinance2: yearOfFinance2.name ? yearOfFinance2.name : "",
        typeOfInvestement: typeOfInvestement.name ? typeOfInvestement.name : "",
        description: state.description ? state.description : "",
        panNo: state.panNo ? state.panNo : "",
        currentFinancialIncome: state.currentFinancialIncome
          ? +state.currentFinancialIncome
          : "",
        currentValuation: state.currentValuation ? +state.currentValuation : "",

        equityPercentage: equityPercentage ? +equityPercentage : "",
        amount: state.amount ? +state.amount : "",

        products: products.map((product) => ({
          name: product.name,
          profitPercentage: product.profitPercentage
            ? +product.profitPercentage
            : 0,
        })),
      };

      await addAdvanceDetails(accountInfo, email, phoneNumber);
      await queryClient.invalidateQueries({
        queryKey: ["businessAccountData"],
      });
      await queryClient.refetchQueries({ queryKey: ["businessAccountData"] });
      await queryClient.invalidateQueries({
        queryKey: ["singleBusinessAccountData"],
      });
      await queryClient.refetchQueries({
        queryKey: ["singleBusinessAccountData"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["businessAccountExistOrNot"],
      });
      await queryClient.refetchQueries({
        queryKey: ["businessAccountExistOrNot"],
      });
      await queryClient.invalidateQueries({ queryKey: ["startUpData"] });
      await queryClient.refetchQueries({ queryKey: ["startUpData"] });
      if (existOrNot) {
        toast.success("Changes saved successfully.");
      } else {
        toast.success("Business account created.");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);

      toast.error("Some error occured");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (businessAccountData) {
      setState({
        // name: startUpData?.name,
        founderName: businessAccountData
          ? businessAccountData?.founderName
          : "",
        city: businessAccountData ? businessAccountData?.city : "",
        coFounderName: businessAccountData?.coFounderName,
        linkedInUrl: businessAccountData?.social?.linkedin,
        description: businessAccountData?.description,
        address: businessAccountData?.address?.line1,
        currentFinancialIncome: businessAccountData?.currentFinancialIncome,
        financialyear1: businessAccountData?.financialyear1,
        financialyear2: businessAccountData?.financialyear2,
        qua1: businessAccountData?.year1?.qua1,
        qua2: businessAccountData?.year1?.qua2,
        qua3: businessAccountData?.year1?.qua3,
        qua4: businessAccountData?.year1?.qua4,
        qua5: businessAccountData?.year2?.qua1,
        qua6: businessAccountData?.year2?.qua2,
        qua7: businessAccountData?.year2?.qua3,
        qua8: businessAccountData?.year2?.qua4,
        currentValuation: businessAccountData?.currentValuation,

        amount: businessAccountData?.amount,
        typeOfInvestement: businessAccountData?.typeOfInvestement,
        panNo: businessAccountData?.panNo,
      });
      setEquityPercetnage(
        businessAccountData ? businessAccountData?.equityPercentage : ""
      );
      // setCity(businessAccountData ? { name: businessAccountData.city } : { name: "" })
      setYearOfFormation(
        businessAccountData
          ? { name: businessAccountData.yearOfFormation }
          : { name: "" }
      );
      setYearOfFinance1(
        businessAccountData
          ? { name: businessAccountData.yearOfFinance1 }
          : { name: "" }
      );
      setYearOfFinance2(
        businessAccountData
          ? { name: businessAccountData.yearOfFinance2 }
          : { name: "" }
      );

      setTypeOfInvestment(
        businessAccountData
          ? { name: businessAccountData.typeOfInvestement }
          : { name: "" }
      );
      setCompanySize(
        businessAccountData
          ? { name: businessAccountData.companySize }
          : { name: "" }
      );
      setCategory(
        businessAccountData
          ? {
              id: businessAccountData.category.id,
              name: businessAccountData.category.name,
            }
          : { id: "", name: "" }
      );

      if (businessAccountData.products) {
        setProducts(businessAccountData.products);
      } else {
        setProducts([{ name: "", profitPercentage: "" }]);
      }
    }

    if (startUpData) {
      setPhoneNumber(startUpData?.phoneNo ? startUpData?.phoneNo : "");
      setEmail(startUpData.email);
      setName(startUpData?.name);
    }
  }, [businessAccountData, existOrNot, startUpData]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={` h-fit py-2  relative z-0 mb-10 ${
        pathName.includes("business-account")
          ? "block  w-[100%] sm:mt-5"
          : "sm:block hidden md:w-[63%] w-[100%]"
      } `}
    >
      {pathName.includes("business-account") && (
        <div
          onClick={() => {
            router.replace("/account?tab=my-profile");
          }}
          className="mb-2"
        >
          <FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" />
        </div>
      )}
      <div className="text-primary font-bold xl:text-xl sm:text-xl text-lg ">
        <h1>Create Business Account</h1>
      </div>
      <div className="text-[#868E97] xl:text-sm text-sm font-medium  sm:mb-6 mb-4 mt-4">
        <p>Fill in all the details to get started.</p>
      </div>
      <div className="text-primary font-bold  text-base  ">
        <h2>Basic</h2>
      </div>
      <div className="w-full flex flex-col sm:gap-9 gap-7 sm:my-8 my-5">
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full  ">
          <div className={`${borderStyle} md:w-[50%] w-full`}>
            <label className={`${labelStyle}`} htmlFor="input">
              Name of the Startup
            </label>
            <input
              value={isClient && name ? name : ""}
              onChange={(e) => setName(e.target.value)}
              className={`${inputStyle}`}
              type="text"
              id="input"
            />
          </div>
          <div className={`${borderStyle} md:w-[50%] w-full`}>
            <label className={`${labelStyle}`} htmlFor="input">
              Founder Name
            </label>
            <input
              value={isClient && state.founderName ? state.founderName : ""}
              onChange={(e) =>
                setState({ ...state, founderName: e.target.value })
              }
              className={`${inputStyle}`}
              type="text"
              id="input"
            />
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full ">
          <div className={`${borderStyle} sm:w-[50%] w-full`}>
            <label className={`${labelStyle}`} htmlFor="input">
              Co- Founder Name
            </label>
            <input
              value={isClient && state.coFounderName ? state.coFounderName : ""}
              onChange={(e) =>
                setState({ ...state, coFounderName: e.target.value })
              }
              className={`${inputStyle}`}
              type="text"
              id="input"
            />
          </div>
          <div
            className={`flex ${borderStyle} justify-between  items-center gap-4 w-full sm:w-[50%] w-full `}
          >
            <div className={`w-[100%]`}>
              <label className={`${labelStyle}`} htmlFor="input">
                LinkedIN URL
              </label>
              <input
                value={isClient && state.linkedInUrl ? state.linkedInUrl : ""}
                onChange={(e) =>
                  setState({ ...state, linkedInUrl: e.target.value })
                }
                className={`${inputStyle}  w-[100%]`}
                type="text"
                id="input"
              />
            </div>
            <div className="  px-4">
              <FlatIcon className="flaticon-help-1 text-[#9bb7d3] text-xl" />
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full relative ">
          <div className="border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md ">
            <p className={`${labelStyle}`}>Category</p>
            <div className="  relative w-full py-3 px-4 rounded-md ">
              <Listbox value={category} onChange={setCategory}>
                <div className=" ">
                  <Listbox.Button
                    className={` w-full flex justify-between items-center text-start lg:text-sm md:text-xs text-sm`}
                  >
                    <span>
                      {(category?.name && isClient && category.name) ||
                        "Select"}
                    </span>
                    <span>
                      <FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options
                    className={`max-h-[300px] overflow-y-scroll absolute top-[50px] px-3 py-3 rounded-md shadow-xl   bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`}
                  >
                    {categoriesData &&
                      categoriesData.length > 0 &&
                      categoriesData.map((category: any) => (
                        <Listbox.Option
                          key={category.id}
                          value={category}
                          as={Fragment}
                        >
                          {({ active, selected }) => (
                            <li
                              className={`${
                                active
                                  ? "bg-blue-500 text-white cursor-pointer"
                                  : "bg-white text-black cursor-pointer"
                              }  flex justify-between px-2 py-1 shadow rounded-md `}
                            >
                              {/* {selected && <CheckIcon />} */}
                              <span>{category.name}</span>
                              {selected && <span>&#x2714;</span>}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md ">
            <p className={`${labelStyle}`}>Company Size</p>
            <div className="  relative w-full py-3 px-4 rounded-md ">
              <Listbox value={companySize} onChange={setCompanySize}>
                <div className=" ">
                  <Listbox.Button
                    className={` w-full flex justify-between items-center text-start lg:text-sm md:text-xs text-sm`}
                  >
                    <span>
                      {" "}
                      {(isClient && companySize?.name && companySize.name) ||
                        "Select"}
                    </span>
                    <span>
                      <FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options
                    className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`}
                  >
                    {dummyCompanySize.map((company) => (
                      <Listbox.Option
                        key={company.id}
                        value={company}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active
                                ? "bg-blue-500 text-white cursor-pointer"
                                : "bg-white text-black cursor-pointer"
                            }  flex justify-between px-2 py-1 shadow rounded-md `}
                          >
                            {/* {selected && <CheckIcon />} */}

                            <span>{company.name}</span>
                            {selected && <span>&#x2714;</span>}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-9 gap-5  w-full ">
          <div className={`${borderStyle} w-[100%]`}>
            <label className={`${labelStyle}`} htmlFor="input">
              Address
            </label>
            <input
              value={isClient && state.address ? state.address : ""}
              onChange={(e) => setState({ ...state, address: e.target.value })}
              className={`${inputStyle}`}
              type="text"
              id="input"
            />
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full relative ">
          <div className="border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md ">
            <p className={`${labelStyle}`}>City</p>
            <input
              value={isClient && state.city ? state.city : ""}
              onChange={(e) => setState({ ...state, city: e.target.value })}
              className={`${inputStyle}`}
              type="text"
              id="input"
            />

            {/* <div className='  relative w-full py-3 px-4 rounded-md '>
              <Listbox value={city} 
              onChange={setCity}
              >
                <div className=' '>
                  <Listbox.Button className={` w-full flex justify-between items-center text-start lg:text-sm md:text-xs text-sm `}><span>{(isClient && city?.name && city.name) || "Select"}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                  <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`} >
                    {dummyCities.map((city) => (
                      <Listbox.Option key={city.id} value={city} as={Fragment} >
                        {({ active, selected }) => (
                          <li
                            className={`${active ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white text-black cursor-pointer'
                              }  flex justify-between px-2 py-1 shadow rounded-md `}
                          >


                            <span>
                              {city.name}
                            </span>
                            {selected && <span>check</span>}

                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div> */}
          </div>
          {/* <div className='border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md '>
            <p className={`${labelStyle}`}>Industry</p>
            <div className='  relative w-full py-3 px-4 rounded-md '>
              <Listbox value={industry} onChange={setIndustry}>
                <div className=' '>
                  <Listbox.Button className={` w-full flex justify-between items-center text-start`}><span>{industry.name}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                  <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-1 left-0 z-30 w-full`} >
                    {dummyIndustry.map((industry) => (
                      <Listbox.Option key={industry.id} value={industry} as={Fragment} >
                        {({ active, selected }) => (
                          <li
                            className={`${active ? 'bg-blue-500 text-white cursor-pointer' : ' text-black cursor-pointer'
                              }  flex justify-between`}
                          >
                           

                            <span>
                              {industry.name}
                            </span>
                            {selected && <span>check</span>}

                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div> */}
        </div>
        <div className="flex md:flex-row flex-col md:gap-9 gap-5 gap-9  w-full ">
          <div className={`${borderStyle} w-[100%] business-account-desc`}>
            <label htmlFor="" className={`${labelStyle}`}>
              Description
            </label>
            <textarea
              value={isClient && state.description ? state.description : ""}
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              name=""
              id=""
              className={`${inputStyle}`}
              rows={2}
            ></textarea>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-9 gap-5  w-full  relative ">
          <div className="border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md ">
            <p className={`${labelStyle}`}>Year of Formation</p>
            <div className="  relative w-full py-3 px-4 rounded-md ">
              <Listbox value={yearOfFormation} onChange={setYearOfFormation}>
                <div className=" ">
                  <Listbox.Button
                    className={` w-full flex justify-between items-center text-start lg:text-sm md:text-xs text-sm`}
                  >
                    <span>
                      {(isClient &&
                        yearOfFormation?.name &&
                        yearOfFormation.name) ||
                        "Select"}
                    </span>
                    <span>
                      <FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options
                    className={`absolute top-[50px] px-3 py-2 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full h-40 overflow-y-scroll`}
                  >
                    {resultArray.map((year: any) => (
                      <Listbox.Option key={year.id} value={year} as={Fragment}>
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active
                                ? "bg-blue-500 text-white cursor-pointer"
                                : "bg-white text-black cursor-pointer"
                            }  flex justify-between px-2 py-1 shadow rounded-md `}
                          >
                            {/* {selected && <CheckIcon />} */}

                            <span>{year.name}</span>
                            {selected && <span>&#x2714;</span>}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-primary font-bold  text-base  ">
          <h2>Financials</h2>
        </div>
        <div className="w-full  sm:my-8 my-5">
          <div className="grid sm:grid-cols-2  grid-cols-1 md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-2 w-full  ">
            <div className="flex flex-col gap-5  mb-5">
              {/* <div className="flex flex-col sm:gap-9 gap-7"> */}
              <div
                className={`flex ${borderStyle} justify-between  items-center gap-4 w-full  `}
              >
                <div className={`w-[100%]`}>
                  <label className={`${labelStyle}`} htmlFor="input">
                    Current Financial Income
                  </label>
                  <input
                    value={
                      isClient && state.currentFinancialIncome
                        ? state.currentFinancialIncome
                        : ""
                    }
                    onChange={(e) =>
                      setState({
                        ...state,
                        currentFinancialIncome: e.target.value,
                      })
                    }
                    className={`${inputStyle}  w-[100%]`}
                    type="text"
                    id="input"
                  />
                </div>
                <div className="px-4 text-xl text-[#9bb7d3]">&#8377;</div>
              </div>
              <div className="border border-[#C8C8C8]  relative flex items-center rounded-md ">
                <p className={`${labelStyle}`}>Year</p>
                <div className="  relative w-full py-3 px-4 rounded-md ">
                  <Listbox value={yearOfFinance1} onChange={setYearOfFinance1}>
                    <div className=" ">
                      <Listbox.Button
                        className={` w-full flex items-center justify-between text-start`}
                      >
                        {(isClient &&
                          yearOfFinance1?.name &&
                          yearOfFinance1.name) ||
                          "Select"}
                        <span>
                          <FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options
                        className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-1 left-0 z-30 w-full h-40 overflow-y-scroll`}
                      >
                        {rangeArray.map((year: any) => (
                          <Listbox.Option
                            key={year.id}
                            value={year}
                            as={Fragment}
                          >
                            {({ active, selected }) => (
                              <li
                                className={`${
                                  active
                                    ? "bg-blue-500 text-white cursor-pointer"
                                    : " text-black cursor-pointer"
                                }  flex justify-between px-2 py-1 shadow rounded-md`}
                              >
                                <span>{year.name}</span>
                                {selected && <span>&#x2714;</span>}
                              </li>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              </div>

              <div className="">
                <div className="flex justify-between items-center text-sm text-[#868E97] font-medium mb-4">
                  <div className="flex items-center gap-2">
                    <h2>Quarterly</h2>
                  </div>
                  <h2>Amount</h2>
                </div>
                <div className="flex flex-col sm:gap-3 gap-2">
                  {/* <!-- Quarter 1 --> */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium w-[85%]">
                      Quarter 1 (Jan-Mar)
                    </div>
                    {/* <!-- Input field styled as div for Quarter 1 --> */}
                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                      value={isClient && state.qua1 ? state.qua1 : ""}
                      onChange={(e) =>
                        setState({ ...state, qua1: e.target.value })
                      }
                    />
                  </div>
                  {/* <!-- Quarter 2 --> */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium">
                      Quarter 2 (Apr-Jun)
                    </div>
                    {/* <!-- Input field styled as div for Quarter 2 --> */}
                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                      value={isClient && state.qua2 ? state.qua2 : ""}
                      onChange={(e) =>
                        setState({ ...state, qua2: e.target.value })
                      }
                    />
                  </div>
                  {/* <!-- Quarter 3 --> */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium">
                      Quarter 3 (Jul-Sep)
                    </div>
                    {/* <!-- Input field styled as div for Quarter 3 --> */}
                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                      value={isClient && state.qua3 ? state.qua3 : ""}
                      onChange={(e) =>
                        setState({ ...state, qua3: e.target.value })
                      }
                    />
                  </div>
                  {/* <!-- Quarter 4 --> */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium">
                      Quarter 4 (Oct-Dec)
                    </div>
                    {/* <!-- Input field styled as div for Quarter 4 --> */}
                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                      value={isClient && state.qua4 ? state.qua4 : ""}
                      onChange={(e) =>
                        setState({ ...state, qua4: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {addbutton && (
                <>
                  {" "}
                  <div className="border border-[#C8C8C8]  relative flex items-center rounded-md ">
                    <p className={`${labelStyle}`}>Year</p>
                    <div className="  relative w-full py-3 px-4 rounded-md ">
                      <Listbox
                        value={yearOfFinance2}
                        onChange={setYearOfFinance2}
                      >
                        <div className=" ">
                          <Listbox.Button
                            className={` w-full flex items-center justify-between text-start`}
                          >
                            {(isClient &&
                              yearOfFinance2?.name &&
                              yearOfFinance2.name) ||
                              "Select"}
                            <span>
                              <FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" />
                            </span>
                          </Listbox.Button>
                          <Listbox.Options
                            className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-1 left-0 z-30 w-full h-40 overflow-y-scroll`}
                          >
                            {rangeArray.map((year: any) => (
                              <Listbox.Option
                                key={year.id}
                                value={year}
                                as={Fragment}
                              >
                                {({ active, selected }) => (
                                  <li
                                    className={`${
                                      active
                                        ? "bg-blue-500 text-white cursor-pointer"
                                        : " text-black cursor-pointer"
                                    }  flex justify-between px-2 py-1 shadow rounded-md`}
                                  >
                                    <span>{year.name}</span>
                                    {selected && <span>&#x2714;</span>}
                                  </li>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex justify-between items-center text-sm text-[#868E97] font-medium mb-4">
                      <div className="flex items-center gap-2">
                        <h2>Quarterly</h2>
                      </div>
                      <h2>Amount</h2>
                    </div>
                    <div className="flex flex-col sm:gap-3 gap-2">
                      {/* <!-- Quarter 1 --> */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-[#868E97] font-medium w-[85%]">
                          Quarter 1 (Jan-Mar)
                        </div>
                        {/* <!-- Input field styled as div for Quarter 1 --> */}
                        <input
                          type="text"
                          className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                          placeholder="₹"
                          value={isClient && state.qua5 ? state.qua5 : ""}
                          onChange={(e) =>
                            setState({ ...state, qua5: e.target.value })
                          }
                        />
                      </div>
                      {/* <!-- Quarter 2 --> */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-[#868E97] font-medium">
                          Quarter 2 (Apr-Jun)
                        </div>
                        {/* <!-- Input field styled as div for Quarter 2 --> */}
                        <input
                          type="text"
                          className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                          placeholder="₹"
                          value={isClient && state.qua6 ? state.qua6 : ""}
                          onChange={(e) =>
                            setState({ ...state, qua6: e.target.value })
                          }
                        />
                      </div>
                      {/* <!-- Quarter 3 --> */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-[#868E97] font-medium">
                          Quarter 3 (Jul-Sep)
                        </div>
                        {/* <!-- Input field styled as div for Quarter 3 --> */}
                        <input
                          type="text"
                          className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                          placeholder="₹"
                          value={isClient && state.qua7 ? state.qua7 : ""}
                          onChange={(e) =>
                            setState({ ...state, qua7: e.target.value })
                          }
                        />
                      </div>
                      {/* <!-- Quarter 4 --> */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-[#868E97] font-medium">
                          Quarter 4 (Oct-Dec)
                        </div>
                        {/* <!-- Input field styled as div for Quarter 4 --> */}
                        <input
                          type="text"
                          className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                          placeholder="₹"
                          value={isClient && state.qua8 ? state.qua8 : ""}
                          onChange={(e) =>
                            setState({ ...state, qua8: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!addbutton ? (
                <div
                  className="text-center text-[#868e97] flex justify-center text-sm border border-primary rounded-md py-3 cursor-pointer"
                  onClick={() => setAddbutton(!addbutton)}
                >
                  <button className="flex items-center justify-center gap-1">
                    <FlatIcon className="flaticon-plus text-[10px]" />{" "}
                    <span>Add Another Year</span>
                  </button>
                </div>
              ) : //   <button className="flex items-center justify-center gap-1">
              //   <FlatIcon className="flaticon-minus text-[10px]" />{" "}
              //   <span>- Remove Second Year</span>
              // </button>
              null}
            </div>
            <div>
              <div className="flex flex-col sm:gap-9 gap-5  ">
                <div
                  className={`flex ${borderStyle} justify-between  items-center gap-4 w-full  `}
                >
                  <div className={`w-[100%]`}>
                    <label className={`${labelStyle}`} htmlFor="input">
                      Current Valuation
                    </label>
                    <input
                      value={
                        isClient && state.currentValuation
                          ? state.currentValuation
                          : ""
                      }
                      onChange={(e) =>
                        setState({ ...state, currentValuation: e.target.value })
                      }
                      className={`${inputStyle}  w-[100%]`}
                      type="text"
                      id="input"
                    />
                  </div>
                  <div className="px-4 text-xl text-[#9bb7d3]">&#8377;</div>
                </div>
                <div className={`text-sm text-[#868E97] font-medium `}>
                  Profit
                </div>
                {/* <div className="flex md:gap-8 sm:gap-4 gap-2 w-full ">
                  <div className={`${borderStyle} w-[85%] `}>
                    <label className={`${labelStyle}`} htmlFor="input">
                      Enter product name
                    </label>
                    <input className={`${inputStyle}`} type="text" id="input" />
                  </div>
                  <div className=" w-[15%]  ">
                    <div className="percentage-placeholder flex justify-center">
                      <input
                        type="text"
                        className="py-3 sm:px-5 px-3 outline-0 w-[100%] border border-[#C8C8C8] rounded-md"
                        placeholder="%"
                      />
                    </div>
                  </div>
                </div> */}

                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex md:gap-8 sm:gap-4 gap-2 w-full"
                  >
                    <div className={`${borderStyle} w-[85%] `}>
                      <label
                        className={`${labelStyle}`}
                        htmlFor={`product-name-${index}`}
                      >
                        Enter product name
                      </label>
                      <input
                        className={`${inputStyle}`}
                        type="text"
                        id={`product-name-${index}`}
                        value={product.name}
                        onChange={(e) => handleProductNameChange(index, e)} // Separate handler for product name
                      />
                    </div>
                    <div className="w-[15%]">
                      <div className="percentage-placeholder flex justify-center">
                        <input
                          type="text"
                          className="py-3 sm:px-5 px-3 outline-0 w-[100%] border border-[#C8C8C8] rounded-md"
                          placeholder="%"
                          value={product.profitPercentage}
                          onChange={(e) =>
                            handleProfitPercentageChange(index, e)
                          } // Separate handler for profit percentage
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {products.length < 5 && (
                <div
                  className="text-center cursor-pointer text-[#868e97] flex justify-center text-sm border border-primary rounded-md py-3 sm:mt-4 mt-6"
                  onClick={addProduct}
                >
                  <button className="flex items-center justify-center gap-1">
                    <FlatIcon className="flaticon-plus text-[10px]" />{" "}
                    <span>Add Product</span>
                  </button>
                </div>
              )}
              {/* <div className="text-center cursor-pointer text-[#868e97] flex justify-center text-sm border border-primary rounded-md py-3 sm:mt-4 mt-6">
                <button className="flex items-center justify-center gap-1">
                  <FlatIcon className="flaticon-plus text-[10px]" />{" "}
                  <span>Add product</span>
                </button>
              </div> */}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2  sm:gap-y-9 gap-y-7  md:gap-x-9 gap-x-5 w-full md:mt-6 sm:mt-4 mt-7 ">
            <div className="flex flex-col sm:gap-9 gap-7 ">
              <div className="border border-[#C8C8C8]  relative flex items-center rounded-md ">
                <p className={`${labelStyle}`}>Type of Investment Required</p>
                <div className="  relative w-full py-3 px-4 rounded-md ">
                  <Listbox
                    value={typeOfInvestement}
                    onChange={setTypeOfInvestment}
                  >
                    <div className=" ">
                      <Listbox.Button
                        className={` w-full flex items-center justify-between text-start text-sm lg:text-sm md:text-xs text-sm`}
                      >
                        <span>
                          {(isClient &&
                            typeOfInvestement?.name &&
                            typeOfInvestement.name) ||
                            "Select"}
                        </span>
                        <span>
                          <FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options
                        className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl overflow-y-scroll max-h-40 bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`}
                      >
                        {investmentTypes.map((investment) => (
                          <Listbox.Option
                            key={investment.id}
                            value={investment}
                            as={Fragment}
                          >
                            {({ active, selected }) => (
                              <li
                                className={`${
                                  active
                                    ? "bg-blue-500 text-white cursor-pointer"
                                    : "bg-white text-black cursor-pointer"
                                }  flex justify-between px-2 py-1 shadow rounded-md `}
                              >
                                {/* {selected && <CheckIcon />} */}

                                <span>{investment.name}</span>
                                {selected && <span>&#x2714;</span>}
                                {/* {active && (
                                  <div className="z-50 relative">
                                    <span className="">
                                      {investment.tooltip}
                                    </span>
                                  </div>
                                )} */}
                              </li>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              </div>
              {/* <div className={`${borderStyle} `}>
                <label className={`${labelStyle}`} htmlFor="input">Pan Number</label>
                <input value={(isClient&&state.panNo)?state.panNo:""} onChange={(e) => setState({ ...state, panNo: e.target.value })} className={`${inputStyle}`} type="text" id="input" />
              </div> */}
            </div>
            {typeOfInvestement.name === "Equity" && (
              <div>
                <div className="flex md:gap-8 sm:gap-4 gap-2 w-full ">
                  <div className={`${borderStyle} w-[85%] `}>
                    <label className={`${labelStyle}`} htmlFor="input">
                      Equity Percentage
                    </label>
                    <input
                      value={equityPercentage}
                      onChange={(e) => setEquityPercetnage(e.target.value)}
                      className={`${inputStyle}`}
                      type="text"
                      id="input"
                    />
                  </div>
                  <div className=" w-[15%]  ">
                    <div className="percentage-placeholder font-semibold text-base text-[#9bb7d3] py-2.5  flex justify-center border border-[#C8C8C8]  rounded-md">
                      %
                      {/* <input  type="text" className='py-3 sm:px-5 px-3 outline-0 w-[100%] border border-[#C8C8C8] rounded-md' placeholder='%' /> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <div
                className={`flex ${borderStyle} justify-between  items-center gap-4 w-full  `}
              >
                <div className={`w-[100%]`}>
                  <label className={`${labelStyle}`} htmlFor="input">
                    Amount
                  </label>
                  <input
                    value={isClient && state.amount ? state.amount : ""}
                    onChange={(e) =>
                      setState({ ...state, amount: e.target.value })
                    }
                    className={`${inputStyle}  w-[100%]`}
                    type="text"
                    id="input"
                  />
                </div>
                <div className="px-4 text-xl text-[#9bb7d3]">&#8377;</div>
              </div>
            </div>
            <div className={`${borderStyle} `}>
              <label className={`${labelStyle}`} htmlFor="input">
                PAN Number
              </label>
              <input
                value={isClient && state.panNo ? state.panNo : ""}
                onChange={(e) =>
                  setState({
                    ...state,
                    panNo: e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, ""),
                  })
                }
                className={`${inputStyle}`}
                type="text"
                id="input"
                onInput={restrictInput}
              />
            </div>
          </div>
        </div>
        {/* <div className='text-primary font-bold  text-base  '><h2>Photos and Videos</h2></div>
        <div className='flex items-center gap-8 sm:my-8 my-5'>
          <div className='sm:h-[150px] h-[100px] sm:w-[150px] w-[100px] rounded-lg bg-primary text-white text-7xl flex items-center justify-center font-bold'>+</div>
          <div className='sm:h-[150px] h-[100px] sm:w-[150px] w-[100px] rounded-lg border border-primary border-dashed text-primary text-6xl flex items-center justify-center font-bold'>+</div>
        </div> */}
        <div className="flex flex-col sm:gap-10 gap-6 mt-7 ">
          {/* <div className='text-primary font-bold  text-base  '><h2>Contact</h2></div> */}
          <div className="grid sm:grid-cols-2 grid-cols-1  md:gap-9 gap-7">
            <div className={`${borderStyle} `}>
              <label className={`${labelStyle}`} htmlFor="input">
                Email
              </label>
              <input
                value={isClient && email ? email : ""}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputStyle}`}
                type="text"
                id="input"
              />
            </div>
            <div className={`${borderStyle}  `}>
              <label className={`${labelStyle}`} htmlFor="input">
                Phone Number
              </label>
              <input
                value={isClient && phoneNumber ? phoneNumber : ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={startUpData?.signInMethod === "google" ? false : true}
                className={`${inputStyle} `}
                type="text"
                id="input"
              />
            </div>
          </div>
          <div
            onClick={async () => {
              await onSubmitHandler();
            }}
            className="bg-primary text-white text-sm font-medium  text-center rounded-full py-4 cursor-pointer"
          >
            <button style={{ height: "100%", position: "relative" }}>
              {/* Save changes */}
              {/* {loading && (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }}>
                  <Loader />
                </div>
              )} */}
              {existOrNot ? "Save changes" : "Submit"}
            </button>
          </div>
          <Modal isOpen={loading} setOpen={setLoading}>
            <div className="flex flex-col gap-2 justify-center items-center">
              <CircularProgress className="!text-white"></CircularProgress>
              <p className="text-white font-medium text-lg">Processing...</p>
            </div>
          </Modal>
          {/* <div onClick={async()=>{
            await onSubmitHandler()
          }} className='bg-primary text-white text-sm font-medium  text-center rounded-full py-4 cursor-pointer'><button>Submit</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BusinessAccount;
