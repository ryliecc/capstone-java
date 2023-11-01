import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AllTransactionsPage from "./pages/AllTransactionsPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import NewIncomePage from "./pages/NewIncomePage.tsx";
import NewExpensePage from "./pages/NewExpensePage.tsx";
import CategoryManagementPage from "./pages/CategoryManagementPage.tsx";
import RecurringTransactionsManagementPage from "./pages/RecurringTransactionsManagementPage.tsx";


export default function App() {

  return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/dashboard" element={<DashboardPage/>} />
                    <Route path="new-income" element={<NewIncomePage/>} />
                    <Route path="new-expense" element={<NewExpensePage/>} />
                    <Route path="/transactions" element={<AllTransactionsPage/>} />
                    <Route path="/category-management" element={<CategoryManagementPage/>}/>
                    <Route path="/recurring-transaction-management" element={<RecurringTransactionsManagementPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
  )
}

