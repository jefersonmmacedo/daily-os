import { Switch } from 'react-router-dom';
import Customers from '../pages/Customers/Customers';
import Dashboard from '../pages/Dashboard/Dashboard';
import Distributors from '../pages/Distributors/Distributors';
import NewCustomers from '../pages/NewCustomers/NewCustomers';
import NewOrder from '../pages/NewOrder/NewOrder';
import Orders from '../pages/Orders/Orders';
import Products from '../pages/Products/Products';
import Profile from '../pages/Profile/Profile';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Support from '../pages/Support/Support';
import Users from '../pages/Users/Users';
import RouteWrapper from './Route';


function Routes() {
    return (
        <Switch>
            <RouteWrapper exact path="/" component={SignIn}/>
            <RouteWrapper exact path="/register" component={SignUp}/>
            <RouteWrapper exact path="/dashboard" component={Dashboard} isPrivate/>
            <RouteWrapper exact path="/profile" component={Profile} isPrivate/>
            <RouteWrapper exact path="/users" component={Users} isPrivate/>
            <RouteWrapper exact path="/distributors" component={Distributors} isPrivate/>
            <RouteWrapper exact path="/customers" component={Customers} isPrivate/>
            <RouteWrapper exact path="/newcustomers" component={NewCustomers} isPrivate/>
            <RouteWrapper exact path="/orders" component={Orders} isPrivate/>
            <RouteWrapper exact path="/neworder" component={NewOrder} isPrivate/>
            <RouteWrapper exact path="/support" component={Support} isPrivate/>
            <RouteWrapper exact path="/products" component={Products} isPrivate/>

        </Switch>
    )
}

export default Routes;