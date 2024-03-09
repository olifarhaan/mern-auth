import React from "react"
import LoaderIcon from "../assets/LoaderIcon.svg"

const Loader = () => {
  return (
    <div className="w-full h-full animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
      <div>
        <img
          src={LoaderIcon}
          alt="Loading..."
          className="w-20"
        />
      </div>
    </div>
  )
}

export default Loader
