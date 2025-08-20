import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Values { email: string; password: string }

const Auth = () => {
  const { signIn, signUp, signInWithProvider, user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<Values>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const onSubmit = async (data: Values) => {
    const action = mode === 'login' ? signIn : signUp;
    const err = await action(data.email, data.password);
    if (err) {
      toast({ title: "Authentication error", description: err.message, variant: "destructive" });
      return;
    }
    if (mode === 'signup') {
      toast({ title: "Check your email", description: "Confirm your email to finish signup." });
    } else {
      toast({ title: "Welcome back", description: `Logged in as ${data.email}` });
    }
    navigate("/");
  };

  const handleProvider = async (provider: 'google') => {
    const err = await signInWithProvider(provider);
    if (err) toast({ title: "Auth error", description: err.message, variant: "destructive" });
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-md">
      <Helmet>
        <title>Login or Sign Up | Skinversity</title>
        <meta name="description" content="Login or create your Skinversity account using email/password or Google, GitHub, Twitter." />
        <link rel="canonical" href="/auth" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Login or Sign Up</h1>

      {user && (
        <p className="text-sm text-muted-foreground mb-4">You are already logged in.</p>
      )}

      <div className="flex gap-2 mb-6">
        <Button variant={mode === 'login' ? 'default' : 'outline'} onClick={()=>setMode('login')}>Login</Button>
        <Button variant={mode === 'signup' ? 'default' : 'outline'} onClick={()=>setMode('signup')}>Sign Up</Button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Email</label>
          <Input type="email" {...register("email", { required: true })} />
          {errors.email && <p className="text-sm text-destructive mt-1">Email is required</p>}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <Input type="password" {...register("password", { required: true, minLength: 6 })} />
          {errors.password && <p className="text-sm text-destructive mt-1">Minimum 6 characters</p>}
        </div>
        <Button type="submit" className="w-full">{mode === 'login' ? 'Login' : 'Create account'}</Button>
      </form>

      <div className="my-6 h-px bg-border" />

      <div className="space-y-2">
        <Button variant="outline" className="w-full" onClick={()=>handleProvider('google')}>Continue with Google</Button>
        {/* <Button variant="outline" className="w-full" onClick={()=>handleProvider('github')}>Continue with GitHub</Button> */}
        {/* <Button variant="outline" className="w-full" onClick={()=>handleProvider('twitter')}>Continue with Twitter</Button> */}
      </div>
    </main>
  );
};

export default Auth;
