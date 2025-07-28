import { NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/lib/actions"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = await subscribeToNewsletter(formData)

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    })
  } catch (error) {
    console.error("Error in subscribe API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
