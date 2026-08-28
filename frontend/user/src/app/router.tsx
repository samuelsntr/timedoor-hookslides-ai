import { createBrowserRouter } from "react-router-dom"
import { CheckoutPage } from "@/pages/checkout"
import { CheckoutSuccessPage } from "@/pages/checkout/success"
import { PricingPage } from "@/pages/pricing"
import { GenerateCarouselPage } from "@/pages/generate/carousel"
import { LandingPage } from "@/pages/landing"
import { AdminPage } from "@/pages/admin"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/generate",
        element: <GenerateCarouselPage />,
    },
    {
        path: "/pricing",
        element: <PricingPage />,
    },
    {
        path: "/checkout",
        element: <CheckoutPage />,
    },
    {
        path: "/checkout/success",
        element: <CheckoutSuccessPage />,
    },
    {
        path: "/admin",
        element: <AdminPage />,
    },
]);
