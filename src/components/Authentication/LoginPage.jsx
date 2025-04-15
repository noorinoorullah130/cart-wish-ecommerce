import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./LoginPage.css";
import { login } from "../../services/userServices";

const schema = z.object({
    email: z
        .string()
        .email({ message: "Please enter valid email address" })
        .min(3),
    password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters" }),
});

const LoginPage = () => {
    const [formError, setFormError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });
    console.log(register("name"));

    const onSubmit = async (formData) => {
        try {
            await login(formData);

            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setFormError(error.response.data.message);
            }
        }
    };

    return (
        <section className="align_center form_page">
            <form
                className="authentication_form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2>Login Form</h2>
                <div className="form_inputs">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="from_text_input"
                            placeholder="Enter your email address"
                            {...register("email")}
                        />
                        {errors.email && (
                            <em className="form_error">
                                {errors.email.message}
                            </em>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="from_text_input"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <em className="form_error">
                                {errors.password.message}
                            </em>
                        )}
                    </div>

                    {formError && <em className="form_error">{formError}</em>}

                    <button type="submit" className="search_button from_submit">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
