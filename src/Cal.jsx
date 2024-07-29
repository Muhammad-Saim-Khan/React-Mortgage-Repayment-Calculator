import React, { useState } from "react";
import { PiCalculatorFill } from "react-icons/pi";
import Image from "./assets/image.png";

const Cal = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [mortgageType, setMortgageType] = useState("Repayment");
  const [results, setResults] = useState({
    monthlyRepayment: "",
    totalRepayment: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({
    amount: "",
    term: "",
    rate: "",
  });

  const validateInputs = () => {
    const errors = {
      amount: "",
      term: "",
      rate: "",
    };
    let isValid = true;

    if (!/^\d+(\.\d{1,2})?$/.test(amount) || parseFloat(amount) <= 0) {
      errors.amount = "Please enter a valid amount greater than 0.";
      isValid = false;
    }

    if (!/^\d+$/.test(term) || parseInt(term) <= 0) {
      errors.term = "Please enter a valid term in years greater than 0.";
      isValid = false;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(rate) || parseFloat(rate) <= 0) {
      errors.rate = "Please enter a valid interest rate greater than 0.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const calculateRepayments = () => {
    if (!validateInputs()) return;

    const P = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;

    let monthlyRepayment = 0;
    let totalRepayment = 0;

    if (mortgageType === "Repayment") {
      // For Repayment Mortgage
      monthlyRepayment = (P * r) / (1 - Math.pow(1 + r, -n));
      totalRepayment = monthlyRepayment * n;
    } else {
      // For Interest Only Mortgage
      monthlyRepayment = P * r;
      totalRepayment = monthlyRepayment * n + P;
    }

    setResults({
      monthlyRepayment: monthlyRepayment.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
    });
    setShowResults(true);
  };

  const handleClearAll = () => {
    setAmount("");
    setTerm("");
    setRate("");
    setResults({ monthlyRepayment: "", totalRepayment: "" });
    setShowResults(false);
    setErrors({ amount: "", term: "", rate: "" });
  };

  return (
    <div>
      <div className="bg-[#E3F4FC] h-[100vh] max-md:pt-0 pt-20">
        <div className="flex max-md:flex-col max-md:w-[100%] max-md:rounded-none flex-row m-auto bg-white rounded-xl w-[60%]">
          <div className="bg-white w-[50%] max-md:w-[100%]  max-md:rounded-none rounded-s-xl">
            <div className="flex justify-between max-md:flex-col max-md:items-start p-7 items-center">
              <h1 className="font-medium text-[20px]">Mortgage Calculator</h1>
              <p
                className="font-medium underline hover:text-[red] text-[gray]"
                onClick={handleClearAll}
              >
                Clear All
              </p>
            </div>
            <div className="p-7 pt-0">
              <label className="font-medium text-[#5a5a5a]" htmlFor="Amount">
                Mortgage Amount
              </label>
              <div className="flex mt-2">
                <div className="w-[10%] h-[35px] rounded-s-md border-black border border-e-0 font-medium text-[100%] flex justify-center items-center bg-[#E5F3FB]">
                  €
                </div>
                <input
                  type="text"
                  placeholder="300,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`border-black border focus:outline-none rounded-e-md h-[35px] w-[90%] border-s-0 font-medium ps-3 ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
            <div className="flex  gap-3 max-md:flex-col p-7 pt-0">
              <div className=" w-[50%]  max-md:w-[100%]">
                <label className="font-medium text-[#5a5a5a]" htmlFor="Term">
                  Mortgage Term
                </label>
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="25"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className={`border-black focus:outline-none border rounded-s-md h-[35px] w-[60%] border-e-0 font-medium ps-3 ${
                      errors.term ? "border-red-500" : ""
                    }`}
                  />
                  <div className="w-[40%] h-[35px] rounded-e-md border-black border border-s-0 font-medium text-[100%] flex justify-center items-center bg-[#E5F3FB]">
                    years
                  </div>
                </div>
                {errors.term && (
                  <p className="text-red-500 text-sm mt-1">{errors.term}</p>
                )}
              </div>
              <div className="w-[50%] max-md:w-[100%]">
                <label className="font-medium text-[#5a5a5a]" htmlFor="Rate">
                  Interest Rate
                </label>
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="3.5"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className={`border-black focus:outline-none border rounded-s-md h-[35px] w-[70%] border-e-0 font-medium ps-3 ${
                      errors.rate ? "border-red-500" : ""
                    }`}
                  />
                  <div className="w-[30%] h-[35px] rounded-e-md border-black border border-s-0 font-bold text-[100%] flex justify-center items-center bg-[#E5F3FB]">
                    %
                  </div>
                </div>
                {errors.rate && (
                  <p className="text-red-500 text-sm mt-1">{errors.rate}</p>
                )}
              </div>
            </div>
            <div className="p-7 pt-0">
              <div className="font-medium text-[#5a5a5a]">
                <h1>Mortgage Type</h1>
              </div>
              <div className="flex gap-2 p-2 mt-2 border-[#ffa127] border bg-[#FAFAE1] rounded-md">
                <div className="w-[10%] text-center flex justify-center">
                  <input
                    type="radio"
                    name="mortgageType"
                    checked={mortgageType === "Repayment"}
                    onChange={() => setMortgageType("Repayment")}
                    className="checked:accent-[red] w-[20px] h-[20px]"
                  />
                </div>
                <div className="font-medium flex items-center">
                  <h1>Repayment</h1>
                </div>
              </div>
              <div className="flex gap-2 p-2 mt-1 border-[#ffde26] border bg-[white] rounded-md">
                <div className="w-[10%] text-center flex justify-center">
                  <input
                    type="radio"
                    name="mortgageType"
                    checked={mortgageType === "Interest Only"}
                    onChange={() => setMortgageType("Interest Only")}
                    className="checked:accent-[green] w-[20px] h-[20px]"
                  />
                </div>
                <div className="font-medium flex items-center">
                  <h1>Interest Only</h1>
                </div>
              </div>
            </div>
            <div className="p-7 pt-0 flex max-md:justify-center">
              <button
                onClick={calculateRepayments}
                className="flex  hover:bg-[red] hover:text-[white] justify-center items-center gap-3 bg-[#D9DB33] pt-2 pb-2 ps-5 pe-5 rounded-full"
              >
                <PiCalculatorFill />
                <h1 className="font-medium text-[14px]">
                  Calculate Repayments
                </h1>
              </button>
            </div>
          </div>
          <div className="bg-[#122F41] w-[50%]  max-md:rounded-none max-md:w-[100%] max-md:rounded-bl-none rounded-bl-[70px] rounded-e-xl">
            <div className="p-7 h-full">
              {showResults ? (
                <div>
                  <h1 className="text-[#ededed] font-bold text-[22px]">
                    Your Results
                  </h1>
                  <p className="text-[#bcbcbc] font-medium text-[14px] pt-3">
                    Your results are shown below based on the information you
                    provided. To adjust the results, edit the form and click
                    "Calculate repayments" again.
                  </p>
                  <div className="border-t-[#D0DB46] border-t-4 rounded-b-md shadow-2xl rounded-t-xl p-7 bg-[#0E2532] mt-7">
                    <div>
                      <p className="text-[#bcbcbc] font-medium text-[14px]">
                        Your monthly repayments
                      </p>
                      <h1 className="text-[#D0DB46] text-[40px] font-sans font-medium">
                        €{results.monthlyRepayment}
                      </h1>
                    </div>
                    <div>
                      <hr className="mt-7 mb-7" />
                    </div>
                    <div>
                      <p className="text-[#bcbcbc] font-medium text-[14px]">
                        Total you'll repay over the term
                      </p>
                      <h1 className="text-[#ededed] font-medium font-sans text-[22px]">
                        €{results.totalRepayment}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full content-center">
                  <img className="m-auto pb-5" src={Image} alt="" />
                  <div className="text-center">
                    <h1 className="font-bold text-white text-[20px]">
                      Results shown here
                    </h1>
                  </div>
                  <div className="text-center w-[100%]">
                    <p className="text-[#c3c3c3] m-auto w-[90%] font-medium pt-3 text-[14px]">
                      Complete the form and click "Calculate repayments" to see
                      what your monthly repayments would be.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cal;
