import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found - Wiki Table",
  },
  description:
    "The page you’re looking for doesn’t exist or may have been moved. Go back to the homepage.",
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-none text-center shadow-none bg-card text-card-foreground">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="text-destructive h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold">Page Not Found</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Sorry, we couldn’t find the page you were looking for.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            It might have been moved or deleted. Please check the URL, or click the button below to return to the homepage.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center mt-4">
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
