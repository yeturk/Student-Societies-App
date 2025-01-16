import axios from "axios";

// Event API (8080 in prod, 4000 in dev)
const eventApi = axios.create({
	baseURL: import.meta.env.VITE_EVENT_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Main API for Student and Community (8081 in prod, 4000 in dev)
const mainApi = axios.create({
	baseURL: import.meta.env.VITE_MAIN_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

const setupErrorHandling = (api) => {
	api.interceptors.response.use(
		(response) => response,
		(error) => {
			console.error("API Error:", error.response?.data || error.message);
			return Promise.reject(error);
		}
	);
};

setupErrorHandling(eventApi);
setupErrorHandling(mainApi);

// Development paths for json-server
const DEV_PATHS = {
	events: "/events",
	societies: "/societies",
	students: "/users",
};

// Production paths based on Spring Boot backend
const PROD_PATHS = {
	events: {
		list: "/list",
		get: "/get",
		getById: (id) => `/get/${id}`,
		getBySociety: (id) => `/getBySID/${id}`,
		getByDate: "/getByDate",
		save: "/save",
		delete: (id) => `/delete/${id}`,
	},
	societies: {
		base: "/rest/api/community",
		list: "/rest/api/community/list",
		get: (id) => `/rest/api/community/list/${id}`,
		save: "/rest/api/community/save",
		update: (id) => `/rest/api/community/update/${id}`,
		delete: (id) => `/rest/api/community/delete/${id}`,
	},
	students: {
		base: "/rest/api/student",
		list: "/rest/api/student/list",
		get: (id) => `/rest/api/student/list/${id}`,
		save: "/rest/api/student/save",
		update: (id) => `/rest/api/student/update/${id}`,
		delete: (id) => `/rest/api/student/delete/${id}`,
		login: "/rest/api/student/login",
		follow: (studentId, communityId) => `/rest/api/student/follow/${studentId}?community_id=${communityId}`,
	},
};

const isProd = import.meta.env.PROD;
const paths = isProd ? PROD_PATHS : DEV_PATHS;

// Transform functions
const transformStudentForBackend = (userData) => ({
	id: null, // Backend'in beklediği şekilde null olarak gönderiyoruz
	name: userData.name,
	email: userData.email,
	password: userData.password,
	department: userData.department,
	communities: [], // Boş array olarak başlatıyoruz
});

const transformStudentFromBackend = (student) => {
	if (!student) return null;

	console.log("Raw student data received:", student); // Gelen veriyi görelim

	// Backend'den gelen data: {"id": 1, "name": "Bilal", "communities": []}
	const userId = student.id;
	console.log("Extracted user ID:", userId); // ID'yi görelim

	return {
		id: userId?.toString(), // Direkt olarak backend'den gelen id'yi kullan
		name: student.name || "",
		email: student.email || "",
		department: student.department || "",
		role: student.role || "student",
		// Backend'den communities array'i geliyor, bunu followedSocieties olarak kullan
		followedSocieties: Array.isArray(student.communities) ? student.communities.map(String) : [],
	};
};

const transformEventForBackend = (eventData) => {
	if (typeof eventData.startTime === "string") {
		const [startHour, startMinute] = eventData.startTime.split(":").map(Number);
		const [endHour, endMinute] = eventData.endTime.split(":").map(Number);

		return {
			title: eventData.title,
			description: eventData.description,
			location: eventData.location,
			startDate: eventData.startDate,
			startTime: {
				hour: startHour,
				minute: startMinute,
				second: 0,
				nano: 0,
			},
			endDate: eventData.endDate,
			endTime: {
				hour: endHour,
				minute: endMinute,
				second: 0,
				nano: 0,
			},
			societyID: 1,
			guest: eventData.guest || "",
			type: eventData.type,
		};
	}

	// If startTime is already an object, return as is
	return eventData;
};

const transformEventFromBackend = (event) => {
	if (!event) return null;

	try {
		return {
			id: event.id?.toString() || "",
			title: event.title || "",
			description: event.description || "",
			location: event.location || "",
			startDate: event.startDate || "",
			// Backend'den HH:mm:ss formatında geliyor, direkt kullanabiliriz
			startTime: event.startTime || "",
			endDate: event.endDate || "",
			endTime: event.endTime || "",
			type: event.type || "default",
			guests: event.guests || [],
			societyId: event.societyID?.toString() || "",
		};
	} catch (error) {
		console.error("Error transforming event:", error, event);
		return null;
	}
};

const endpoints = {
	// Student endpoints
	getStudents: async () => {
		if (!isProd) {
			return mainApi.get(paths.students);
		}
		const response = await mainApi.get(paths.students.list);
		return {
			...response,
			data: Array.isArray(response.data) ? response.data.map(transformStudentFromBackend) : [],
		};
	},

	getStudent: async (id) => {
		if (!isProd) {
			return mainApi.get(`${paths.students}/${id}`);
		}
		const response = await mainApi.get(paths.students.get(id));
		return {
			...response,
			data: transformStudentFromBackend(response.data),
		};
	},

	createStudent: async (data) => {
		try {
			if (!isProd) {
				return mainApi.post(paths.students, data);
			}

			console.log("Sending data to backend:", data); // Debug için

			const config = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			};

			const response = await mainApi.post(paths.students.save, data, config);
			return {
				...response,
				data: response.data,
			};
		} catch (error) {
			console.error("API Error in createStudent:", error);
			throw error;
		}
	},

	updateStudent: async (id, data) => {
		if (!isProd) {
			return mainApi.put(`${paths.students}/${id}`, data);
		}
		const response = await mainApi.put(paths.students.update(id), transformStudentForBackend(data));
		return {
			...response,
			data: transformStudentFromBackend(response.data),
		};
	},

	deleteStudent: (id) => {
		if (!isProd) {
			return mainApi.delete(`${paths.students}/${id}`);
		}
		return mainApi.delete(paths.students.delete(id));
	},

	loginStudent: async (data) => {
		if (!isProd) {
			return mainApi.post("/login", data);
		}

		try {
			console.log("Login attempt with email:", data.email); // Debug log

			const loginData = {
				email: data.email,
				password: data.password,
			};

			const response = await mainApi.post(paths.students.login, loginData);

			console.log("Backend response:", response.data); // Debug log

			// Response kontrolü
			if (!response.data) {
				throw new Error("No data received from server");
			}

			// Veriyi dönüştür
			const transformedUser = transformStudentFromBackend(response.data);

			// Dönüştürülmüş veri kontrolü
			if (!transformedUser || !transformedUser.email) {
				console.error("Invalid transformed user data:", transformedUser);
				throw new Error("Invalid user data received from server");
			}

			return {
				...response,
				data: {
					...transformedUser,
					// Ensure followedSocieties is populated
					followedSocieties: transformedUser.followedSocieties || []
				}
			};
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	},

	// Society endpoints
	getSocieties: () => mainApi.get(isProd ? paths.societies.list : paths.societies),
	getSociety: (id) => mainApi.get(isProd ? paths.societies.get(id) : `${paths.societies}/${id}`),
	createSociety: (data) => mainApi.post(isProd ? paths.societies.save : paths.societies, data),
	updateSociety: (id, data) => mainApi.put(isProd ? paths.societies.update(id) : `${paths.societies}/${id}`, data),
	deleteSociety: (id) => mainApi.delete(isProd ? paths.societies.delete(id) : `${paths.societies}/${id}`),

	// Event endpoints
	getEvents: async () => {
		try {
			if (!isProd) {
				return eventApi.get(paths.events);
			}

			console.log("Fetching events..."); // Debug log
			const response = await eventApi.get(paths.events.list);
			console.log("Raw response:", response); // Debug log

			// Response data kontrolü
			const events = Array.isArray(response.data) ? response.data : [];
			console.log("Events before transform:", events); // Debug log

			const transformedEvents = events.map(transformEventFromBackend).filter((event) => event !== null);

			console.log("Transformed events:", transformedEvents); // Debug log

			return {
				...response,
				data: transformedEvents,
			};
		} catch (error) {
			console.error("Error in getEvents:", {
				message: error.message,
				response: error.response?.data,
				status: error.response?.status,
			});
			throw error;
		}
	},

	getEvent: async (id) => {
		if (!isProd) {
			return eventApi.get(`${paths.events}/${id}`);
		}
		const response = await eventApi.get(paths.events.getById(id));
		return {
			...response,
			data: transformEventFromBackend(response.data),
		};
	},

	getEventsBySociety: async (societyId) => {
		if (!isProd) {
			return eventApi.get(`${paths.events}?societyId=${societyId}`);
		}
		const response = await eventApi.get(paths.events.getBySociety(societyId));
		return {
			...response,
			data: response.data.map(transformEventFromBackend),
		};
	},

	createEvent: async (data) => {
		if (!isProd) {
			return eventApi.post(paths.events, data);
		}

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await eventApi.post(paths.events.save, data, config);
		return {
			...response,
			data: response.data,
		};
	},

	deleteEvent: (id) => {
		if (!isProd) {
			return eventApi.delete(`${paths.events}/${id}`);
		}
		return eventApi.delete(paths.events.delete(id));
	},

	followSociety: async (studentId, communityId) => {
		if (!studentId) {
			throw new Error("Student ID is required");
		}
		if (!communityId) {
			throw new Error("Community ID is required");
		}

		try {
			const response = await mainApi.post(paths.students.follow(studentId, communityId));
			return response.data;
		} catch (error) {
			console.error("Error following society:", error);
			throw error;
		}
	},

	// Event endpoints içine eklenecek yeni method
	createEventWithImage: async (formData) => {
		if (!isProd) {
			return eventApi.post(paths.events, formData);
		}

		// FormData ile istek gönderirken özel headers ayarla
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const response = await eventApi.post(paths.events.save, formData, config);
		return {
			...response,
			data: response.data,
		};
	},
};

const sendPasswordToEmail = async (email) => {
	try {
		const response = await mainApi.post("/sendMultipleEmail", {
			to: [email],
			subject: "Password Reset",
			text: "Your password reset request has been processed. If you did not request this, please contact support.",
		});
		return response;
	} catch (error) {
		console.error("Error sending password reset email:", error);
		throw new Error("Failed to send password reset email. Please try again.");
	}
};

export { endpoints, mainApi, eventApi, sendPasswordToEmail, transformEventForBackend };
