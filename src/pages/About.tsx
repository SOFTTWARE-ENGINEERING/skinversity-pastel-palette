import { Helmet } from "react-helmet-async";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const About = () => {
  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>About Us | Skinversity</title>
        <meta name="description" content="Skinversity crafts modern skincare with gentle, effective formulas. Meet the team behind the glow." />
        <link rel="canonical" href="/about" />
      </Helmet>

      <section className="max-w-3xl mb-12">
        <h1 className="text-3xl font-bold mb-4">About Skinversity</h1>
        <p className="text-muted-foreground">
          At Skinversity, we believe skincare should be simple, joyful, and effective. Our pastel-inspired collection
          is formulated with dermatologist-loved ingredients for everyday routines that feel like self-care.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{img:team1,name:"Avery Chen",role:"Founder & CEO"},{img:team2,name:"Maya Patel",role:"Product Design"},{img:team3,name:"Leo Kim",role:"Skincare Chemist"}].map((t)=> (
            <article key={t.name} className="text-center">
              <img src={t.img} alt={`${t.name} portrait`} className="mx-auto w-40 h-40 rounded-full object-cover" loading="lazy" />
              <h3 className="mt-4 font-medium">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
