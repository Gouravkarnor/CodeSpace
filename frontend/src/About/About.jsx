export default function About() {
  return (
    <div className="py-16 bg-gray-800">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://t4.ftcdn.net/jpg/04/63/37/51/360_F_463375173_vBKRkUbVoCuS9lpUmhdfCc13pprPr148.jpg"
              alt="image"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-100 font-bold md:text-4xl">
              Hey Code Wizards! Let's Make Some Magic Happen!
            </h2>
            <p className="mt-6 text-gray-200">
              Welcome to CodeSpace, an interactive online coding platform where
              developers of all skill levels can enhance their coding abilities.
              Whether you're a beginner learning the fundamentals or a seasoned
              programmer looking to tackle advanced challenges, our platform
              provides the tools you need to practice, learn, and grow.
            </p>
            <p className="mt-4 text-gray-200">
              Our mission is to create a supportive environment for learning and
              mastering coding skills through hands-on experience, one challenge
              at a time. Join our community of developers today, sharpen your
              problem-solving skills, and take the next step in your coding
              journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
