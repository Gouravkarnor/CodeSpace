import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-y border-gray-700">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                style={{ height: "100px" }}
                src="data:image/png;base64,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"
                className="mr-3 h-40 w-50"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">
                Resources
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:underline hover:text-white"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/Gouravkarnor"
                    className="hover:underline hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <Link to="#" className="hover:underline hover:text-white">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">
                Legal
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline hover:text-white">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2024
            <a href="#" className="hover:underline hover:text-white">
              CodeSpace
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9 0C4.58 0 1 3.582 1 8v3c0 3.879 2.748 7.1 6.436 7.879A3.439 3.439 0 0 0 7 20h4a3.439 3.439 0 0 0-.436-1.121C14.252 18.1 17 14.879 17 11V8c0-4.418-3.58-8-8-8Zm7 11c0 3.141-2.316 5.824-5.392 6.732a1 1 0 0 0-.708.764l-.109.504H7.209l-.109-.504a1 1 0 0 0-.708-.764C3.316 16.824 1 14.141 1 11V8c0-3.859 3.141-7 7-7s7 3.141 7 7v3Zm-7-6c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1s1-.448 1-1V6c0-.552-.448-1-1-1Zm-2 1c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1s1-.448 1-1V6c0-.552-.448-1-1-1Zm4 0c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1s1-.448 1-1V6c0-.552-.448-1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">YouTube channel</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
