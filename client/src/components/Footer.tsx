

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
        <div className=" container mx-auto flex justify-between items-center">
            <span className="text-2xl text-white font-bold tracking-tight">
            EternaThoughts
            </span>
            <span className=" text-white font-bold tracking-tight col md:flex gap-4">
                <p className=" cursor-pointer">Privacy Policy</p>
                <p className=" cursor-pointer">Terms of Service</p>
            </span>
        </div>
    </div>
  )
}

export default Footer