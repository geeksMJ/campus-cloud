/* eslint-disable react/prop-types */
export default function CardHeading({ title, icon = "" }) {
  return (
    <div className="flex">
      <div className=" bg-secondary2">
        <h3 className="text-xl font-bold flex py-1 px-4 rounded-r-lg rounded-tl-lg items-center  text-white bg-primary">
          {title}
          <span className="pl-2">{icon}</span>
        </h3>
        <div className="bg-primary">
          <h3 className="text-sm font-bold flex text-secondary2 bg-secondary2 rounded-tl-lg relative overflow-hidden">
            <span className="absolute inset-x-0 inset-r-0 h-2 "></span>.
          </h3>
        </div>
      </div>
    </div>
  );
}
