import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage({onSwitch}:{onSwitch: ()=> void}) {
  const { register, handleSubmit } = useForm();
const { toast } = useToast();

const onSubmit = async (data: any) => {
  if (data.password !== data.password2) {
    toast({
      title: "Lỗi",
      description: "Mật khẩu nhập lại không khớp",
      variant: "destructive",
    });
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // để cookie session lưu lại
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      toast({
        title: "Đăng ký thất bại",
        description: errorText || "Có lỗi xảy ra trong quá trình đăng ký",
        variant: "destructive",
      });
      return;
    }

    const result = await res.json();
    toast({
      title: "Tạo Tài Khoản Thành công",
      description: "Vui lòng đăng nhập",
    });
    onSwitch();
    console.log("Register result:", result);
  } catch (err: any) {
    console.error("Register error:", err);
    toast({
      title: "Lỗi kết nối",
      description: err.message || "Không thể kết nối đến server",
      variant: "destructive",
    });
  }
};


  return (
    <div className="flex h-full justify-center items-center m-[15%]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="font-heading font-bold text-xl text-primary"> First name</p>
          <input
            {...register("firstName")}
            type="text"
            placeholder="name"
            className="w-full border p-2 rounded"
          />
          <p className="font-heading font-bold text-xl text-primary"> Last name</p>
          <input
            {...register("lastName")}
            type="text"
            placeholder="name"
            className="w-full border p-2 rounded"
          />
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
          <p className="font-heading font-bold text-xl text-primary"> Password</p>
          <input
            {...register("password2")}
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <p className="font-light">
            Have a account?
            <a className="text-blue-500" onClick={onSwitch}> Login</a>
          </p>
          <Button
            type="submit"
          >
            register
          </Button>
        </form>
      </div>
    </div>
  );
}
