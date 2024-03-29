import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
        <div className=" container mx-auto flex justify-between items-center">
            <Link to={"/"} className="text-2xl text-yellow-200 font-bold tracking-tight font-serif">
            ExpressEcho
            </Link>
            <span className=" text-yellow-100 font-bold tracking-tight col md:flex gap-4">
                <p className=" cursor-pointer">Privacy Policy</p>
                <p className=" cursor-pointer">Terms of Service</p>
            </span>
        </div>
    </div>
  )
}

export default Footer