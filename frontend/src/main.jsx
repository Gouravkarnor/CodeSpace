import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./Home/Home.jsx";
import SignIn from "./Pages/SignIn.jsx";
import About from "./About/About.jsx";
import Contact from "./Contact/Contact.jsx";
import Github from "./Github/Github.jsx";
import SignUp from "./Pages/SignUp.jsx";
import PlayGroundIDE from "./Playground/PlayGroundIDE.jsx";
import Adminpage from "./Admin/Adminpage.jsx";
import { Provider } from "react-redux";
import PlayGroundProbSolver from "./Playground/PlayGroundProbSolver.jsx";
import ProblemList from "./ProblemPage/ProblemList.jsx";
import store from "./Redux/App/store.js";
import SubmitHistoryPage from "./SubmitHistory/SubmitHistoryPage.jsx";
import { ConfirmProvider } from "material-ui-confirm";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="github" element={<Github />} />
      <Route path="PlayGroundIDE" element={<PlayGroundIDE />} />
      <Route
        path="PlayGroundProbSolver/:problemId"
        element={<PlayGroundProbSolver />}
      />
      <Route path="SubmitHistoryPage/:id" element={<SubmitHistoryPage />} />
      <Route path="ProblemList" element={<ProblemList />} />
      <Route path="adminPage" element={<Adminpage />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition="Bounce"
    />
    <Provider store={store}>
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <RouterProvider router={router} />
      </ConfirmProvider>
    </Provider>
  </>
);
