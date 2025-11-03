import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const allUsers = db.select().from(users).all();
  return NextResponse.json(allUsers ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, age, country, interests } = body;

  if (!fullName || !age || !country || !interests) {
    return NextResponse.json(
      {
        error: "Missing fields",
      },
      {
        status: 400,
      }
    );
  }

  db.insert(users)
    .values({ fullName, age, country, interests: interests.join(",") })
    .run();

  return NextResponse.json({ success: true });
}
