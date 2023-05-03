import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(authOptions);
  redirect("/dashboard");

  return (
    <main>
      <h2>Server Session</h2>
      <div></div>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
    </main>
  );
}
