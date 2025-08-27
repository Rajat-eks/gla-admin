import React from "react";
import { Input, Button } from "../../../components";
import { userLogin } from "../../../services";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

interface indexInterface {
  // Define your interface properties here
}

const index: React.FC<indexInterface> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the login function from the auth service
    try {
      await userLogin(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full flex h-screen  justify-between">
      <section className="flex flex-col space-y-10 justify-center px-10">
        <div>
          <h4 className="text-2xl font-semibold">Welcome Back!</h4>
          <p className="text-[15px]">
            Enter your Credentials to access your account
          </p>
        </div>
        <div className=" flex items-center justify-center">
          <form
            action=""
            className="w-[400px] space-y-[10px]"
            onSubmit={handleSubmit}
          >
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
            />
            <Input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit">SignIn</Button>
          </form>
        </div>
      </section>

      <section className="h-screen ">
        <img src="/images/login.svg" alt="" className="h-full  object-contain" />
      </section>
    </section>
  );
};

export default index;
