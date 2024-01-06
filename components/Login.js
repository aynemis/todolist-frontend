"use client";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/navigation";
import { TEInput, TERipple } from "tw-elements-react";


function Login() {
  const router = useRouter();

  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [message, setMessage] = useState("");
  const [message2, setMessage2] =useState("")

  const dispatch = useDispatch();
  
  const handleSignIn = () => {
    fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({
            username: signInUsername,
            password: signInPassword,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.result){
        dispatch(login({username:data.username, firstname: data.firstname}))
        setSignUpFirstname("")
        setSignUpUsername("");
        setSignUpPassword("");
        router.push("/home");
    }else {
        console.log(data.error);
        setMessage(data.error);
      }
  })
  }

  const handleSignUp = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data"+data.result)
        if (data.result) {
          dispatch(login({username: data.user.username, firstname: data.user.firstname}));
          setSignUpFirstname("")
          setSignUpUsername("");
          setSignUpPassword("");
          router.push("/home");
        } else {
          console.log(data.error);
          setMessage2(data.error);
        }
      });
  };

  

  return (
      <section className="h-screen flex justify-center items-center">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="loginpic.png"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form>
              {/* <!-- Username input --> */}
              <TEInput
                type="username"
                label="Username"
                size="lg"
                className="mb-6"
                onChange={(e) => setSignInUsername(e.target.value)}
                value={signInUsername}
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                onChange={(e) => setSignInPassword(e.target.value)}
                value={signInPassword}
              ></TEInput>

                {message !== "" ? (
                    <div
                    className="mb-3 inline-flex w-full items-center rounded-lg bg-danger-100 px-6 py-3 text-base text-danger-700"
                    role="alert">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                          clipRule="evenodd" />
                      </svg>
                    </span>
                    {message}
                  </div>
                ) : (
                    ""
                )}

              {/* <!-- Submit button --> */}

              <TERipple rippleColor="light" className="w-full">
                <button
                  type="button"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => {handleSignIn()}}
                >
                  Sign in
                </button>
              </TERipple>

              {/* <!-- Divider --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>
              {/* <!-- Firstname input --> */}
              <TEInput
                type="firstname"
                label="Firstname"
                size="lg"
                className="mb-6"
                onChange={(e) => setSignUpFirstname(e.target.value)}
                value={signUpFirstname}
              ></TEInput>

              {/* <!-- Username input --> */}
              <TEInput
                type="username"
                label="Username"
                size="lg"
                className="mb-6"
                onChange={(e) => setSignUpUsername(e.target.value)}
                value={signUpUsername}
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                onChange={(e) => setSignUpPassword(e.target.value)}
                value={signUpPassword}
              ></TEInput>

            {message2 !== "" ? (
                    <div
                    className="mb-3 inline-flex w-full items-center rounded-lg bg-danger-100 px-6 py-3 text-base text-danger-700"
                    role="alert">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                          clipRule="evenodd" />
                      </svg>
                    </span>
                    {message2}
                  </div>
                ) : (
                    ""
                )}

              {/* <!-- Submit button --> */}

              <TERipple rippleColor="light" className="w-full">
                <button
                  type="button"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => {handleSignUp()}}
                >
                  Sign up
                </button>
              </TERipple>

            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Login;
