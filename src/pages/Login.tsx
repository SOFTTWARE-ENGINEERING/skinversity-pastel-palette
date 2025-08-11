import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";

type Values = { email: string; password: string };

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: Values) => {
    toast({ title: "Welcome back", description: `Logged in as ${data.email}` });
    navigate("/shop");
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-md">
      <Helmet>
        <title>Login | Skinversity</title>
        <meta name="description" content="Login to Skinversity to manage your skincare cart and orders." />
        <link rel="canonical" href="/login" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Email</label>
          <Input type="email" {...register("email", { required: true })} />
          {errors.email && <p className="text-sm text-destructive mt-1">Email is required</p>}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <Input type="password" {...register("password", { required: true, minLength: 6 })} />
          {errors.password && <p className="text-sm text-destructive mt-1">Password must be at least 6 characters</p>}
        </div>
        <Button type="submit" className="w-full">Login</Button>
        <p className="text-sm text-muted-foreground">No account? <Link to="/register" className="text-primary">Register</Link></p>
      </form>
    </main>
  );
};

export default Login;
