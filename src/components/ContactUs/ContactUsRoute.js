import { useAuthenticator } from "../../context/AuthContext";
import ContactUs from "./ContactUs";
import ContactUsExt from "./ContactUsExt";


const ContactUsRoute = () => {
	const { loggedIn } = useAuthenticator();
	return loggedIn ? (<ContactUs />) : (<ContactUsExt />);
}

export default ContactUsRoute;