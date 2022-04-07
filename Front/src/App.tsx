import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import ProblemRecommend from "./routes/ProblemRecommend";

export enum routes {
  HOME = "/",
  PROBLEM_RECOMMEND = "/problem-recommend",
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Home />}></Route>
        <Route
          path={routes.PROBLEM_RECOMMEND}
          element={<ProblemRecommend />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
