 import { Toaster } from "@/components/ui/toaster";
 import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Tasks from "./pages/Tasks";
import Programs from "./pages/Programs";
import Initiatives from "./pages/Initiatives";
import Media from "./pages/Media";
import Results from "./pages/Results";
 import Contact from "./pages/Contact";
 import AdminLogin from "./pages/admin/AdminLogin";
 import AdminDashboard from "./pages/admin/AdminDashboard";
 import AdminPrograms from "./pages/admin/AdminPrograms";
 import AdminInitiatives from "./pages/admin/AdminInitiatives";
 import AdminMediaPlatforms from "./pages/admin/AdminMediaPlatforms";
 import AdminContent from "./pages/admin/AdminContent";
 import AdminStats from "./pages/admin/AdminStats";
 import AdminSettings from "./pages/admin/AdminSettings";
 import AdminMediaLibrary from "./pages/admin/AdminMediaLibrary";
 import ProtectedRoute from "./components/admin/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

 const App = () => (
   <QueryClientProvider client={queryClient}>
     <AuthProvider>
       <TooltipProvider>
         <Toaster />
         <Sonner />
         <HashRouter>
           <ScrollToTop />
           <Routes>
             <Route path="/" element={<Index />} />
             <Route path="/about" element={<About />} />
             <Route path="/tasks" element={<Tasks />} />
             <Route path="/programs" element={<Programs />} />
             <Route path="/initiatives" element={<Initiatives />} />
             <Route path="/media" element={<Media />} />
             <Route path="/results" element={<Results />} />
             <Route path="/contact" element={<Contact />} />
             
             {/* Admin Routes */}
             <Route path="/admin/login" element={<AdminLogin />} />
             <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
             <Route path="/admin/programs" element={<ProtectedRoute><AdminPrograms /></ProtectedRoute>} />
             <Route path="/admin/initiatives" element={<ProtectedRoute><AdminInitiatives /></ProtectedRoute>} />
             <Route path="/admin/media" element={<ProtectedRoute><AdminMediaPlatforms /></ProtectedRoute>} />
             <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
             <Route path="/admin/stats" element={<ProtectedRoute><AdminStats /></ProtectedRoute>} />
             <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
             <Route path="/admin/media-library" element={<ProtectedRoute><AdminMediaLibrary /></ProtectedRoute>} />
             
             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
             <Route path="*" element={<NotFound />} />
           </Routes>
         </HashRouter>
       </TooltipProvider>
     </AuthProvider>
   </QueryClientProvider>
 );

export default App;
