"use client";

import Link from "next/link";

interface IProps {
  id: number;
}

const milkDetails = ({ id }: IProps) => {

  
  

  return (
    <>
     <Link
        href="/en/e-commerce"
        className="bg-green-700 text-white rounded-md my-3 w-20 py-5 mx-auto block text-center"
      >
        Back
      </Link>
     <h1>Hello Milk Details {id}</h1>
    </>
  );
};

export default milkDetails;
