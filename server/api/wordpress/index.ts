const { WP_BASE_URL, WP_REST_API_BASE_URL } = process.env

export const url = WP_BASE_URL + WP_REST_API_BASE_URL
export const logInUrl = `${url}/jwt-auth/v1/token`
