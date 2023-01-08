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
			const res = await Fetch.postData(
				this.apiUrl + "/login",
				formData
			);

			if (res.status) {
				console.log(res);
				// if (res.data.user.type === "maintainer") {
				authStore.setUser(res.data.user);
				authStore.setToken(res.token);

				token.value = res.token;
				userCookie.value = res.data.user;

				return res;
			} else {
				return {
					status: false,
					message: res.message,
				};
			}
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
}
