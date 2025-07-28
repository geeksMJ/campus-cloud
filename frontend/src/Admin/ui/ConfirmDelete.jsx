/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";

export default function ConfirmDelete({ handelClick, close, what, who }) {
  console.log("ye le", who);
  return (
    <div className="absolute w-full h-full top-0 left-0 right-0">
      <div className="w-full h-[100vh] bg-slate-950 opacity-75 blur-sm" />
      <div className=" absolute w-full top-0 left-0 right-0 h-[100vh]">
        <div
          className="absolute top-0 right-0 text-6xl p-6 text-slate-50"
          onClick={() => close(false)}
        >
          <RxCross2 />
        </div>
        <div className="flex h-[100vh] items-center justify-center ">
          <div className="sm:w-10/12 md:w-7/12 lg:w-4/12 xl:w-3/12 h-[65vh] ">
            <div className="flex h-full justify-center items-center ">
              <div className="w-full border-2 border-gray-900 rounded-lg p-8 bg-stone-100 font-bold">
                <div className="text-lg text-gray-900">
                  Are You Sure You Want To Delete {who} as {what} ?
                </div>
                <div className="flex items-center justify-center p-3 pt-8">
                  <div className="w-1/2">
                    <div
                      onClick={() => close(false)}
                      className="bg-stone-400 border border-gray-600 font-semibold rounded-md p-2 px-4 mx-2 cursor-pointer"
                    >
                      Cancel
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div
                      className="bg-red-400 border border-gray-600 font-semibold rounded-md p-2 px-4 mx-2 cursor-pointer"
                      onClick={() => {
                        handelClick();
                        close(false);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
