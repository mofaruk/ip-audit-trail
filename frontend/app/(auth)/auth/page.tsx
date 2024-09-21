import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo.png';


export default function Home() {
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
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="your email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder=" • • • • • •" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mx-auto">Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardContent className="space-y-2 py-5">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="your full name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="your email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder=" • • • • • •" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input id="password_confirmation" type="password" placeholder=" • • • • • •" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mx-auto">Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
