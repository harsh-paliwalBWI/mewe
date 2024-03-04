"use client";
import FlatIcon from "@/components/flatIcon/flatIcon";
import { Listbox } from "@headlessui/react";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

import Modal from "@/components/Modal/modal";
import { db } from "@/config/firebase-config";
import { fetchAllCategories } from "@/services/categoriesService";
import {
  fetchBusinessAccountDetails,
  getStartUpData,
  isBusinessAccountExistOrNot,
} from "@/services/startupService";
import { CircularProgress } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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

  const pathName = usePathname();

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

  const [yearOfFormation, setYearOfFormation] = useState(
    businessAccountData
      ? { name: businessAccountData.yearOfFormation }
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

  const [revenue, setRevenue] = useState([
    {
      YearRange: "",
      quarter1: 0,
      quarter2: 0,
      quarter3: 0,
      quarter4: 0,
    },
  ]);

  const [state, setState] = useState({
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

    typeOfInvestement: businessAccountData
      ? businessAccountData?.typeOfInvestement
      : "",

    currentValuation: businessAccountData
      ? businessAccountData?.currentValuation
      : "",
    amount: businessAccountData ? businessAccountData?.amount : "",

    panNo: businessAccountData ? businessAccountData?.panNo : "",
  });

  function restrictInput(event: any) {
    const input = event.target;

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

        category: {
          id: category.id,
          name: category.name,
        },
        address: {
          line1: state.address ? state.address : "",
        },
        city: state.city ? state.city : "",

        yearOfFormation: yearOfFormation.name ? +yearOfFormation.name : "",
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
        founderName: businessAccountData
          ? businessAccountData?.founderName
          : "",
        city: businessAccountData ? businessAccountData?.city : "",
        coFounderName: businessAccountData?.coFounderName,
        linkedInUrl: businessAccountData?.social?.linkedin,
        description: businessAccountData?.description,
        address: businessAccountData?.address?.line1,
        currentFinancialIncome: businessAccountData?.currentFinancialIncome,

        currentValuation: businessAccountData?.currentValuation,

        amount: businessAccountData?.amount,
        typeOfInvestement: businessAccountData?.typeOfInvestement,
        panNo: businessAccountData?.panNo,
      });
      setEquityPercetnage(
        businessAccountData ? businessAccountData?.equityPercentage : ""
      );

      setYearOfFormation(
        businessAccountData
          ? { name: businessAccountData.yearOfFormation }
          : { name: "" }
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
      <div>
        <div className="w-full  sm:my-8 my-5">
          <div className="grid sm:grid-cols-2  grid-cols-1 md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-2 w-full  ">
            <div className="flex flex-col gap-5  mb-5">
              <div className="border border-[#C8C8C8]  relative flex items-center rounded-md ">
                <p className={`${labelStyle}`}>Year</p>
                <div className="  relative w-full py-3 px-4 rounded-md ">
                  <Listbox>
                    <div className=" ">
                      <Listbox.Button
                        className={` w-full flex items-center justify-between text-start`}
                      >
                        Select
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
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium w-[85%]">
                      Quarter 1 (Jan-Mar)
                    </div>

                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium">
                      Quarter 2 (Apr-Jun)
                    </div>

                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium">
                      Quarter 3 (Jul-Sep)
                    </div>

                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#868E97] font-medium">
                      Quarter 4 (Oct-Dec)
                    </div>

                    <input
                      type="text"
                      className="div-styled-input py-3 sm:px-5 px-3 outline-0 w-[15%] border border-[#C8C8C8] rounded-md"
                      placeholder="₹"
                    />
                  </div>
                </div>
              </div>

              <div
                className="text-center text-[#868e97] flex justify-center text-sm border border-primary rounded-md py-3 cursor-pointer"
                onClick={() => setAddbutton(!addbutton)}
              >
                <button className="flex items-center justify-center gap-1">
                  <FlatIcon className="flaticon-plus text-[10px]" />{" "}
                  <span>Add Another Year</span>
                </button>
              </div>
            </div>
            <div>
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
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:gap-10 gap-6 mt-7 ">
          <div
            onClick={async () => {
              await onSubmitHandler();
            }}
            className="bg-primary text-white text-sm font-medium  text-center rounded-full py-4 cursor-pointer"
          >
            <button style={{ height: "100%", position: "relative" }}>
              {existOrNot ? "Save changes" : "Submit"}
            </button>
          </div>
          <Modal isOpen={loading} setOpen={setLoading}>
            <div className="flex flex-col gap-2 justify-center items-center">
              <CircularProgress className="!text-white"></CircularProgress>
              <p className="text-white font-medium text-lg">Processing...</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BusinessAccount;
