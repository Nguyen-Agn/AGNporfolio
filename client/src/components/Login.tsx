import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";

export default function LoginPage({onSwitch}:{onSwitch: ()=> void}) {
  const { register, handleSubmit } = useForm();
  const [, setLocation] = useLocation();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // để cookie session lưu lại
        body: JSON.stringify(data),
      });
       if (res.ok) {
      const result = await res.json();
      await queryClient.invalidateQueries({queryKey: ["/api/auth/user"]}) //  update context
      setLocation("/home");          //  redirect về Home
    }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex h-full justify-center items-center m-[15%]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="font-heading font-bold text-xl text-primary"> Email</p>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <p className="font-heading font-bold text-xl text-primary"> Password</p>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <p className="font-light">
            No account?
            <a className="text-blue-500" onClick={onSwitch}> Register</a>
          </p>
          <Button
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
