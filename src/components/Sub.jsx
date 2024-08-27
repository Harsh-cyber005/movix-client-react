import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function Component() {
    const navigate = useNavigate()
    const { auth } = useAuth();
    return (
        <div className="w-full bg-[#00050D] py-12 md:py-24 lg:py-32 font-bold">
            <div className="container px-6 mx-auto">
                <div className="space-y-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Choose your plan</h1>
                    <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Get started with our free plan or upgrade to Pro for more features.
                    </p>
                </div>
                <div className="mt-12 lg:px-40 grid gap-6 sm:grid-cols-2 lg:mt-16">
                    <Card>
                        <CardHeader>
                            <CardTitle>Free</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-center">
                                    <CheckIcon className="mr-2 h-4 w-4" />
                                    Watch Prime Video on any one screen (mobile or TV)
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="mr-2 h-4 w-4" />
                                    Upto HD (720p) quality
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="mr-2 h-4 w-4" />
                                    Regular Ads
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => {
                                navigate("/signin")
                            }} variant="link" className="w-full">{auth?.user ? "Continue with Free Plan for now" : "Sign In"}</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pro</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-center">
                                    <CheckIcon className="mr-2 h-4 w-4" />
                                    Watch Prime Video on multiple devices
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="mr-2 h-4 w-4" />
                                    Upto 4K UHD (2160p) quality
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="mr-2 h-4 w-4" />
                                    No Ads
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 sm:flex-row">
                            <div className="flex-1 text-center text-2xl font-bold text-black">₹299/month</div>
                            <Button variant="link" className="w-full sm:w-auto">Subscribe</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}