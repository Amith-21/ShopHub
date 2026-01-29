import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ReviewProvider } from "./context/ReviewContext";
import { ProductProvider } from "./context/ProductContext";
import { MLProvider } from "./context/MLContext";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import NotFound from "./pages/NotFound";
import AdminPricing from "./pages/AdminPricing";
import ProductDetails from "./pages/ProductDetails";
import MLAnalytics from "./pages/MLAnalytics";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistory from "./pages/OrderHistory";

const queryClient = new QueryClient();

const HomeWrapper = () => {
  const { user } = useAuth();
  if (user?.role === 'seller') {
    return <Navigate to="/admin/pricing" replace />;
  }
  return <Home />;
};

import { OrderProvider } from "./context/OrderContext";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <ProductProvider>
            <MLProvider>
              <CartProvider>
                <ReviewProvider>
                  <OrderProvider>
                    <NotificationProvider>
                      <Toaster />
                      <Sonner />
                      <Chatbot />
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<HomeWrapper />} />
                          <Route path="/login" element={<Auth />} />
                          <Route path="/register" element={<Auth />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/product/:id" element={<ProductDetails />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/payment" element={<Payment />} />
                          <Route path="/order-success" element={<OrderSuccess />} />
                          <Route path="/orders" element={<OrderHistory />} />
                          <Route path="/policy/privacy" element={<PrivacyPolicy />} />
                          <Route path="/policy/terms" element={<TermsConditions />} />
                          <Route path="/policy/refund" element={<RefundPolicy />} />
                          <Route path="/policy/shipping" element={<ShippingPolicy />} />
                          <Route
                            path="/ml-analytics"
                            element={
                              <ProtectedRoute allowedRoles={['seller']}>
                                <MLAnalytics />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/admin/pricing"
                            element={
                              <ProtectedRoute allowedRoles={['seller']}>
                                <AdminPricing />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                    </NotificationProvider>
                  </OrderProvider>
                </ReviewProvider>
              </CartProvider>
            </MLProvider>
          </ProductProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
