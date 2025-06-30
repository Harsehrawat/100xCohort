import { getServerSession } from "next-auth";

export default async function Home(){

  const server = await getServerSession();

  
  return <div>
    {JSON.stringify(server)}
  </div>
}

