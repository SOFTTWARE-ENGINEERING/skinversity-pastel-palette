import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Post { id: string; title: string; content: string; created_at: string }

const Posts = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("posts").select("id, title, content, created_at").order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Error loading posts", description: error.message, variant: "destructive" });
      } else {
        setPosts(data ?? []);
      }
    };
    load();
  }, [toast]);

  const addPost = async () => {
    if (!user) return;
    const { error } = await supabase.from("posts").insert({ title, content, user_id: user.id });
    if (error) {
      toast({ title: "Error creating post", description: error.message, variant: "destructive" });
    } else {
      setTitle("");
      setContent("");
      const { data } = await supabase.from("posts").select("id, title, content, created_at").order("created_at", { ascending: false });
      setPosts(data ?? []);
      toast({ title: "Post created" });
    }
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-2xl">
      <Helmet>
        <title>Posts | Skinversity</title>
        <meta name="description" content="Create and view posts stored in Supabase. Real-time, up-to-date content for Skinversity users." />
        <link rel="canonical" href="/posts" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      <section className="space-y-3 mb-8">
        <Input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <Input placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} />
        <Button onClick={addPost} disabled={!title}>Add Post</Button>
      </section>

      <section className="space-y-4">
        {posts.map(p => (
          <article key={p.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-muted-foreground mt-1">{p.content}</p>
            <p className="text-xs text-muted-foreground mt-2">{new Date(p.created_at).toLocaleString()}</p>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-muted-foreground">No posts yet. Be the first to create one!</p>
        )}
      </section>
    </main>
  );
};

export default Posts;
