import { create } from "zustand";
import request from "../utils/request";

const BASE_URI = import.meta.env.VITE_APP_API_BASE_URL

export const useStore = create((set, get) => {

    return {
        getToken: async (id) => {
            const res = await request(`${BASE_URI}/refresh-token`, {
                headers: { 'Content-Type': 'application/json', },
                method: 'POST',
                body: JSON.stringify(id)
            })
            if (res) {
                return res
            }
        },
        postAuth: async ({ email, password }) => {
            const res = await request(`${BASE_URI}/login`, {
                headers: { 'Content-Type': 'application/json', },
                method: 'POST',
                body: JSON.stringify({ email, password })
            })
            if (res) {
                return res
            }
        },
        resetPassword: async ({ email }) => {
            const res = await request(`${BASE_URI}/password-reset`, {
                headers: { 'Content-Type': 'application/json', },
                method: 'POST',
                body: JSON.stringify({ email })
            })
            if (res) {
                return res
            }
        },
        setNewPassword: async ({ token, secret, password, password_confirm }) => {
            const res = await request(`${BASE_URI}/password-set`, {
                headers: { 'Content-Type': 'application/json', },
                method: 'POST',
                body: JSON.stringify({ token, secret, password, password_confirm })
            })
            if (res) {
                return res
            }
        },
    }
})