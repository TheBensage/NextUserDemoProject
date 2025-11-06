import { db } from "@/db";
import { users } from "@/db/schema";
import { userSchema } from "@/lib/validation/user";
import { NextResponse } from "next/server";

export async function GET() {
  const allUsers = db.select().from(users).all();
  return NextResponse.json(allUsers ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    const formattedErrors = result.error;
    return NextResponse.json({ errors: formattedErrors }, { status: 400 });
  }

  const validatedData = result.data;

  db.insert(users)
    .values({
      fullName: validatedData.fullName,
      age: validatedData.age,
      country: validatedData.country,
      interests: validatedData.interests.join(","),
    })
    .run();

  return NextResponse.json({ success: true });
}
