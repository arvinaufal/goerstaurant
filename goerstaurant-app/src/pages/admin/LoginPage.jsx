import { Link } from "react-router-dom";
import FormAuth from "../../components/auth/formAuth";
import axios from "axios";

export default function LoginPage() {
    // <a href="https://storyset.com/finance">Finance illustrations by Storyset</a>
    const postLogin = async (payload) => {
        const { password, emailUsername } = payload;

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/login`,
                {
                    password,
                    emailUsername
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                return response.data;
            }

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);

            return error.response?.data;
        }
    };

    return (
        <section className=" min-h-screen w-screen">
            <div className="flex flex-col w-full h-screen">

                <div className="flex w-full justify-center my-5 h-10">
                    <a href="https://www.goersapp.com/" className="w-40 h-40">
                        <img src={"/public/images/goers-logo.png"} alt="Logo Goers" />
                    </a>
                </div>
                <div className=" flex flex-row w-full h-full px-4">
                    <div className="flex flex-col justify-center content-center items-center w-1/2">
                        <div className="flex flex-col justify-center content-center items-center ml-48">
                            <div className="">
                                <img src={"/public/images/login-cover.png"} alt="Finance illustrations by Storyset" style={{ width: 350 }} />
                            </div>
                            <div className="flex flex-col w-full items-center justify-center text-center">
                                <div className="">
                                    <span className="text-lg font-bold text-slate-950 italic">Goerstaurant Admin Panel</span>
                                </div>
                                <div className="w-4/5 pt-2">
                                    <span className="text-sm">Manage restaurant data easily, transparently, and efficiently</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" flex flex-col justify-center content-center items-center w-1/2 mb-20">
                        <div className="container w-2/3 h-2/3  flex flex-col justify-center content-center items-center mr-48">
                            <div className="w-full mx-4 my-4">
                                <div className="w-full text-center">
                                    <span className="font-bold text-xl">Log in to your account</span>
                                </div>
                                <div className="w-full text-center">
                                    <span className="text-sm">Don't have a Goerstaurant Admin account? <Link to={'/register'} className="font-extrabold text-red-800">Register</Link></span>
                                </div>
                            </div>
                            <div className="w-5/6 rounded-2xl shadow-lg flex flex-col">
                                <div className="p-8 flex flex-col w-full">
                                    <FormAuth formType="login" postLogin={postLogin} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}