import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import NewTransactionPage from "./pages/NewTransactionPage.tsx";
import AllTransactionsPage from "./pages/AllTransactionsPage.tsx";

export default function App() {

  return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/transactions" element={<AllTransactionsPage/>} />
                    <Route path="/newtransaction" element={<NewTransactionPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
  )
}

