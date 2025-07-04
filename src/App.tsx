import { Suspense } from "react";
import MainRouter from "./pages";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-slate-100">
      <Suspense fallback={<p>Loading...</p>}>
        <MainRouter />
      </Suspense>
    </div>
  );
};

export default App;
