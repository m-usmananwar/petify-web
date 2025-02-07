import { RouterProvider } from "react-router-dom";
import "./index.css";
import appRouter from "./router/index.jsx";
import appStore from "./store/index.jsx";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;
