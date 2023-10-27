import React,{useState,Fragment} from 'react'
import { Listbox, Transition } from "@headlessui/react";
const people = [
    { id: 1, name: 'gfgjj', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },]

const BusinessAccount = () => {
    const [selectedPerson, setSelectedPerson] = useState(people[0])

    const borderStyle = "border border-[#C8C8C8] rounded-md relative"
    const labelStyle = "text-sm text-[#868E97] font-medium tracking-wide px-1  bg-white absolute top-[-10px] left-[10px]"
    const inputStyle = "rounded-lg px-3 py-3 w-full outline-0"
    
    return (
        <div className='  h-fit py-2 md:w-[63%] w-[100%] relative z-10'>
            <div className='text-primary font-bold text-2xl tracking-wide'><h1>Create Business Account</h1></div>
            <div className='text-[#868E97] text-base font-medium tracking-wide mb-8 mt-4'><p>Fill in all the details to get started.</p></div>
            <div className='text-primary font-bold text-lg tracking-wide '><h2>Basic</h2></div>
            <div className="w-full flex flex-col gap-9 my-8 ">
                <div className="flex sm:flex-row flex-col md:gap-9 gap-5 w-full ">
                    <div className={`${borderStyle} md:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Name of the Startup</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    <div className={`${borderStyle} md:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Founder Name</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col md:gap-9 gap-5 w-full ">
                    <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Co- Founder Name</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">LinkedIN URL</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col md:gap-9 gap-5  w-full relative z-10 ">
                    {/* <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Category</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div> */}
                    {/* <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Company Size</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div> */}


<div className="w-full sm:w-[50%]   border border-[#C8C8C8] rounded-md relative py-3  ">
              <div className="  w-full py-3   ">
                <p className={`${labelStyle} `}>Category</p>
                <Listbox
                value={selectedPerson} onChange={setSelectedPerson}
                >
                  <div className="absolute top-1/2 transform -translate-y-1/2 bg-transparent w-full   ">
                    <Listbox.Button className="relative w-full cursor-default     pr-10  text-left shadow-inner focus:outline-none sm:text-sm     ">
                      <span className="block truncate text-sm px-2">
                        {/* {state?.state || "Select"} */}
                        {selectedPerson.name || ""}
                      </span>
                       <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 ">
                up icon
              </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 border border-primary  z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people &&
                          people.map((state, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-5 pr-4 ${active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {state.name }
                                  </span>
                                  {/* {state?.code === state?.stateCode ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                           
                                      check
                                    </span>
                                  ) : null} */}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

<div className="w-full sm:w-[50%]   border border-[#C8C8C8] rounded-md relative  py-3 z-10 ">
              <div className="  w-full py-3   ">
                <p className={` ${labelStyle}`}>Company Size</p>
                <Listbox
                value={selectedPerson} onChange={setSelectedPerson}
                >
                  <div className="absolute top-1/2 transform -translate-y-1/2 bg-transparent w-full py-3 ">
                    <Listbox.Button className="relative w-full cursor-default     pr-10  text-left shadow-inner focus:outline-none sm:text-sm     ">
                      <span className="block truncate text-sm px-2 ">
                        {/* {state?.state || "Select"} */}
                        {selectedPerson.name || ""}
                      </span>
                       <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 ">
                up icon
              </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1  z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people &&
                          people.map((state, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-5 pr-4 ${active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {state.name }
                                  </span>
                                  {/* {state?.code === state?.stateCode ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                           
                                      check
                                    </span>
                                  ) : null} */}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

                </div>
                <div className="flex sm:flex-row flex-col md:gap-9 gap-5  w-full z-10 ">

                    <div className={`${borderStyle} w-[100%]`}>
                        <label className={`${labelStyle}`} htmlFor="input">Address</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col md:gap-9 gap-5  w-full relative z-10">
                    {/* <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Category</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div> */}
                    {/* <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Company Size</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div> */}


<div className="w-full sm:w-[50%]   border border-[#C8C8C8] rounded-md relative py-3 z-10 ">
              <div className="  w-full py-3  z-10 ">
                <p className={`${labelStyle} `}>City</p>
                <Listbox
                value={selectedPerson} onChange={setSelectedPerson}
                >
                  <div className="absolute top-1/2 transform -translate-y-1/2 bg-transparent w-full  ">
                    <Listbox.Button className="relative w-full cursor-default     pr-10  text-left shadow-inner focus:outline-none sm:text-sm     ">
                      <span className="block truncate text-sm px-2">
                        {/* {state?.state || "Select"} */}
                        {selectedPerson.name || ""}
                      </span>
                       <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 ">
                up icon
              </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute   z-70 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people &&
                          people.map((state, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-5 pr-4 ${active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {state.name }
                                  </span>
                                  {/* {state?.code === state?.stateCode ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                           
                                      check
                                    </span>
                                  ) : null} */}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

<div className="w-full sm:w-[50%]   border border-[#C8C8C8] rounded-md relative  py-3 z-10 ">
              <div className="  w-full py-3   ">
                <p className={` ${labelStyle}`}>Industry</p>
                <Listbox
                value={selectedPerson} onChange={setSelectedPerson}
                >
                  <div className="absolute top-1/2 transform -translate-y-1/2 bg-transparent w-full py-3 ">
                    <Listbox.Button className="relative w-full cursor-default     pr-10  text-left shadow-inner focus:outline-none sm:text-sm     ">
                      <span className="block truncate text-sm px-2 ">
                        {/* {state?.state || "Select"} */}
                        {selectedPerson.name || ""}
                      </span>
                       <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 ">
                up icon
              </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1  z-30 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people &&
                          people.map((state, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-5 pr-4 ${active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {state.name }
                                  </span>
                                  {/* {state?.code === state?.stateCode ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                           
                                      check
                                    </span>
                                  ) : null} */}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

                </div>
                {/* <div className="flex sm:flex-row flex-col md:gap-9 gap-5 w-full ">
<div className="w-full sm:w-[50%]   border border-[#C8C8C8] rounded-md relative z-10 ">
              <div className="  w-full    ">
                <p className={` ${labelStyle}`}>City</p>
                <Listbox
                value={selectedPerson} onChange={setSelectedPerson}
                >
                  <div className="absolute top-1/2 transform -translate-y-1/2 bg-transparent w-full ">
                    <Listbox.Button className="relative w-full cursor-default     pr-10  text-left shadow-inner focus:outline-none sm:text-sm     ">
                      <span className="block truncate text-sm px-2">
                       
                        {selectedPerson.name || ""}
                      </span>
                       <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 ">
                up icon
              </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1  z-30 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people &&
                          people.map((state, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-5 pr-4 ${active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {state.name }
                                  </span>
                                 
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>



                    <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Industry</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                </div> */}
                <div className="flex md:flex-row flex-col md:gap-9 gap-5gap-9  w-full ">

                    <div className={`${borderStyle} w-[100%]`}>
                        <label htmlFor="" className={`${labelStyle}`}>
                            Description
                        </label>
                        <textarea
                            name=""
                            id=""
                            className={` ${inputStyle}
                            `}
                            rows={1}
                        ></textarea>

                    </div>

                </div>
                <div className="flex md:flex-row flex-col md:gap-9 gap-5  w-full  relative z-10">
                    {/* <div className={`${borderStyle} sm:w-[50%] w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Year of Formation</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div> */}

<div className="w-full sm:w-[50%]   border border-[#C8C8C8] rounded-md relative  py-3 z-10 ">
              <div className="  w-full py-3   ">
                <p className={` ${labelStyle}`}>Year of Formation</p>
                <Listbox
                value={selectedPerson} onChange={setSelectedPerson}
                >
                  <div className="absolute top-1/2 transform -translate-y-1/2 bg-transparent w-full py-3 ">
                    <Listbox.Button className="relative w-full cursor-default     pr-10  text-left shadow-inner focus:outline-none sm:text-sm     ">
                      <span className="block truncate text-sm px-2 ">
                        {/* {state?.state || "Select"} */}
                        {selectedPerson.name || ""}
                      </span>
                       <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 ">
                up icon
              </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1  z-30 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people &&
                          people.map((state, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-5 pr-4 ${active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {state.name }
                                  </span>
                                  {/* {state?.code === state?.stateCode ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                           
                                      check
                                    </span>
                                  ) : null} */}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
                  
                </div>

              
            </div>
            <div>
            <div className='text-primary font-bold text-lg tracking-wide '><h2>Financials</h2></div>
<div className='w-full  my-10'>
<div className="grid sm:grid-cols-2  grid-cols-1 md:gap-9 gap-5  w-full ">
    <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-9'>
    <div className={`${borderStyle} w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Current Financial Income</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>  
                    <div className={`${borderStyle} w-full`}>
                        <label className={`${labelStyle}`} htmlFor="input">Year</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    </div>
                    <div>
                      <div className='flex justify-between items-center text-sm text-[#868E97] font-medium mb-4'><div className='flex items-center gap-2'><h2>Quarterly</h2>v</div><h2>Amount</h2></div>
                    <div className='flex flex-col gap-3  '>
                      <div className='flex justify-between items-center'>
                        <div className='text-sm text-[#868E97] font-medium tracking-wide'>Quarter 1 (Jan- Mar)</div>
                        <div className='px-6 py-3 border border-[#C8C8C8] rounded-md text-lg text-[#9bb7d3]'>&#8377;</div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='text-sm text-[#868E97] font-medium tracking-wide'>Quarter 2 (Apr- Jun)</div>
                        <div className='px-6 py-3 border border-[#C8C8C8] rounded-md text-lg text-[#9bb7d3] '>&#8377;</div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='text-sm text-[#868E97] font-medium tracking-wide'>Quarter 3 (Jul- Sep)</div>
                        <div className='px-6 py-3 border border-[#C8C8C8] rounded-md text-lg text-[#9bb7d3] '>&#8377;</div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='text-sm text-[#868E97] font-medium tracking-wide'>Quarter 4 (Oct-Dec)</div>
                        <div className='px-6 py-3 border border-[#C8C8C8] rounded-md text-lg text-[#9bb7d3]'>&#8377;</div>
                      </div>
                    </div>
                    </div>
                    <div className='text-center text-[#868e97] text-sm border border-primary rounded-md py-3'><button>+ Add Another year</button></div>

    </div>
    <div>
        <div className='flex flex-col gap-9'>
    <div className={`${borderStyle} `}>
                        <label className={`${labelStyle}`} htmlFor="input">Current Valuation</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    <div className={`text-sm text-[#868E97] font-medium `}>Profit</div>
                    <div className='flex md:gap-8 gap-4 w-full '>
                    <div className={`${borderStyle} w-[85%] `}>
                        <label className={`${labelStyle}`} htmlFor="input">Enter product name</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    <div className=' w-[15%]  '>
                        <div>
                        <input type="text" className='py-3 px-5 outline-0 w-[100%] border border-[#C8C8C8] rounded-md' placeholder='%'/>
                        </div>
                    </div>
                    </div>
                    </div>
                    {/* <div className='flex gap-8 border w-full '>
                    <div className={`${borderStyle} w-[85%] `}>
                        <label className={`${labelStyle}`} htmlFor="input">Enter product name</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    <div className=' w-[15%]  border border-[#C8C8C8] rounded-md'>
                        <div>
                        <input type="text" className='py-3 px-5 outline-0 w-[100%] ' placeholder='%'/>
                        </div>
                    </div>
                    </div> */}
                    <div className='text-center text-[#868e97] text-sm border border-primary rounded-md py-3 mt-4'><button>+ Add product</button></div>

    </div>
                </div>
                <div className='grid sm:grid-cols-2 grid-cols-1  md:gap-9 gap-5  w-full border  mt-12'>
                    <div className='flex flex-col gap-9'>
                    <div className={`${borderStyle} `}>
                        <label className={`${labelStyle}`} htmlFor="input">Type of Investment Required</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    <div className={`${borderStyle} `}>
                        <label className={`${labelStyle}`} htmlFor="input">Pan Number</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                   
                    </div>
                    <div>
                    <div className={`${borderStyle} `}>
                        <label className={`${labelStyle}`} htmlFor="input">Amount</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    </div>
                    
                </div>
               
                
</div>
<div className='text-primary font-bold text-lg tracking-wide '><h2>Photos and Videos</h2></div>
                    <div className='flex items-center gap-8 my-10'>
                        <div className='h-[150px] w-[150px] rounded-md bg-primary text-white text-6xl flex items-center justify-center font-bold'>+</div>
                        <div className='h-[150px] w-[150px] rounded-md border border-primary border-dashed text-primary text-6xl flex items-center justify-center font-bold'>+</div>

                    </div>
<div className='flex flex-col gap-10'>
                    <div className='text-primary font-bold text-lg tracking-wide '><h2>Contact</h2></div>
                    <div className='grid sm:grid-cols-2 grid-cols-1  md:gap-9 gap-5'>
                    <div className={`${borderStyle} `}>
                        <label className={`${labelStyle}`} htmlFor="input">Email</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    <div className={`${borderStyle} `}>
                        <label className={`${labelStyle}`} htmlFor="input">Phone Number</label>
                        <input className={`${inputStyle}`} type="text" id="input" />
                    </div>
                    </div>
                    <div className='bg-primary text-white text-sm font-medium tracking-widest text-center rounded-full py-4'><button>Submit</button></div>
                </div>
            </div>
        </div>
    )
}

export default BusinessAccount