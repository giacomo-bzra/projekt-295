import { NextRequest } from "next/server";
import { counterLogDb, CounterLog } from "@/lib/db/connection";

export async function GET() {
  const logs: CounterLog[] = await counterLogDb().find({});
  return Response.json(logs);
}

export async function POST(request: NextRequest) {
  const body: CounterLog = await request.json();
  await counterLogDb().insert(body);
  return new Response(null, { status: 200 });
}

