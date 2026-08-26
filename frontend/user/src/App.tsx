import { RouterProvider } from "react-router-dom"

import { AuthProvider } from "@/features/auth/auth-context"
import { AuthShell } from "@/features/auth/components/auth-shell"

import { router } from "./app/router"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <AuthShell />
    </AuthProvider>
  )
}

export default App
