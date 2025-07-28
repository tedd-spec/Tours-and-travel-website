import { NextResponse } from "next/server"
import { submitContactForm } from "@/lib/actions"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    await submitContactForm(formData)

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("Error in contact API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
