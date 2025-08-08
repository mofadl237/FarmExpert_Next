import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {

  try {
    const data = await  resend.emails.send({
       from: "onboarding@resend.dev",
       to:"mofadl237@gmail.com",
       subject:"Farm Expert Order",
       html:"<h1>Fadl Expert </h1>"
    })
   return NextResponse.json({data})
  } catch (error) {
    return NextResponse.json({"message":error})
    
  }
}