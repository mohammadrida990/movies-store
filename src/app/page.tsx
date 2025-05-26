import Billboard from "@/components/Billboard";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Movies from "@/components/Movies";
import Model from "@/components/Model";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }

  return (
    <section className="h-screen">
      <Model />
      <Navbar />
      <Billboard />
      <Movies />
    </section>
  );
}
