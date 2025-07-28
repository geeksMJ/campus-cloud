/* eslint-disable react/prop-types */

export default function ShowMoreShowLess({
  descriptionDetail = "",
  charNo,
  isEmployee = "false",
}) {
  const description = `${descriptionDetail.substring(0, `${charNo}`)}`;
  // function readMoreHandler() {
  //   setReadmore(!readmore);
  // }

  console.log("checking emp", isEmployee);
  return (
    <div className={isEmployee === true ? "text-testColor1" : "text-primary"}>
      {descriptionDetail.length < charNo ? (
        descriptionDetail
      ) : (
        <div className="group">
          {/* Initially show the truncated description */}
          <div
            className={`${
              isEmployee === true ? "text-testColor1" : "text-primary"
            } group-hover:hidden`}
          >
            {description}...
          </div>
          {/* On hover, show the full description */}
          <div
            className={`${
              isEmployee === true ? "text-testColor1" : "text-primary"
            } hidden group-hover:block`}
          >
            {descriptionDetail}
          </div>
        </div>

        /* {readmore ? descriptionDetail : description}
          <span className="cursor-pointer font-bold " onClick={readMoreHandler}>
            {readmore ? " ...Show Less" : " ...Read More"}
          </span> */
      )}
    </div>
  );
}
