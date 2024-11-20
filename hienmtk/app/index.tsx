import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPass from "./screens/ForgotPass";
import Cart from "./screens/Cart";
import Payment from "./screens/Payment";
import Introduce from "./screens/Introduce";
import Option from "./screens/Option";
import SuccessPayment from "./screens/SuccessPayment";
import SearchPage from "./screens/SearchPage";
import DetailOrder from "./screens/DetailOrder";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer independent={true}>
            <ToastProvider>
            <Stack.Navigator initialRouteName="Introduce">
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignInScreen} />
                <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Details" component={DetailScreen} />
                <Stack.Screen options={{ headerShown: false }} name="DetailOrder" component={DetailOrder} />
                <Stack.Screen options={{ headerShown: false }} name="ForgotPass" component={ForgotPass} />
                <Stack.Screen options={{ headerShown: false }} name="Cart" component={Cart} />
                <Stack.Screen options={{ headerShown: false }} name="Payment" component={Payment} />
                <Stack.Screen options={{ headerShown: false }} name="Introduce" component={Introduce} />
                <Stack.Screen options={{ headerShown: false }} name="Option" component={Option} />
                <Stack.Screen options={{ headerShown: false }} name="Success" component={SuccessPayment} />
                <Stack.Screen options={{ headerShown: false }} name="Search" component={SearchPage} />


            </Stack.Navigator>
            </ToastProvider>
        </NavigationContainer>
    );
}
export default App;