import RfidEventListener from './events/rfid';
import './App.css';

RfidEventListener.on((ev) => {
  alert(ev.id);
})

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
    </div>
  );
}

export default App;
