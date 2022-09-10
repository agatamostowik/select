import "./index.css";
import {Dropdown} from "./components/Dropdown";

const options = [

{value: 'blue', label: 'Blue'},
{value: 'green', label: 'Green'},
{value: 'red', label: 'Red'},
{value: 'yellow', label: 'Yellow'},
{value: 'purple', label: 'Purple'}];

function App() {
  return (
    <div className="App">
      <Dropdown options={options}  
    />
    </div>
  );
}

export default App;
