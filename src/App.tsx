import RfidEventListener from './events/rfid';
import Modal from './components/modal';

RfidEventListener.on((ev) => {
  alert(ev.id);
})

function App() {
  return (
    <div className="App bg-black">
      <h2 className='text-white'>hello world</h2>
      <Modal>
        <h1 className="text-red-600 text-2xl font-bold underline">hello world</h1>
      </Modal>
    </div>
  );
}

export default App;
