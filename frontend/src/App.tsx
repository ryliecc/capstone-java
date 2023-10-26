import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AllTransactionsPage from "./pages/AllTransactionsPage.tsx";
import NewTransactionPage from "./pages/NewTransactionPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import NewIncomePage from "./pages/NewIncomePage.tsx";


export default function App() {

  return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/dashboard" element={<DashboardPage/>} />
                    <Route path="new-income" element={<NewIncomePage/>} />
                    <Route path="/transactions" element={<AllTransactionsPage/>} />
                    <Route path="/newtransaction" element={<NewTransactionPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
  )
}

