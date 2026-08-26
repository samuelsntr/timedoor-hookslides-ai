import { createBrowserRouter } from "react-router-dom"
import { CheckoutPage } from "@/pages/checkout"
import { CheckoutSuccessPage } from "@/pages/checkout/success"
import { PricingPage } from "@/pages/pricing"
import { GenerateCarouselPage } from "@/pages/generate/carousel"

export const router = createBrowserRouter([
    {
        path: "/",
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
]);
