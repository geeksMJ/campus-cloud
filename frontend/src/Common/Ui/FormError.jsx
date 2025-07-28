/* eslint-disable react/prop-types */
import { MdErrorOutline } from "react-icons/md";

export default function FormError({ error }) {
  return (
    <span className="text-red-500 text-sm pt-2 flex items-center">
      <span className="px-1">
        <MdErrorOutline />
      </span>
      {error}
    </span>
  );
}
