import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { SignInFlow } from "../types";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>using email or other services</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-2.5">
          <input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size={"lg"} disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative"
            size={"lg"}
            disabled={false}
            onClick={() => {}}
            variant={"outline"}
          >
            Continue wih google
          </Button>
        </div>
        <p>
          Dont have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="hover:underline cursor-pointer"
          >
            sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
