import Dropdown from "../ui/DropDown";
import ShowAllEmployee from "./ShowAllEmployee";

export default function Users() {
  return (
    <div className="w-full ">

      
      

      <ShowAllEmployee title="User Management" />
      <div className="flex gap-2 m-2">
        <div className="w-2/3 bg-gray-200 rounded border-slate-400">
          <input
              type="text"
              placeholder="Enter user info"
              className="bg-gray-100 w-full h-full pl-2"
          />
          
          
        </div>
        <div className="w-1/3">
          <Dropdown/>
        </div>
      </div>
      
    </div>
  );
}
