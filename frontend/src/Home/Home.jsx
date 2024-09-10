
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col space-y-8 bg-gray-800">
      {/* First Section */}
      <br />
      <br />
      <div className="flex justify-evenly items-center m-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white font-serif">
            Write. Debug. Succeed. Start Today!
            <span className="block text-3xl mt-2 font-serif text-red-00">
              Let’s Get Started!
            </span>
          </h2>

          <Link
            to="/PlayGroundIDE"
            className="inline-flex items-center mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <svg
              fill="white"
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="mr-2"
            >
              <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
            </svg>
            Go to playground
          </Link>
        </div>

        <div>
          <img
            className="w-90 h-75 object-cover rounded-lg"
            // src="https://e1.pxfuel.com/desktop-wallpaper/506/844/desktop-wallpaper-naruto-sage-mode-1920x1080-naruto-training.jpg"
            style={{ height: "400px" }}
            src="https://img.freepik.com/free-photo/rear-view-programmer-working-all-night-long_1098-18697.jpg?size=626&ext=jpg"
            alt="Programming background"
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      {/* Second Section */}
      <div className="flex justify-evenly items-center m-8">
        <div>
          <img
            className="w-150 h-50 object-cover rounded-lg"
            style={{ height: "300px" }}
            src="https://img.freepik.com/premium-vector/person-interacting-with-coding-interface-colorful-technology-concept_9493-68422.jpg?size=626&ext=jpg"
            alt="Solving Problems"
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold  text-white font-serif">
            Ready to Challenge Yourself?
          </h1>
          <Link
            to="ProblemList"
            className="inline-flex items-center mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          >
            <svg
              fill="white"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="mr-2"
            >
              <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
            </svg>
            Visit Problems 🚀
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
