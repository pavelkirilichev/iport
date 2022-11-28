import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./routes/Cart";
import Good from "./routes/Good";
import Home from "./routes/Home";
import LK from "./routes/LK";
import MakeOrder from "./routes/MakeOrder";
import Tkani from "./routes/Tkani";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/cart' element={<Cart />} />
			<Route path='/tkani/:category' element={<Tkani />} />
			<Route path='/good/:id' element={<Good />} />
			<Route path='/lk' element={<LK />} />
			<Route path='/mo' element={<MakeOrder />} />
		</Routes>
	</BrowserRouter>,
);
