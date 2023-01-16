import FetchService from "./Fetch.Service";
import { useAuthStore } from "~~/src/stores/auth.store";
import { TOKEN_NAME } from "constants/token";

const Fetch = new FetchService();

export default class AuthService {
	config = useRuntimeConfig();
	apiUrl = this.config.public.apiUrl;

	async Login(formData) {
		const authStore = useAuthStore();
		const token = useCookie(TOKEN_NAME);
		const userCookie = useCookie("logged_user");

		try {
			const response = await Fetch.postData(
				this.apiUrl + "/login",
				formData
			);

			if (response.status === "success") {
				authStore.setUser(response.data.user);
				authStore.setToken(response.token);

				token.value = response.token;
				userCookie.value = response.data.user;
			}

			return response;
		} catch (err) {
			return {
				status: false,
				message: "Error - " + err,
			};
		}
	}

	async Logout() {
		const authStore = useAuthStore();

		try {
			const token = useCookie(TOKEN_NAME);
			const userCookie = useCookie("logged_user");

			token.value = "";
			userCookie.value = "";

			return {
				status: true,
				message: "Logout Success",
			};
		} catch (err) {
			return {
				status: false,
				message: "Logout failed, error- " + err,
			};
		}
	}

	async Signup(data) {
		const response = await Fetch.postData(this.apiUrl + "/signup", data);
		return response;
	}
}
