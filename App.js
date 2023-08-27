import { useTailwind } from "nativewind/dist";
import Main from "./Main";
import { Provider } from "react-redux";
import { myStore } from "./redux/store";



export default function App() {
  return (
    <Provider store={myStore}>
      <Main />
    </Provider>
  );
}
