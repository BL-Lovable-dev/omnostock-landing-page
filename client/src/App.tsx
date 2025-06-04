import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="*" component={Index} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}