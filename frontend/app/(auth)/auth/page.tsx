"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo.png';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/schemas/sign-in-schema"
import { signUpSchema } from "@/schemas/sign-up-schema"
import LoadingButton from "@/components/auth/loading-button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import ErrorMessage from "@/components/error-message";
import { useState } from "react"
import { handleSignin, handleSignup } from "@/app/actions/auth-actions"
import { useRouter } from "next/navigation"


const AuthPage = () => {
  const [globalError, setGlobalError] = useState<string>("");
  const router = useRouter();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password_confirmation: "",
      password: "",
    },
  });

  const onSubmitLogin = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await handleSignin(values);

      if (result?.error) {
        setGlobalError(result.error);
      }

      if(result?.status == 200) {
        router.push('/')
      }

    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const onSubmitRegister = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const result = await handleSignup(values);

      if (result?.error) {
        setGlobalError(result.error);
      }

      if(result?.status == 201) {
        router.push('/')
      }

    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <Link href='/' className="mx-auto mb-5">
        <Image src={logo} alt='Logo' width={80} />
      </Link>
      <Tabs defaultValue="account" className="w-full md:w-[400px] mx-auto">
        <TabsList className="grid w-full grid-cols-2 bg-gray-50">
          <TabsTrigger value="account" className=" bg-gray-100">Login</TabsTrigger>
          <TabsTrigger value="password" className=" bg-gray-100">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardContent className="space-y-2 py-5">
              {globalError && <ErrorMessage error={globalError} />}
              <Form {...signInForm}>
                <form
                  onSubmit={signInForm.handleSubmit(onSubmitLogin)}
                  className="space-y-8"
                >
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <LoadingButton
                    pending={signInForm.formState.isSubmitting}
                  >
                    Login
                  </LoadingButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardContent className="space-y-2 py-5">
              {globalError && <ErrorMessage error={globalError} />}
              <Form {...signUpForm}>
                <form
                  onSubmit={signUpForm.handleSubmit(onSubmitRegister)}
                  className="space-y-8"
                >
                  <FormField
                    control={signUpForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Confirmation</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Re-Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <LoadingButton
                    pending={signUpForm.formState.isSubmitting}
                  >
                    Register
                  </LoadingButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthPage
