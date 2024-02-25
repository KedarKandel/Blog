const MyProfile = () => {
  return (
    <div className="container mx-auto flex justify-center items-center">
      {/* Profile Information */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
        <form className="space-y-4 flex flex-col">
          <input type="text" className="input" placeholder="First Name" />
          <input type="text" className="input" placeholder="Last Name" />
          <input type="email" className="input" placeholder="Email" />
          <input type="password" className="input" placeholder="Password" />
          <button
            type="submit"
            className="max-w-max bg-blue-600 text-white w-full py-2 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
