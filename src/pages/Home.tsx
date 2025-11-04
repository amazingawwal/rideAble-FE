
import Login from "./Auth/Login";


export default function Auth() {
  return (
    <>
    <section className="min-h-screen flex justify-center items-center">
      <aside className="hidden md:block w-1/2 ">
        <img h-full w-full object-cover src="image.png" alt="accessible ride" />
      </aside>
    <div 
    className="flex flex-col  w-full md:w-1/2"
    // className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center"
    >
      <h1 className="text-3xl font-bold mb-2 text-center">
        ride<span className="text-sky-500 ">Able</span>
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Your accessible ride is just a tap away.
      </p>

      <div 
      // className="w-64 space-y-3"
      >
        <Login/>
        {/* <Button variant="secondary">Sign In</Button>
        <Button variant="outline">Create Account</Button> */}
      </div>

    </div>
    </section>
    </>
  );
}
