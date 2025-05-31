"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";

const addquotation = () => {
  const [showModal, setShowModal] = useState(false);
  const [branchPhone, setBranchPhone] = useState("9065841889");
  const [branchEmail, setBranchEmail] = useState("nextgencarcarrier01@gmail.com");
  const [branchAddress, setBranchAddress] = useState("East Laxmi Nagar, Nandlal Chapra, Patna Marble Gali, Ashochak, Patna 800016.");
  const [createdBy, setCreatedBy] = useState("Santosh kumar");
  const [bookingBranch, setBookingBranch] = useState("patna");
  const [qNo, setQNo] = useState("123");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // "YYYY-MM-DD" format
  });
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().split(' ')[0]; // "HH:MM:SS" format
  });
  const [gst, setGst] = useState("XXXXXXXXXX-123");
  const [pan, setPan] = useState("AAAAAAAAAAA-643");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [item, setItem] = useState("car");
  const [phone, setPhone] = useState(0)
  const [address, setAddress] = useState("")
  const [fromAddress, setFromAddress] = useState("")
  const [fromCode, setFromCode] = useState(0)
  const [toAddress, setToAddress] = useState("")
  const [toCode, setToCode] = useState(0)
  const [houseHoldDirect, setHouseHoldDirect] = useState(0)
  const [houseHoldPart, setHouseHoldPart] = useState(0)
  const [carDirect, setCarDirect] = useState(0)
  const [carPart, setCarPart] = useState(0)
  const [bikeDirect, setBikeDirect] = useState(0)
  const [bikePart, setBikepart] = useState(0)
  const [stChargeDirect, setStChargeDirect] = useState(0)
  const [stChargePart, setStChargePart] = useState(0)
  const [otherDirect, setOtherDirect] = useState(0)
  const [otherPart, setOtherPart] = useState(0)
  const [entryPart, setEntryPart] = useState(0)
  const [entryDirect, setEntryDirect] = useState(0)
  const [insuranceDirect, setInsuranceDirect] = useState(0)
  const [insurancePart, setInsurancePart] = useState(0)
  const [surchargeDirect, setSurchargeDirect] = useState(0)
  const [surchargePart, setSurchargePart] = useState(0)
  const [totalDirect, setTotalDirect] = useState(0)
  const [totalPart, setTotalPart] = useState(0)
  const [total, setTotal] = useState(0)
  const handleSave = async () => {
    const formData = {
      branchAddress,
      branchPhone,
      branchEmail,
      createdBy,
      name,
      email, // replace with dynamic value if needed
      phone,    // replace with dynamic value if needed
      fromAddress,
      fromCode,
      toAddress,
      toCode,
      item, // replace with dynamic value if needed
      houseHoldDirect,
      houseHoldPart,
      carDirect,
      carPart,
      bikeDirect,
      bikePart,
      stChargeDirect,
      stChargePart,
      otherDirect,
      otherPart,
      entryPart,
      entryDirect,
      insuranceDirect,
      insurancePart,
      surchargeDirect,
      surchargePart,
      totalDirect,
      totalPart,
      qNo,
      total,
      pan,
      gst,
      date,
      time,
    };
    console.log(formData)
    try {
      const response = await fetch("https://ankeshmonu.pythonanywhere.com/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert("Something went wrong. Check console for details.");
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      setShowModal(true);  // modal dikhao
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    }
  



  };
  const downloadqQuotation = () => {
    alert("downloading....")
    const payload = {
      name,
      email,
      phone,
      fromAddress,
      fromCode,
      toAddress,
      toCode,
      item,
      quoNo: qNo,
      houseHoldDirect,
      houseHoldPart,
      carDirect,
      carPart,
      officeDirect: bikeDirect,
      officePart: bikePart,
      stChargeDirect,
      stChargePart,
      otherDirect,
      otherPart,
      entryDirect,
      entryPart,
      insuranceDirect,
      insurancePart,
      surchargeDirect,
      surchargePart,
      totalDirect,
      totalPart,
    
    };
    fetch("https://ankeshmonu.pythonanywhere.com/pdfquotation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to generate PDF");
        return response.blob(); // PDF is binary
      })
      .then(blob => {
        // Download PDF
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name} quotation.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    console.log("i am running");

    const directBase =
      Number(houseHoldDirect) +
      Number(carDirect) +
      Number(bikeDirect) +
      Number(stChargeDirect) +
      Number(otherDirect) +
      Number(entryDirect) +
      Number(insuranceDirect);

    const partBase =
      Number(houseHoldPart) +
      Number(carPart) +
      Number(bikePart) +
      Number(stChargePart) +
      Number(otherPart) +
      Number(entryPart) +
      Number(insurancePart);

    const calculatedSurchargeDirect = 0.10 * directBase;
    const calculatedSurchargePart = 0.10 * partBase;

    const calculatedTotalDirect = directBase + calculatedSurchargeDirect;
    const calculatedTotalPart = partBase + calculatedSurchargePart;

    setSurchargeDirect(calculatedSurchargeDirect.toFixed(2));
    setSurchargePart(calculatedSurchargePart.toFixed(2));
    setTotalDirect(directBase);
    setTotalPart(partBase);
    setTotal((directBase + partBase).toFixed(2));

    // console.log(calculatedTotalDirect, "--", calculatedTotalPart);
  }, [
    houseHoldDirect, carDirect, bikeDirect, stChargeDirect, otherDirect, entryDirect, insuranceDirect,
    houseHoldPart, carPart, bikePart, stChargePart, otherPart, entryPart, insurancePart
  ]);

  return (
    <div className="min-h-full bg-[#f1f1f1]">
      <div id="quotation" className="border  w-[70%] m-auto my-6 bg-white min-h-5">
        <div className="bg-[url('/images/bg.jpg')] bg-cover bg-center h-40">
          <div id="top" className="m-auto w-fit flex gap-2" >
            <div id="leftImage" className="flex items-center w-20 h-20 justify-center bg-transparent rounded-b-2xl overflow-hidden relative">
              <Image
                src="/images/Logo.png"
                alt="logo image"
                fill
                className="object-cover"
              /></div>
            <div id="rightContent" className="">
              <h1 className="text-4xl text-white font-bold">NextGen safe n Secure</h1>
              <p className="text-white bg-[#ff5900] text-xl w-full text-center space-x-2 p-1">Car Transport packers and movers Services</p>
            </div>
          </div>
          <hr className="h-[1.5px] bg-[#ffcc00] w-72 mx-auto my-3" />
          <div id="bottom" className="text-center w-fit mx-auto">
            <div className="flex  gap-6  items-center justify-center">
              <div id="phone">
                <span className="text-[#ffcc00] font-bold">Phone : </span>
                <span className="text-white"> {branchPhone} , +91 6203678408</span>
              </div>
              <div id="email">
                <span className="text-[#ffcc00] font-bold">Email : </span>
                <span className="text-white">{branchEmail}</span>
              </div>
            </div>
            <div id="address">
              <span className="text-[#ffcc00] font-bold">Address : </span>
              <span className="text-white text-sm">{branchAddress}</span>
            </div>

          </div>
        </div>
        <div className="p-4">



          <form action="" className="">
            <div className=" text-sm  flex items-center justify-center">
              <div className="border border-black flex gap-2 w-4/12 p-1">
                <label className="text-sm">Mr/Mrs :</label>
                <input type="text" value={name}
                  onChange={(e) => setName(e.target.value)} className="outline-none border-none" />
              </div>

              <div className="border  border-black flex gap-2 w-4/12 p-1">
                <label className="text-sm">Quotation Number :</label>
                <span className="text-sm">{qNo}</span>
              </div>
              <div className="border  border-black flex gap-2 w-4/12 p-1">
                <label className="text-sm">Date :</label>
                <span className="text-sm">{date}</span>
              </div>

            </div>
            <div className="border  text-sm border-black flex items-center justify-center">
              <div className="border  flex gap-2 flex-8/12 p-1">
                <label className="text-sm">Address :</label>
                <input type="text" className="outline-none border-none" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="border  flex gap-2 w-4/12 p-1">
                <label className="text-sm">Booking Branch  :</label>
                <span className="text-sm"> {bookingBranch} </span>
              </div>


            </div>

            <div className="border  text-sm border-black flex items-center justify-center">
              <div className="border  border-black flex gap-2 flex-6/12 p-1">
                <label className="text-sm">From :</label>
                <input type="text" className="outline-none border-none" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
              </div>
              <div className="border  border-black flex gap-2 flex-6/12 p-1">
                <label className="text-sm">To :</label>
                <input type="text" className="outline-none border-none" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
              </div>
            </div>

            <div className="border  text-sm  flex items-center justify-center">
              <div className="border  border-black flex gap-2 flex-6/12 p-1">
                <label className="text-sm">From  pincode:</label>
                <input type="text" className="outline-none border-none" value={fromCode} onChange={(e) => setFromCode(e.target.value)} />
              </div>
              <div className="border  border-black flex gap-2 flex-6/12 p-1">
                <label className="text-sm">To pincode:</label>
                <input type="text" className="outline-none border-none" value={toCode} onChange={(e) => setToCode(e.target.value)} />
              </div>
            </div>

            <div className="border  text-sm  flex items-center justify-center">
              <div className="border    flex gap-2 flex-6/12 p-1">
                <label className="text-sm">Shipment Item:</label>
                <input type="text" className="outline-none border-none" value={item} onChange={(e) => setItem(e.target.value)} />
              </div>
              <div className="border   flex gap-2 w-6/12 p-1">
                <label className="text-sm">Mobile No. :</label>
                <input type="text" className="outline-none border-none" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="border   text-sm  flex items-center justify-center">
              <div className="border   flex gap-2 w-6/12 p-1">
                <label className="text-sm">Email :</label>
                <input type="text" className="outline-none border-none" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="border  flex gap-2 w-6/12 p-1">
                <p className="text-sm">Pan Number: AAKCN1927A</p>
              </div>
            </div>

            <div className="border   text-sm  flex items-center justify-center">
              <div className="border  flex gap-2 w-6/12 p-1">
                <p className="text-sm">Quotation valid for 15 days</p>
              </div>
              <div className="border  flex gap-2 w-6/12 p-1">
                <p className="text-sm">GST Number: </p>
              </div>
            </div>

            <div id="prices">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border font-bold  border-black">S No.</p>
                <p className="text-sm text-center p-1 w-7/12 border font-bold border-black">Particulars</p>
                <p className="text-sm text-center p-1 w-2/12 border font-bold border-black">Direct Vehicle</p>
                <p className="text-sm text-center p-1 w-2/12 border font-bold border-black">Part Vehicle</p>
              </div>
            </div>

            <div id="item1">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border font-bold border-black">1</p>
                <p className="text-sm p-1 w-7/12 border border-black">ParticularsFreight for House Hold</p>
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={houseHoldDirect} onChange={(e) => setHouseHoldDirect(e.target.value)} />
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={houseHoldPart} onChange={(e) => setHouseHoldPart(e.target.value)} />
              </div>
            </div>
            <div id="item2">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border  font-bold border-black">2</p>
                <p className="text-sm p-1 w-7/12 border border-black">Freight charges for used Car    </p>
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={carDirect} onChange={(e) => setCarDirect(e.target.value)} />
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={carPart} onChange={(e) => setCarPart(e.target.value)} />
              </div>
            </div>
            <div id="item3">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border  font-bold border-black">3</p>
                <p className="text-sm p-1 w-7/12 border border-black">Freight for bike Shifting </p>
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={bikeDirect} onChange={(e) => setBikeDirect(e.target.value)} />
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={bikePart} onChange={(e) => setBikepart(e.target.value)} />
              </div>
            </div>
            <div id="item4">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border  font-bold border-black">4</p>
                <p className="text-sm p-1 w-7/12 border border-black">Station Charges </p>
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={stChargeDirect} onChange={(e) => setStChargeDirect(e.target.value)} />
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={stChargePart} onChange={(e) => setStChargePart(e.target.value)} />
              </div>
            </div>
            <div id="item5">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border  font-bold border-black">5</p>
                <p className="text-sm p-1 w-7/12 border border-black">Any other Charges </p>
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={otherDirect} onChange={(e) => setOtherDirect(e.target.value)} />
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={otherPart} onChange={(e) => setOtherPart(e.target.value)} />
              </div>
            </div>
            <div id="item6">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border  font-bold border-black">6</p>
                <p className="text-sm p-1 w-7/12 border border-black">Entry Tax if applicable </p>
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={entryDirect} onChange={(e) => setEntryDirect(e.target.value)} />
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={entryPart} onChange={(e) => setEntryPart(e.target.value)} />
              </div>
            </div>
            <div id="item7">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12 border  font-bold border-black">7</p>
                <p className="text-sm p-1 w-7/12 border border-black">FOV all risk </p>
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={insuranceDirect} onChange={(e) => setInsuranceDirect(e.target.value)} />
                <input type="number" className="text-sm text-center p-1 w-2/12 border border-black outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={insurancePart} onChange={(e) => setInsurancePart(e.target.value)} />
              </div>
            </div>


            <div id="item9">
              <div className="flex items-center justify-center border border-black">
                <p className="text-sm text-center p-1 w-1/12  border-black"></p>
                <p className="text-sm p-1 w-7/12 border  font-bold border-black">Sub Total</p>
                <p className="text-sm p-1 w-2/12 border text-center font-bold border-black" > {totalDirect}</p>
                <p className="text-sm p-1 w-2/12 border text-center font-bold border-black"> {totalPart} </p>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold">Important Customer Information</h1>
            <span>Total  ₹ <span>{total}</span> </span>
          </div>
          <div className="my-3">
            <h1 className="text-xl font-bold">Monthly Operations</h1>
            <p> <LuCheck className="inline" /> We proudly relocate over 5,000 homes every month with efficiency and care. </p>
          </div>
          <div className="my-3">
            <h1 className="text-xl font-bold">Payment Terms</h1>
            <p> <LuCheck className="inline" /> 100% payment must be completed at the loading point.Accepted payment methods include:Cheque / NEFT / RTGS / Online Transfer / Credit
              Card / Debit Card / Demand Draft</p>
          </div>
          <div className="my-3">
            <h1 className="text-xl font-bold">Car Transport Instructions</h1>
            <p>
              <LuCheck className="inline" /> Please ensure your car has a minimum of 15 litres of petrol/diesel for smooth movement between:
            </p>
            <ul className="list-disc ml-4 pl-5">
              <li>Door to ramp</li>
              <li>Ramp to truck</li>
            </ul>
            <p>
              <LuCheck className="inline" /> Vehicles are transported in closed containers with value-added services.
            </p>
          </div>
          <div className="my-3">
            <h1 className="text-xl font-bold">Transite Time</h1>
            <p> <LuCheck className="inline" />Household items: Transit period is 1 day per 300 km (excluding the day of loading and delivery).</p>
            <p> <LuCheck className="inline" />Cars: Transit period is 1 day per 250 km (excluding the day of delivery).</p>
            <p className="font-bold pl-4">Note: The carrier is not responsible for any leakage of A/C gas during transport.</p>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex flex-col gap-1 items-start justify-start">
              <p>Customer Signature: ________________________</p>
              <p>(Overleaf Terms and conditions are accepted)</p>
              <p>Destination Customer Care Name:________________________</p>
            </div>
            <div className="flex flex-col gap-1 items-end font-bold justify-start">
              <p>From Nextgen Packers & Movers</p>
              <p>{createdBy}</p>
              <p> {branchPhone} </p>
            </div>
          </div>
          <div className="mt-3 mb-10">
            <h1 className="text-xl font-bold">References :</h1>
            <p> We strictly do not carry items like :Arms/ Ammunitior/ ChemicalBattery/ Diesel/ Petrol/ Kerosene/ Narcotcs/ Currency/ Jewellery/ Gas
              cylinder/ Liquor/ The cornpany does not take responsibility for such items.</p>
          </div>
        </div>
        <hr className="h-3 mb-1 bg-[#f76721]" />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/90 to-black/70 flex items-center justify-center z-50">
          <div className="bg-white  p-6 relative rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p>Your form has been submitted successfully.</p>
            <IoMdCloseCircleOutline className="absolute right-0 text-black text-4xl top-0 cursor-pointer" onClick={() => setShowModal(false)} />

            <div className=" flex gap-1">
              <button
                className="cursor-pointer mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-800 transition text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Email
              </button>
              <button
                className="cursor-pointer mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 transition text-white rounded"
                onClick={() => setShowModal(false)}
              >
                whatsapp
              </button>
              <button
                className="cursor-pointer mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-700 transition text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Message
              </button>
              <button
                className="cursor-pointer mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded"
                onClick={() => downloadqQuotation()}
              >
                Download
              </button>
            </div>
          </div>
        </div>


      )}

      <p className=" w-[20%] m-auto">
        <button onClick={handleSave} className="p-2 px-4 cursor-pointer bg-blue-700 w-full text-white rounded-sm m-auto">Save</button>
      </p>

    </div>
  )
}

export default addquotation