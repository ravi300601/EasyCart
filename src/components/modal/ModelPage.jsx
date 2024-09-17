import React from "react";
import GooglePayButton from "@google-pay/button-react";

function Page1({
  handleNextPage,
  name,
  address,
  pincode,
  phoneNumber,
  setName,
  setAddress,
  setPincode,
  setPhoneNumber,
}) {
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter Full Name
          </label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
            className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter Full Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            id="address"
            className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="pincode"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter Pincode
          </label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            name="pincode"
            id="pincode"
            className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="mobileNumber"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter Mobile Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="mobileNumber"
            id="mobileNumber"
            className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
            required
          />
        </div>
      </form>
      <button
        onClick={handleNextPage}
        type="button"
        className="focus:outline-none w-full text-white bg-slate-900 hover:bg-slate-900 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 "
      >
        Order Now
      </button>
    </div>
  );
}

function Page2({
  handlePreviousPage,
  buyNow,
  closeModal,
  setPaymentMethod,
  grandTotal,
  paymentMethod,
}) {
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 ms-0"
        onClick={handlePreviousPage}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
      <h3 class="text-lg font-semibold mb-2 text-center">Payment Method</h3>

      <form className="space-y-4 md:space-y-6" action="#">
        <div class="flex items-center mb-2">
          <img
            class="w-10"
            src="data:image/jpeg;base64,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"
          />
          <label for="checking" class="text-gray-700">
            RazorPay
          </label>
          <div class="ml-2">
            <p class="text-sm text-gray-500">Cards, Wallets, Banks & more</p>
          </div>
          <input
            type="radio"
            id="razorpay"
            value="razorpay"
            onChange={(e) => setPaymentMethod(e.target.value)}
            name="payment"
            class="ms-auto border-gray-300 text-indigo-600 focus:ring-blue-500 focus:border-blue-500"
            checked={paymentMethod === "razorpay"}
          />
        </div>
        <hr className="py-1" />
        <div class="flex items-center mb-2">
          <img
            class="w-6 mx-2"
            src="data:image/jpeg;base64,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"
          />
          <label for="savings" class="text-gray-700">
            Google Pay
          </label>
          <div class="ml-2">
            <p class="text-sm text-gray-500">UPI App</p>
          </div>
          <input
            type="radio"
            id="gpay"
            name="payment"
            value="gpay"
            onChange={(e) => setPaymentMethod(e.target.value)}
            class="ms-auto border-gray-300 text-indigo-600 focus:ring-blue-500 focus:border-blue-500 rounded-full"
          />
        </div>
        <hr className="py-1" />
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 mx-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          <label for="mastercard" class="text-gray-700">
            Cash on Delivery
          </label>
          <div class="ml-2">
            <p class="text-sm text-gray-500">Pay at your doorstep</p>
          </div>
          <input
            type="radio"
            id="cod"
            name="payment"
            value="cod"
            onChange={(e) => setPaymentMethod(e.target.value)}
            class="ms-auto border-gray-300 text-indigo-600 focus:ring-blue-500 focus:border-blue-500 rounded-full"
          />
        </div>
      </form>
      {paymentMethod === "gpay" ? (
        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: String(grandTotal),
              currencyCode: "INR",
              countryCode: "IN",
            },
            callbackIntents: ["PAYMENT_AUTHORIZATION"],
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
          onPaymentAuthorized={(paymentData) => {
            console.log("Payment Authorised Success", paymentData);
            return { transactionState: "SUCCESS" };
          }}
          existingPaymentMethodRequired="False"
          buttonColor="black"
          buttonSizeMode="fill"
          buttonType="buy"
          buttonRadius="8"
          style={{ width: 367, height: 40 }}
        />
      ) : (
        <button
          onClick={() => {
            buyNow();
            closeModal();
          }}
          type="button"
          className="focus:outline-none w-full text-white bg-slate-900 hover:bg-slate-800 outline-0 rounded-lg text-sm font-semibold px-5 py-2.5 "
        >
          Buy with {paymentMethod.toUpperCase()}
        </button>
      )}
    </div>
  );
}

export { Page1, Page2 };
