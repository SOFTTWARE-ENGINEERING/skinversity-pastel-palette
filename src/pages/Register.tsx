import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";

type Values = { name: string; email: string; password: string; confirm: string };

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: Values) => {
    toast({ title: "Account created", description: `Welcome, ${data.name}` });
    navigate("/shop");
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-md">
      <Helmet>
        <title>Register | Skinversity</title>
        <meta name="description" content="Create a Skinversity account to save your skincare favorites and checkout faster." />
        <link rel="canonical" href="/register" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Register</h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Name</label>
          <Input {...register("name", { required: true, minLength: 2 })} />
          {errors.name && <p className="text-sm text-destructive mt-1">Please enter your name</p>}
        </div>
        <div>
          <label className="text-sm">Email</label>
          <Input type="email" {...register("email", { required: true })} />
          {errors.email && <p className="text-sm text-destructive mt-1">Valid email required</p>}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <Input type="password" {...register("password", { required: true, minLength: 6 })} />
          {errors.password && <p className="text-sm text-destructive mt-1">Minimum 6 characters</p>}
        </div>
        <div>
          <label className="text-sm">Confirm password</label>
          <Input type="password" {...register("confirm", { validate: (v)=> v === watch("password") })} />
          {errors.confirm && <p className="text-sm text-destructive mt-1">Passwords must match</p>}
        </div>
        <Button type="submit" className="w-full">Create account</Button>
        <p className="text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
      </form>
    </main>
  );
};

export default Register;
