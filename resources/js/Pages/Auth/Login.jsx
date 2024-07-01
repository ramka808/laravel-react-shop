import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestFooter from "@/Layouts/GuestFooter";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <GuestLayout>
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <h1 className=" font-bold text-3xl py-4 uppercase text-mainText">
                    Login
                </h1>
                <form onSubmit={submit} className=" w-full">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className=" w-full flex mt-4 items-center justify-between">
                        <div className="block ">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center w-full justify-end mt-4">
                        <PrimaryButton
                            className="w-full text-center"
                            disabled={processing}
                        >
                            Sign in
                        </PrimaryButton>
                    </div>
                </form>
                <div className=" text-mainText text-sm  border-t-2 border-gray-200 flex items-center justify-between w-full mt-6 pt-6 ">
                    <Link className="hover:text-slate-700 duration-200 ease-in-out hover:font-medium">
                        Become a seller
                    </Link>
                    <Link
                        href={route("register")}
                        className="hover:text-slate-700 duration-200 ease-in-out hover:font-medium"
                    >
                        Create an account
                    </Link>
                </div>
            </GuestLayout>
            <GuestFooter />
        </>
    );
}
