"use client"

import { Github, Chrome  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  return (
    <div className="flex flex-col flex-grow-1 items-center justify-center">
        <Card className="m-5 w-auto md:w-[22rem]">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
            <Button variant="outlineSecondary">
                <Github className="mr-2 h-4 w-4" />
                Github
            </Button>
            <Button variant="outlineSecondary">
                <Chrome className="mr-2 h-4 w-4" />
                Google
            </Button>
            </div>
            <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                Or continue with
                </span>
            </div>
            </div>
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="" />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">Create account</Button>
        </CardFooter>
        </Card>
    </div>
  )
}