import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Page1, Page2 } from "./ModelPage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Modal({
  name,
  address,
  pincode,
  phoneNumber,
  setName,
  setAddress,
  setPincode,
  setPhoneNumber,
  buyNow,
  setPaymentMethod,
  paymentMethod,
  grandTotal,
}) {
  let [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if(JSON.parse(localStorage.getItem("user"))){
      setPaymentMethod("razorpay");
      setIsOpen(true);
    }else{
      navigate('/login')
    }
  }

  const handleNextPage = () => {
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="text-center rounded-lg text-white font-bold">
        {grandTotal != 0 && (
          <button
            type="button"
            onClick={openModal}
            className="w-full bg-indigo-600 py-2 text-center rounded-lg text-white font-bold"
          >
            Buy Now
          </button>
        )}
        {grandTotal === 0 && (
          <button
            type="button"
            className="w-full bg-indigo-600 py-2 text-center rounded-lg text-white font-bold opacity-60"
          >
            Buy Now
          </button>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all bg-gray-50">
                  <section className="">
                    <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                      <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                        {currentPage === 1 && (
                          <Page1
                            handleNextPage={handleNextPage}
                            name={name}
                            address={address}
                            pincode={pincode}
                            phoneNumber={phoneNumber}
                            setName={setName}
                            setAddress={setAddress}
                            setPincode={setPincode}
                            setPhoneNumber={setPhoneNumber}
                            buyNow={buyNow}
                          />
                        )}

                        {currentPage === 2 && (
                          <Page2
                            handlePreviousPage={handlePreviousPage}
                            buyNow={buyNow}
                            closeModal={closeModal}
                            setPaymentMethod={setPaymentMethod}
                            grandTotal={grandTotal}
                            paymentMethod={paymentMethod}
                          />
                        )}
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
