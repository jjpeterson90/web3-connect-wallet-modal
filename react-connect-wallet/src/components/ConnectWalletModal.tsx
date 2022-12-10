import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import MetamaskButton from '../wallets/metamask/MetamaskButton';
import WalletConnectButton from '../wallets/walletconnect/WalletConnectButton';

interface Props {
  updateAddress: (address: string) => void;
  walletAddress: string;
}

export default function ConnectWalletModal({
  updateAddress,
  walletAddress,
}: Props) {
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (walletAddress) {
      setConnecting(false);
    }
  }, [walletAddress]);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className=" text-md bg-baseYellow hover:bg-lightYellow focus:bg-darkYellow rounded-md px-5 py-3 text-center font-medium text-white "
        onClick={() => setOpen(true)}
        disabled={!!connecting || !!walletAddress}
      >
        {walletAddress ? 'Connected!' : 'Connect Wallet'}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="bg-lightBlue relative grid w-auto grid-cols-5 overflow-hidden rounded-3xl text-left shadow-xl transition-all">
                  <div className="bg-baseBlue border-brightBlue col-span-2 flex place-items-center border-r-2 px-5 py-3">
                    <div className="w-full text-center font-bold">
                      Connect <br /> Your <br /> Wallet
                    </div>
                  </div>
                  <div className="bg-lightBlue relative col-span-3">
                    <button
                      type="button"
                      className="bg-baseYellow hover:bg-lightYellow absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      <XMarkIcon className="h-4 w-4 text-white" />
                    </button>
                    <div className="border-brightBlue h-12 border-b-2 px-4">
                      <p className="pt-3">Available Wallets</p>
                    </div>
                    <div className="grid h-max gap-3 p-4">
                      <div className="h-20 w-56">
                        <MetamaskButton
                          updateAddress={updateAddress}
                          walletAddress={walletAddress}
                          closeModal={closeModal}
                        />
                      </div>
                      <div className="h-20 w-56">
                        <WalletConnectButton />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
