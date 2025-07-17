import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Admin from "./pages/Admin";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="omnostock-theme">
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/admin" component={Admin} />
          <Route path="*" component={Index} />
        </Switch>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;